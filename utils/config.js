require('dotenv').config()

let KEY = process.env.GR_KEY

let READGEEK_URL = 'https://www.readgeek.com/api/user/1'
let READGEEK_AUTH = process.env.READGEEK_AUTH

if(process.env.NODE_ENV!=='production') {
    READGEEK_URL='http://localhost:3002/readgeek'
    READGEEK_AUTH = "token"
}

module.exports= {
    KEY,
    READGEEK_URL,
    READGEEK_AUTH
}

