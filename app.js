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
const searchRouter=require('./controllers/searchRouter')
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`)
      else
        next()
    })
  }


app.use('/readlists', readListRouter)
app.use('/books', bookRouter)
app.use('/recommendations', recommendationRouter)
app.use('/user', userRouter)
app.use('/library', libraryRouter)
app.use('/book', searchRouter)


KEY = process.env.GR_KEY



if(process.env.NODE_ENV !== 'production') {
    const cypressRouter=require('./controllers/cypressRouter')
    app.use('/api/testing', cypressRouter)
}
 
module.exports = app
