require('dotenv').config()

let KEY = process.env.GR_KEY

let READGEEK_URL = 'https://www.readgeek.com/api/user'
let READGEEK_AUTH = process.env.READGEEK_AUTH
let OPENLIBRARY_URL= 'https://openlibrary.org/api/books'

if(process.env.NODE_ENV!=='production') {
    READGEEK_URL='http://localhost:3002/readgeek'
    READGEEK_AUTH = "token"
    OPENLIBRARY_URL = 'http://localhost:3002/openlibrary'
}

module.exports= {
    KEY,
    READGEEK_URL,
    READGEEK_AUTH,
    OPENLIBRARY_URL
}

