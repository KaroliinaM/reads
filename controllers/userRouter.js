const userRouter=require('express').Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const queries=require('../models/queries')

userRouter.post('/register', (request, response) => {
    console.log('polku on')
    const user= request.body
    console.log(user)
    let credentials={
        username: user.username
    }
    const saltRounds=10
    bcrypt.hash(user.password, saltRounds)
    .then(data => {
        credentials.password=data
        return bcrypt.hash(user.email, saltRounds)
    })
    .then(data => {
        credentials.email=data
        console.log(credentials)
        return queries.addUser(credentials.email, credentials.username, credentials.password)
    })
    .then(res => {
        return response.status(201).json(res)
    })
    .catch(e => console.log(e))
})

userRouter.post('/login', (request, response) => {
    const creds=request.body
    console.log(creds)
    let user = {}
    queries.getUser(creds.username)
    .then(data => {
        console.log(data[0].password)
        console.log(creds.password)
        user = data[0]
        if(data.length>0) {
            return bcrypt.compare(creds.password, data[0].password)
        } else {
            return false
        }
    })
    .then(result => {
        if(!result) {
            return response.status(401).json('invalid credentials')
        } else {
            const userForToken={
                id: user.id,
                username: user.username
            }
            const token=jwt.sign(userForToken, process.env.SECRET)
            response.status(201)
            .send({username: user.username, id: user.id, token: token})

        }
    })
    .catch(e => console.log(e))
})

module.exports= userRouter