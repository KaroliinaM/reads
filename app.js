require('dotenv').config()
const config=require('./utils/config')
const express=require('express')
const fetch=require('node-fetch')
const cors = require('cors')
const moment=require('moment')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const parseString = require('xml2js').parseString;
const db =require('./controllers/operations')
const Book = require('./models/Book')
const queries=require('./models/queries')
const readListRouter=require('./controllers/readListRouter')
const bookRouter=require('./controllers/bookRouter')
const recommendationRouter=require('./controllers/recommendationRouter')
const userRouter=require('./controllers/userRouter')
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))



//app.get('/readlists', db.getReadLists)
//app.post('/readlists', db.postReadList)
app.use('/readlists', readListRouter)
app.use('/books', bookRouter)
app.use('/recommendations', recommendationRouter)
app.use('/user', userRouter)
//app.get('/author', db.getAuthor)
//app.post('/books', db.postBook)
//app.get('/books/:id', db.getBookById)
//app.get('/readlists/:id', db.getBooksByList)


KEY = process.env.GR_KEY

/* app.post('/user/register', (request, response) => {
    console.log('polku on')
    const user= request.body
    console.log(user)
    let credentials={
        username: user.username
    }
    const saltRounds=10
    bcrypt.hash(user.password, saltRounds)
    .then(data => {
        credentials.password=data
        return bcrypt.hash(user.email, saltRounds)
    })
    .then(data => {
        credentials.email=data
        console.log(credentials)
        return queries.addUser(credentials.email, credentials.username, credentials.password)
    })
    .then(res => console.log('res', res))
    .catch(e => console.log(e))
})

app.post('/user/login', (request, response) => {
    const creds=request.body
    console.log(creds)
    let user = {}
    queries.getUser(creds.username)
    .then(data => {
        console.log(data[0].password)
        console.log(creds.password)
        user = data[0]
        if(data.length>0) {
            return bcrypt.compare(creds.password, data[0].password)
        } else {
            return false
        }
    })
    .then(result => {
        if(!result) {
            return response.status(401).json('invalid credentials')
        } else {
            const userForToken={
                id: user.id,
                username: user.username
            }
            const token=jwt.sign(userForToken, process.env.SECRET)
            response.status(201)
            .send({username: user.username, id: user.id, token: token})

        }
    })
    .catch(e => console.log(e))
}) */



/* app.get('/recommendations/sample', (request, response) => {
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

app.get('/recommendations/list', (request, response) => {
    console.log('täällä')
    fetch(`${config.READGEEK_URL}?recommendations[books]=50`, {
        method: 'get',
        headers: {
            'Authorization': config.READGEEK_AUTH
        }
    })
    .then(response=>response.json())
    .then(data => {
        const books=data.user.recommendations.map(book=> {
            return {
                title: book.title,
                authors: [book.author],
                isbn: book.isbn13,
                prediction: book.prediction,
                image_url: book.cover,
                genres: book.genres,
                description: book.blurb
            }     
        })
        return response.status(200).json(books)
    })
    .catch(e => console.log(e))
}) */

app.get('/book/:isbn', (req, res) => {
    const isbn=req.params.isbn
    fetch(`${config.OPENLIBRARY_URL}?bibkeys=ISBN:${isbn}&jscmd=data&c&format=json`)
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
 
module.exports = app

/* const PORT=3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
}) */