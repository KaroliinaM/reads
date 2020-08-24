const recommendationRouter=require('express').Router()
const config=require('../utils/config')
const fetch=require('node-fetch')
const moment=require('moment')
const Book = require('../models/Book')
const User = require('../models/User')
const ReadList=require('../models/ReadList')
const recommendAPI= require('../api/recommend')
const {tokenHandler}=require('../utils/tokenHandler')
recommendationRouter.use(tokenHandler)


recommendationRouter.get('/sample', (request, response) => {
    const readgeek_id=request.decodedToken.readgeek_id
    recommendAPI.sample(readgeek_id)
        .then(data => {
            const books=data.user.taste_test.map(book=>{
                return {
                    authors: [book.author],
                    image_url: book.cover,
                    readgeekid: book.readgeekid,
                    title: book.title
                }
            })
            return response.status(200).json(books)
        })
        .catch(e => console.log(e))
})


//content type for mock platform
recommendationRouter.post('/rate', (request, response) => {
    const params=request.body
    const readgeek_id=request.decodedToken.readgeek_id
    let ratedBook
    ReadList.getListId('rated', request.decodedToken.id)
        .then(res=> {
            params.readlist_id=res[0].id
            if(!params.id) {
                return Book.addBook(params)
            } else {
                return Book.setRating(params)
            }
        
        })
        .then(res => {
            ratedBook=res
            recommendAPI.rate(params, readgeek_id)
        })
        .then(data => {
            return response.status(201).json(ratedBook)        
        })
        .catch(e => console.log(e)) 
})

recommendationRouter.get('/list', (request, response) => {
    const readgeek_id=request.decodedToken.readgeek_id
    recommendAPI.listRecommendations(readgeek_id)
        .then(data => {
            const books=data.user.recommendations.map(book=> {
                return {
                    title: book.title,
                    authors: [book.author],
                    isbn: book.isbn13,
                    prediction: book.prediction,
                    image_url: book.cover,
                    genre: book.genres,
                    description: book.blurb
                }     
            })
            return response.status(200).json(books)
        })
        .catch(e => console.log(e))
})

recommendationRouter.put('/rated', (request, response) => {
    User.tasteTested(request.decodedToken.id)
        .then(res=> {
            return response.status(200).json({status: 'Success'})
        })
})

module.exports=recommendationRouter