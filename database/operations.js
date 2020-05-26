const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDB,
    password: process.env.PGPASS,
    port: process.env.PGPORT,
  })

const getReadLists = (request, response) => {
    pool.query('SELECT * FROM readlist', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const postReadList = (request, response) => {
    const {name} = request.body
    console.log('name', name)
     pool.query('insert into readlist values(default, $1) returning id', [name], (error, result) => {
        if(error) {
            throw error
        }
        console.log(result.rows[0].id)
        response.status(201).send({id:result.rows[0].id, name: name})
    }) 
}

const getAuthor= (request, response) => {
    const {name}=request.body
    pool.query('select * from author where name=$1', [name])
    .then(result => response.status(200).json(result.rows) )
    .catch(error => console.log(error))
    
}

const postBook = ( request, response) => {
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
}

const getBooksByList = (request, response) => {
    const list = request.params.id
    console.log('list',list)
    pool.query('select book.id as id, title, author.name as author, description from book, booktoauthor, author where book.id=booktoauthor.book_id and author.id=booktoauthor.author_id and readlist_id=$1',
    [list])
    .then(result =>  {
        return response.status(200).json(result.rows)
    })
    .catch(e => console.log(e))
}


module.exports ={
    getReadLists,
    postReadList,
    getAuthor,
    postBook,
    getBooksByList
}