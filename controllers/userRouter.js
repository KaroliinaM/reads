const userRouter=require('express').Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const fetch=require('node-fetch')
const config=require('../utils/config')
const queries=require('../models/queries')
const ReadList=require('../models/ReadList')

userRouter.post('/register', (request, response) => {
    const user= request.body
    if(user.username.length===0 || user.password.length===0) {
        return response.status(400).json({error: 'credential fields cannot be empty'})
    }
    let credentials={
        username: user.username
    }
    const saltRounds=10
    queries.getUser(user.username)
    .then(result => {
        if(result.length>0) {
            throw({status: 400, text:'username is already in use'})
        }
        return bcrypt.hash(user.password, saltRounds)
    })
    .then(data => {
        credentials.password=data
        return bcrypt.hash(user.email, saltRounds)
    })
    .then(data => {
        credentials.email=data
        return fetch(`${config.READGEEK_URL}`, {
            method: 'post',
            headers: {
                'Authorization': `Basic ${config.READGEEK_AUTH}`
            } 
        })        
    })
    .then(response => response.json())
    .then(data => {
        credentials.readgeek_id=data.user.id
        return queries.addUser(credentials.email, credentials.username, credentials.password, credentials.readgeek_id)
    })
    .then(res => {
        credentials.id=res[0].id
        return ReadList.addList('rated', res[0].id)
    })
    .then(res => {
        response.status(201).json(credentials)
    })
    .catch(e => {
        console.log(e)
        if(e.status===400) {
            return response.status(400).json('username is already in use')
        }
        return response.status(500).json('internal error')
    })
})

userRouter.post('/login', (request, response) => {
    const creds=request.body
    let user = {}
    queries.getUser(creds.username)
    .then(data => {
        if(data.length>0) {
            user = data[0]
            return bcrypt.compare(creds.password, data[0].password)
        } else {
            return false
        }
    })
    .then(result => {
        if(!result) {
            return response.status(401).json({error:'invalid credentials'})
        } else {
            const userForToken={
                id: user.id,
                username: user.username,
                readgeek_id:user.readgeek_id
            }
            const token=jwt.sign(userForToken, process.env.SECRET)
            response.status(201)
            .send({username: user.username, id: user.id, taste_tested:user.taste_tested, token: token})

        }
    })
    .catch(e => {
        console.log(e)
        return response.status(500).json({error: 'internal error'})
    })
})

module.exports= userRouter