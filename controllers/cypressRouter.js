const cypressRouter=require('express').Router()
const db=require('../models/queries')

cypressRouter.post('/reset', async (request, response) => {
    await db.emptyBookToAuthor()
    await db.emptyBook()
    await db.emptyAuthor()
    await db.emptyReadlist()
    await db.emptyUserdata()
    response.status(204).end()
})

module.exports = cypressRouter