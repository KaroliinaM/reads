const bookRouter = require('express').Router()
const Book=require('../models/Book')
const config=require('../utils/config')
const fetch=require('node-fetch')
const {tokenHandler}=require('../utils/tokenHandler')
bookRouter.use(tokenHandler)

const addToList = (book, readgeek_id) => {
    if(!book.id) {
        const data={
            books: {
            [`isbn:${book.isbn}`]:{
                    rated: 'NULL'
                }
            }
        }
        return fetch(`${config.READGEEK_URL}/${readgeek_id}`, {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${config.READGEEK_AUTH}`
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return Book.addBook(book)
        })
    } else {
        return Book.setReadlist(book)
    }
}


bookRouter.get('/author', (request, response) => {
    const {name}=request.body
    Book.getAuthor(name)
    .then(result=>{
        response.status(200).json(result)
    })
    .catch(error => console.log(error))
})

bookRouter.post('/', (request, response) => {
    const book=request.body
    const readgeek_id=request.decodedToken.readgeek_id
    addToList(book, readgeek_id)
    .then(result=>{
        return response.status(201).json(result)
    })
    .catch(e=> console.log(e))
})


bookRouter.get('/:id', (request, response) => {
    const id=request.params.id
    Book.getById(id)
    .then(result => {
        return response.status(200).json(result)
    })
    .catch(e => console.log(e))
})

module.exports = bookRouter