const readListRouter = require('express').Router()
const ReadList= require('../models/ReadList')
const {tokenHandler}=require('../utils/tokenHandler')
readListRouter.use(tokenHandler)

readListRouter.get('/', (request, response) => {
    ReadList.getAll(request.decodedToken.id)
    .then(result=>{
        (console.log(result))
        response.status(200).json(result)
    })
})

readListRouter.post('/', (request, response) => {
    const {name} = request.body
    console.log('name', name)
    ReadList.addList(name)
    .then(result=> {
        response.status(201).send(result)
    })
})




module.exports = readListRouter;