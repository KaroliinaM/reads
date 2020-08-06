const libraryRouter=require('express').Router()
const {tokenHandler}=require('../utils/tokenHandler')
const fetch=require('node-fetch')
const config=require('../utils/config')

//todo:set under token auth(changes to frontend)
//libraryRouter.use(tokenHandler)

libraryRouter.get('/', (request, response) => {
    const {author}=request.query
    const helper=author.split(' ')
    const searchString=encodeURIComponent(helper.join('+'))
    const last=[helper.pop()]
    console.log(searchString)
    console.log(helper, last)
    const authorString=encodeURIComponent(last.concat(helper).join('+'))
    console.log(authorString)
   fetch(`${config.HELMET_URL}?lookfor=${searchString}&filter[]=~building:0/Helmet/&filter[]=~format:0/Book/&filter[]=~author:${authorString}&limit=100`)
   .then(res=>res.json())
   .then(result => {
       console.log(result.resultCount, 'pituus', result.records.length)
       const data=result.records.map(r=> {
           return r.title.toUpperCase()
       })
       response.status(200).json(data)
   })
   .catch(e=> console.log(e))
})


module.exports=libraryRouter

