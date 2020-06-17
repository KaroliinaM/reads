const {pool}=require('../utils/Database') 
const db=require('./queries')
const Book = require('./Book')

const getAll=(id)=>{
    return db.getReadLists(id)
}

const addList=(name, user_id)=>{
    return db.addReadList(name, user_id)
        .then(result =>{
            const data={
                id:result[0].id, 
                name: name,
                user_id: user_id
            }
            return data
    })
    
}

const getBooks=(list)=> {
    let lista=[]
    const promises=[]
    return db.getBookIdByReadlistId(list)
    .then(result =>  {
        result.forEach(book => {
            promises.push(Book.getById(book.id)
            .then(result => {
                lista.push(result)
            }))
        })
        return Promise.all(promises)
        .then(() => {
            return lista
        })
    })
    .then(result=>{
        return result
    })
}

module.exports={
    getAll,
    addList,
    getBooks
}