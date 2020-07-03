const bookRouter = require('express').Router()
const Book=require('../models/Book')
const {tokenHandler}=require('../utils/tokenHandler')
bookRouter.use(tokenHandler)

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
    let addToList
    if(!book.id) {
        addToList=Book.addBook(book)
    } else {
        addToList=Book.setReadlist(book)
    }
    addToList
    .then(result=>{
        return response.status(201).json(result)
    })
    .catch(e=> console.log(e))
})


bookRouter.get('/:id', (request, response) => {
    const id=request.params.id
    console.log(id)
    Book.getById(id)
    .then(result => {
        return response.status(200).json(result)
    })
    .catch(e => console.log(e))
})

module.exports = bookRouter