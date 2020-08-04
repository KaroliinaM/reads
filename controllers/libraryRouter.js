const libraryRouter=require('express').Router()
const tokenHandler=require('../utils/tokenHandler')
const fetch=require('node-fetch')

//libraryRouter.use(tokenHandler)

libraryRouter.get('/', (request, response) => {
    const {author}=request.query
    const helper=author.split(' ')
    const searchString=helper.join('+')
    const last=[helper.pop()]
    console.log(searchString)
    console.log(helper, last)
    const authorString=last.concat(helper).join('+')
    console.log(authorString)

   fetch(`https://api.finna.fi/v1/search?lookfor=${searchString}&filter[]=~building:0/Helmet/&filter[]=~format:0/Book/&filter[]=~author:${authorString}&limit=100`)
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

