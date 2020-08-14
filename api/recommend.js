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

module.exports={
    register
}