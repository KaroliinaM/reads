const fetch=require('node-fetch')
const config=require('../utils/config')

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

module.exports={
    register,
    sample
}