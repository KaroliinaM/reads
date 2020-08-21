const bookRouter = require('express').Router()
const Book=require('../models/Book')
const recommendAPI=require('../api/recommend')
const {tokenHandler}=require('../utils/tokenHandler')
bookRouter.use(tokenHandler)

const addToList = (book, readgeek_id) => {
    if(!book.id) {
        return recommendAPI.bookmark(book, readgeek_id)
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
            console.log('lisäys', result)
            return response.status(201).json({result})
        })
        .catch(error=> console.log(error))
})


bookRouter.get('/:id', (request, response) => {
    const id=request.params.id
    Book.getById(id)
        .then(result => {
            return response.status(200).json(result)
        })
        .catch(error => console.log(error))
})

module.exports = bookRouter