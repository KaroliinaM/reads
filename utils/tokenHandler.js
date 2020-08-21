const jwt=require('jsonwebtoken')
require('dotenv').config()

const getTokenFrom= (request) => {
    const authorization=request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7)
    }
    return null
}

const tokenHandler = (request, response, next) => {
    const token=getTokenFrom(request)
    const decodedToken=jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    request.decodedToken = decodedToken
    next()
}

module.exports={
    tokenHandler
}