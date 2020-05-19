require('dotenv').config()
const express=require('express')
const fetch=require('node-fetch')
const cors = require('cors')
const parseString = require('xml2js').parseString;
const app=express()
app.use(cors())

KEY = process.env.GR_KEY

app.get('/book/:isbn', (req, res) => {
    const isbn=req.params.isbn
    fetch(`https://www.goodreads.com/book/isbn/${isbn}?format=xml&key=${KEY}`)
    .then(res=>res.text())
    .then(body => {
        parseString(body, (err, result) => {
            console.log(result.GoodreadsResponse)
            const bookData=result.GoodreadsResponse.book[0]
            const book = {
                title:bookData.title[0],
                isbn:bookData.isbn[0],
                isbn13:bookData.isbn13[0],
                image_url:bookData.image_url[0],
                description:bookData.description[0],
                authors: bookData.authors.map(a => a.author[0].name[0])
            }
            console.log('isbn', isbn)
            return res.json(book)   
        });
    })
    .catch(e => console.log(e));
})

const PORT=3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})