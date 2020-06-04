const {pool}=require('../utils/Database.js') 

const getAuthor = (name)=> {
    return pool.query('select * from author where name=$1', [name])
    .then(result => {
        return result.rows
    })
}

const addBook =(book) => {
    let join={}
    return pool.query('select * from author where name=$1', [book.authors[0]])
    .then(result => {
        if(result.rows.length==0) {
            return pool.query('insert into author values(default, $1) returning id', [book.authors[0]])
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
        return book
    })
}

const getById =(id)=>{
    let book={}
    return pool.query('select author.name from booktoauthor, author where booktoauthor.author_id=author.id and booktoauthor.book_id=$1', [id])
    .then(result => {
        book.authors=result.rows.map(a => a.name)
        return pool.query('select book.id as id, title, image_url from book where book.id=$1',[id])
    })
    .then(result => {
        console.log(result.rows)
        book.id=result.rows[0].id
        book.title=result.rows[0].title
        book.image_url=result.rows[0].image_url
        return book
    })
    
}

module.exports={
    getAuthor,
    addBook,
    getById
}