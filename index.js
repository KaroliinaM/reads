require('dotenv').config()
const express=require('express')
const fetch=require('node-fetch')
const app=express()

KEY = process.env.GR_KEY

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
    fetch(`https://www.goodreads.com/book/isbn/0060512148?format=xml&key=${KEY}`)
    .then(res=>res.text())
    .then(body => console.log(body));
})

const PORT=3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})