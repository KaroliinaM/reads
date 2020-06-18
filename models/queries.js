const {pool}=require('../utils/Database.js') 

const getAuthorByName = (name) => {
    return pool.query('select * from author where name=$1', [name])
    .then(result => {
        return result.rows
    })
}

const insertAuthor = (author) => {
    return pool.query('insert into author values(default, $1) returning id', [author])
    .then(result => {
        return result.rows
    })
}

const insertBook = (title, isbn, image_url, description, readlist_id, readgeekid, rated) => {
    return pool.query('insert into book values(default, $1, $2, $3, $4, $5, $6, $7) returning id'
    , [title, isbn, image_url, description, readlist_id, readgeekid, rated])
    .then(result => {
        return result.rows
    })
}
const joinBookWithAuthor = (book_id, author_id) => {
    return pool.query('insert into booktoauthor values($1, $2)', [book_id, author_id])
    .then(result => {
        return result.rows
    })
}

const getAuthorsByBookId = (id) => {
    return pool.query('select author.name from booktoauthor, author where booktoauthor.author_id=author.id and booktoauthor.book_id=$1', [id])
    .then(result => {
        return result.rows
    })
}

const getBookById = (id) => {
    return pool.query('select book.id as id, title, image_url from book where book.id=$1',[id])
    .then(result => {
        return result.rows
    })
}

const getReadLists = (id) => {
    return pool.query('SELECT * FROM readlist where user_id=$1', [id])
    .then(result=>{
        return result.rows
    })
}

const getBookIdByReadlistId = (list) => {
    return pool.query('select id from book where readlist_id=$1',[list])
    .then(result => {
        return result.rows
    })
}

const addReadList = (name, user_id) => {
    return pool.query('insert into readlist values(default, $1, $2) returning id', [name, user_id])
    .then(result =>{
        return result.rows
    })
}

const addUser = (email, username, password, readgeek_id) => {
    return pool.query('insert into userdata values(default, $1, $2, $3, $4) returning id', [email, username, password, readgeek_id])
    .then(result => {
        return result.rows
    })
}

const getUser = (username) => {
    return pool.query('select * from userdata where username=$1', [username])
    .then(result => {
        return result.rows
    })
}

const setTasteTested=(id)=> {
    return pool.query('update userdata set taste_tested=true where id=$1', [id])
}

const emptyBookToAuthor = () => {
    return pool.query('delete from booktoauthor')
}

const emptyAuthor = () => {
    return pool.query('delete from author')
}

const emptyBook = () => {
    return pool.query('delete from book')
}

const emptyReadlist = () => {
    return pool.query('delete from readlist')
}

module.exports = {
    getAuthorByName,
    insertAuthor,
    insertBook,
    joinBookWithAuthor,
    getAuthorsByBookId,
    getBookById,
    getReadLists,
    addReadList,
    getBookIdByReadlistId,
    emptyBookToAuthor,
    emptyAuthor,
    emptyBook,
    emptyReadlist,
    addUser,
    getUser,
    setTasteTested
}