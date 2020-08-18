const fetch=require('node-fetch')
const config=require('../utils/config')
const moment=require('moment')

const register = () => {
    return fetch(`${config.READGEEK_URL}`, {
        method: 'post',
        headers: {
            'Authorization': `Basic ${config.READGEEK_AUTH}`
        } 
    })
    .then(response => response.json()) 
}

const sample = (readgeek_id) => {
    return fetch(`${config.READGEEK_URL}/${readgeek_id}?taste_test=20`, {
        method: 'get',
        headers: {
            'Authorization': `Basic ${config.READGEEK_AUTH}`
        }
    })
    .then(response => response.json())
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
    return fetch(`${config.READGEEK_URL}/${readgeek_id}`, {
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${config.READGEEK_AUTH}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    
}

const listRecommendations = (readgeek_id) => {
    return fetch(`${config.READGEEK_URL}/${readgeek_id}?recommendations[books]=50`, {
        method: 'get',
        headers: {
            'Authorization': `Basic ${config.READGEEK_AUTH}`
        }
    })
    .then(response=>response.json())
}

module.exports={
    register,
    sample,
    rate,
    listRecommendations
}