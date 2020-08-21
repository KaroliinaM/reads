const fetch=require('node-fetch')
const config=require('../utils/config')
const moment=require('moment')

const handleResponse = (response) => {
    if(!response.ok) {
        throw response
    }
    return response.json()
}

const handlePatch = (data, readgeek_id) => {
    return fetch(`${config.READGEEK_URL}/${readgeek_id}`, {
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${config.READGEEK_AUTH}`
        },
        body: JSON.stringify(data)
    })
        .then(response => handleResponse(response))
}

const handleGet = (url) => {
    return fetch( url, {
        method: 'get',
        headers: {
            'Authorization': `Basic ${config.READGEEK_AUTH}`
        }
    })
        .then(response => handleResponse(response))
}

const register = () => {
    return fetch(`${config.READGEEK_URL}`, {
        method: 'post',
        headers: {
            'Authorization': `Basic ${config.READGEEK_AUTH}`
        } 
    })
        .then(response => handleResponse(response)) 
}

const sample = (readgeek_id) => {
    const url=`${config.READGEEK_URL}/${readgeek_id}?taste_test=20`
    return handleGet(url)
}

const rate = (params, readgeek_id) => {
    const bookid=params.readgeekid? `readgeekid:${params.readgeekid}`:`isbn:${params.isbn}`
    const data={
        books: {
            [bookid]:{
                rated: params.rated,
                date_rated: moment(new Date()).format('YYYY-MM-DD')
            }
        }
    }
    return handlePatch(data, readgeek_id)
}

const bookmark = (book, readgeek_id) => {
    const data={
        books: {
            [`isbn:${book.isbn}`]:{
                date_bookmarked: moment(new Date()).format('YYYY-MM-DD')
            }
        }
    }
    return handlePatch(data, readgeek_id)
}

const listRecommendations = (readgeek_id) => {
    const url= `${config.READGEEK_URL}/${readgeek_id}?recommendations[books]=50`
    return handleGet(url)
}


module.exports={
    register,
    sample,
    rate,
    listRecommendations,
    bookmark
}