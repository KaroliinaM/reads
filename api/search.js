const config=require('../utils/config')
const fetch=require('node-fetch')

const search=(isbn)=> {
    return fetch(`${config.OPENLIBRARY_URL}?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
    .then(response=> response.json())
}
module.exports={
    search
}