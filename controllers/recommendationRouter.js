const recommendationRouter=require('express').Router()
const config=require('../utils/config')
const fetch=require('node-fetch')
const moment=require('moment')
const Book = require('../models/Book')
const User = require('../models/User')
const ReadList=require('../models/ReadList')
const {tokenHandler}=require('../utils/tokenHandler')
recommendationRouter.use(tokenHandler)

//content type for mock platform
recommendationRouter.get('/sample', (request, response) => {
    console.log('toimii')
    const readgeek_id=request.decodedToken.readgeek_id
    console.log(config.READGEEK_URL)
    fetch(`${config.READGEEK_URL}/${readgeek_id}?taste_test=20`, {
        method: 'get',
        headers: {
            'Authorization': `Basic ${config.READGEEK_AUTH}`
        }
    })
    .then(response => response.json())
    .then(data => {

        console.log(data.user.taste_test)
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



recommendationRouter.post('/rate', (request, response) => {
    const params=request.body
    console.log(params)
    const readgeek_id=request.decodedToken.readgeek_id
    console.log(request.decodedToken)
    User.tasteTested(request.decodedToken.id)
    .then(res => {
        return ReadList.getListId('rated', request.decodedToken.id)
    })
    .then(res=> {
        console.log('readlist', res[0].id)
        params.readlist_id=res[0].id
        return Book.addBook(params)
    })
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
        return fetch(`${config.READGEEK_URL}/${readgeek_id}`, {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${config.READGEEK_AUTH}`
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

recommendationRouter.get('/list', (request, response) => {
    console.log('täällä')
    const readgeek_id=request.decodedToken.readgeek_id
    fetch(`${config.READGEEK_URL}/${readgeek_id}?recommendations[books]=50`, {
        method: 'get',
        headers: {
            'Authorization': `Basic ${config.READGEEK_AUTH}`
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
})

module.exports=recommendationRouter