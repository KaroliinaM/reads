require('dotenv').config()
const express=require('express')
const fetch=require('node-fetch')
const parseString = require('xml2js').parseString;
const app=express()

KEY = process.env.GR_KEY

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
    fetch(`https://www.goodreads.com/book/isbn/0060512148?format=xml&key=${KEY}`)
    .then(res=>res.text())
    .then(body => {
        parseString(body, (err, result) => {
            console.log(result.GoodreadsResponse)
            const bookData=result.GoodreadsResponse.book[0]
            const book = {
                title:bookData.title[0]
            }
            console.log(book)    
        });
    })
    .catch(e => console.log(e));
})

const PORT=3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})