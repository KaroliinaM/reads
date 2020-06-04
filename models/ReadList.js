const {pool}=require('../utils/Database') 

const getAll=()=>{
    return pool.query('SELECT * FROM readlist')
    .then(result=>{
        return result.rows
    })
    .catch(e => console.log(e)) 
}

const addList=(name)=>{
    return pool.query('insert into readlist values(default, $1) returning id', [name])
        .then(result =>{
            const data={
                id:result.rows[0].id, 
                name: name
            }
            return data
    })
    
}

const getBooks=(list)=> {
    return pool.query('select book.id as id, title, author.name as author, description from book, booktoauthor, author where book.id=booktoauthor.book_id and author.id=booktoauthor.author_id and readlist_id=$1',
    [list])
    .then(result =>  {
        result.rows.forEach(book => {
            book.authors=new Array(book.author)
        })
        return result.rows
    })
}

module.exports={
    getAll,
    addList,
    getBooks
}