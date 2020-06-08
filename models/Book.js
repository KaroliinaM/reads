const {pool} = require('../utils/Database.js')
const db=require('./queries') 

const getAuthor = (name)=> {
    return db.getAuthorByName(name)
}

const addBook = (book) => {
    let join={}
    return db.getAuthorByName(book.authors[0])
    .then(result => {
        if(result.length==0) {
            return db.insertAuthor(book.authors[0])
        } else {
            return result
        } 
    })
    .then(result=> {
        join.author_id=result[0].id
        console.log("authorid", join.author_id)
        return db.insertBook(book.title, book.isbn, book.image_url, book.readlist_id)
    })
    .then(result => {
        join.book_id=result[0].id
        return db.joinBookWithAuthor(join.book_id, join.author_id)
    })
    .then(result => {
        book.id=join.book_id
        return book
    })
}

const getById =(id)=>{
    let book={}
    return db.getAuthorsByBookId(id)
    .then(result => {
        book.authors=result.map(a => a.name)
        console.log(book.authors)
        return db.getBookById(id)
    })
    .then(result => {
        console.log(result)
        book.id=result[0].id
        book.title=result[0].title
        book.image_url=result[0].image_url
        return book
    })
    
}

module.exports={
    getAuthor,
    addBook,
    getById
}