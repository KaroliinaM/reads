const readListRouter = require('express').Router()
const ReadList= require('../models/ReadList')
const {tokenHandler}=require('../utils/tokenHandler')
readListRouter.use(tokenHandler)

readListRouter.get('/', (request, response) => {
    ReadList.getAll(request.decodedToken.id)
    .then(result=>{
        response.status(200).json(result)
    })
})

readListRouter.post('/', (request, response) => {
    const {name} = request.body
    ReadList.addList(name, request.decodedToken.id)
    .then(result=> {
        response.status(201).send(result)
    })
    .catch(e => console.log(e))
})

readListRouter.get('/:id', (request, response) => {
    const list = request.params.id
    ReadList.getBooks(list)
    .then(result=> {
        return response.status(200).json(result)
    })
    .catch(e => console.log(e))        
})




module.exports = readListRouter;