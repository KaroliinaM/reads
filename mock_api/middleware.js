const checkHeaders = (request, response, next) => {
    const token=request.get('authorization')
    console.log('token', token)
    if(!token || token !== 'Basic token') {
        return response.status(401).json({error: 'virheellinen token'})
    }
    next();
}

module.exports={
    checkHeaders
}