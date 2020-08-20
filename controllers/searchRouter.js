const searchRouter=require('express').Router()
const searchAPI=require('../api/search')

searchRouter.get('/:isbn', (req, res) => {
    const isbn=req.params.isbn.trim()
    searchAPI.search(isbn)
    .then(data => {
        const bookData=data[`ISBN:${isbn}`]
        if(!bookData) {
            return res.send({})
        }
        const book = {
            title:(bookData.title? bookData.title : null),
            isbn: isbn,
            image_url: (bookData.cover? bookData.cover.medium : null),
            authors: (bookData.authors? bookData.authors.map(a => a.name) : null) 
        }
        return res.json(book)
    })
    .catch(e => console.log(e));
})

module.exports=searchRouter