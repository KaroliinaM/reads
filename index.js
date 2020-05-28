require('dotenv').config()
const express=require('express')
const fetch=require('node-fetch')
const cors = require('cors')
const parseString = require('xml2js').parseString;
const db =require('./database/operations')
const app=express()
app.use(cors())
app.use(express.json())


app.get('/readlists', db.getReadLists)
app.post('/readlists', db.postReadList)
app.get('/author', db.getAuthor)
app.post('/books', db.postBook)
app.get('/books/:id', db.getBooksByList)


KEY = process.env.GR_KEY

app.get('/book/:isbn', (req, res) => {
    const isbn=req.params.isbn
    fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&c&format=json`)
    .then(response=> response.json())
    .then(data => {
        console.log(data)
        const bookData=data[`ISBN:${isbn}`]
        console.log(bookData.authors)
        const book = {
            title:bookData.title,
            isbn:bookData.identifiers.isbn_10[0],
            image_url:bookData.cover.medium,
            authors: bookData.authors.map(a => a.name) 
        }
        console.log(book)
        return res.json(book)
    })
    .catch(e => console.log(e));
})

const PORT=3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})