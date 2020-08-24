const libraryRouter=require('express').Router()
const {tokenHandler}=require('../utils/tokenHandler')
const libraryAPI=require('../api/library')

//todo:set under token auth(changes to frontend)
//libraryRouter.use(tokenHandler)

libraryRouter.get('/', (request, response) => {
    const {author}=request.query
    libraryAPI.getBooks(author)
        .then(result => {
            if(result.resultCount===0) {
                response.status(200).send([])
            }
            const data=result.records.map(r=> {
                return r.title.toUpperCase()
            })
            response.status(200).json(data)
        })
        .catch(e=> console.log(e))
})


module.exports=libraryRouter

