require('dotenv').config()
const config=require('./utils/config')
const express=require('express')
const fetch=require('node-fetch')
const cors = require('cors')
const moment=require('moment')
const parseString = require('xml2js').parseString;
const db =require('./controllers/operations')
const Book = require('./models/Book')
const app=express()
app.use(cors())
app.use(express.json())



app.get('/readlists', db.getReadLists)
app.post('/readlists', db.postReadList)
app.get('/author', db.getAuthor)
app.post('/books', db.postBook)
app.get('/books/:id', db.getBookById)
app.get('/readlists/:id', db.getBooksByList)


KEY = process.env.GR_KEY


app.get('/recommendations/sample', (request, response) => {
    console.log('toimii')
    console.log(config.READGEEK_URL)
    fetch(`${config.READGEEK_URL}?taste_test=6`, {
        method: 'get',
        headers: {
            'Authorization': config.READGEEK_AUTH
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.user.taste_test)
        const books=data.user.taste_test.map(book=>{
            return {
                author: book.author,
                image_url: book.cover,
                readgeekid: book.readgeekid,
                title: book.title
            }
        })
        return response.status(200).json(books)
    })
    .catch(e => console.log(e))
})



app.post('/recommendations/rate', (request, response) => {
    const params=request.body
    console.log(params)
    Book.addBook(params)
    .then(res => {
        const data={
            books: {
                [`readgeekid:${params.readgeekid}`]:{
                    rated: params.rated,
                    date_rated: moment(new Date()).format('YYYY-MM-DD')
                }
            }
        }
        console.log(data)
        return fetch(config.READGEEK_URL, {
            method: 'patch',
            headers: {
                'Authorization': config.READGEEK_AUTH
            },
            body: JSON.stringify(data)
        })
    })
    .then(response => response.json())
    .then(data => {
        return response.status(201).json(data)
        
    })
    .catch(e => console.log(e)) 
})
/*
app.get('/book/:isbn', (req, res) => {
    const isbn=req.params.isbn
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&c&format=json`)
    .then(response=> response.json())
    .then(data => {
        console.log(data)
        const bookData=data[`ISBN:${isbn}`]
        console.log(bookData.authors)
        //const isbn: bookData.identifiers.isbn_10[0
        const book = {
            title:bookData.title,
            isbn: isbn,
            image_url:bookData.cover.medium,
            authors: bookData.authors.map(a => a.name) 
        }
        console.log(book)
        return res.json(book)
    })
    .catch(e => console.log(e));
})
 */
module.exports = app

/* const PORT=3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
}) */