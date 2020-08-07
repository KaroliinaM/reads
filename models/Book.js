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
        rated: data.rated,
        genre: data.genre

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
        return db.insertBook(book.title, book.isbn, book.image_url, book.description, book.readlist_id, book.readgeekid, book.rated, book.genre)
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
    .then(result => {
        return data
    })
}

const setRating= (data) => {
    const values = {
        id: data.id,
        rated: data.rated,
        readlist_id: data.readlist_id
    }
    return db.updateBookRating(values.readlist_id, values.rated, values.id)
} 

const getById =(id)=>{
    let book={}
    return db.getAuthorsByBookId(id)
    .then(result => {
        book.authors=result.map(a => a.name)
        return db.getBookById(id)
    })
    .then(result => {
        book.id=result[0].id
        book.title=result[0].title
        book.isbn=result[0].isbn
        book.image_url=result[0].image_url
        book.description=result[0].description
        book.readlist_id=result[0].readlist_id
        book.readgeekid=result[0].readgeekid
        book.rated=result[0].rated
        book.genre=result[0].genre
        return book
    })
    
}

module.exports={
    getAuthor,
    addBook,
    getById,
    setReadlist,
    setRating
}