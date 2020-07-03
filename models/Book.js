const {pool} = require('../utils/Database.js')
const db=require('./queries') 

const getAuthor = (name)=> {
    return db.getAuthorByName(name)
}

const addBook = (data) => {
    const book={
        title:data.title,
        isbn:data.isbn,
        image_url:data.image_url,
        description: data.description,
        readlist_id:data.readlist_id,
        readgeekid:data.readgeekid,
        authors: data.authors,
        rated: data.rated

    }
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
        return db.insertBook(book.title, book.isbn, book.image_url, book.description, book.readlist_id, book.readgeekid, book.rated)
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

const setReadlist = (data) => {
    const values={
        id:data.id,
        readlist_id:data.readlist_id
    }
    return db.updateReadlistOnBook(values.readlist_id, values.id)
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
    getById,
    setReadlist
}