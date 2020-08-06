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
const libraryRouter=require('./controllers/libraryRouter')
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))


app.use('/readlists', readListRouter)
app.use('/books', bookRouter)
app.use('/recommendations', recommendationRouter)
app.use('/user', userRouter)
app.use('/library', libraryRouter)


KEY = process.env.GR_KEY



if(process.env.NODE_ENV !== 'production') {
    const cypressRouter=require('./controllers/cypressRouter')
    app.use('/api/testing', cypressRouter)
}

app.get('/book/:isbn', (req, res) => {
    const isbn=req.params.isbn.trim()
    const url=`${config.OPENLIBRARY_URL}?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
    console.log('url', url)
    fetch(`${config.OPENLIBRARY_URL}?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
    .then(response=> response.json())
    .then(data => {
        const bookData=data[`ISBN:${isbn}`]
        console.log('bookdata', bookData)
        if(!bookData) {
            return res.send({})
        }
        const book = {
            title:(bookData.title? bookData.title : null),
            isbn: isbn,
            image_url: (bookData.cover? bookData.cover.medium : null),
            authors: (bookData.authors? bookData.authors.map(a => a.name) : null) 
        }
        return res.json(book)
    })
    .catch(e => console.log(e));
})
 
module.exports = app
