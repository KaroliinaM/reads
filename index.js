require('dotenv').config()
const express=require('express')
const fetch=require('node-fetch')
const cors = require('cors')
const Pool = require('pg').Pool
const parseString = require('xml2js').parseString;
const app=express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDB,
  password: process.env.PGPASS,
  port: process.env.PGPORT,
})


app.get('/readlists', (request, response) => {
    pool.query('SELECT * FROM readlist', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

app.post('/readlists', (request, response) => {
    const {name} = request.body
    console.log('name', name)
     pool.query('insert into readlist values(default, $1) returning id', [name], (error, result) => {
        if(error) {
            throw error
        }
        console.log(result.rows[0].id)
        response.status(201).send({id:result.rows[0].id, name: name})
    }) 
})

app.get('/author', (request, response) => {
    const {name}=request.body
    pool.query('select * from author where name=$1', [name])
    .then(result => response.status(200).json(result.rows) )
    .catch(error => console.log(error))
    
})


app.post('/books', (request, response) => {
    const book=request.body
    const join={}
    pool.query('select * from author where name=$1', [book.author])
    .then(result => {
        if(result.rows.length==0) {
            return pool.query('insert into author values(default, $1) returning id', [book.author])
        } else {
            return result
        } 
    })
    .then(result=> {
        join.author_id=result.rows[0].id
        console.log("authorid", join.author_id)
        return pool.query('insert into book values(default, $1, $2, $3, $4, $5, $6) returning id'
        , [book.title, book.isbn, book.isbn13, book.image_url, book.description, book.readlist_id])
    })
    .then(result => {
        join.book_id=result.rows[0].id
        return pool.query('insert into booktoauthor values($1, $2)', [join.book_id, join.author_id])
    })
    .then(result => {
        book.id=join.book_id
        return response.status(201).json(book)
    })
    .catch(e => console.log(e))
})

app.get('/db', (request, response) => {
    pool.query('SELECT * FROM book ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
})})

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