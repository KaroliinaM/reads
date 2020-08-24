const fetch=require('node-fetch')
const config=require('../utils/config')

const getBooks = (author) => {
    const helper=author.split(' ')
    const searchString=encodeURIComponent(helper.join('+'))
    const last=[helper.pop()]
    const authorString=encodeURIComponent(last.concat(helper).join('+'))
    return fetch(`${config.HELMET_URL}?lookfor=${searchString}&filter[]=~building:0/Helmet/&filter[]=~format:0/Book/&filter[]=~author:${authorString}&limit=100`)
        .then(res=>res.json())
}

module.exports={
    getBooks
}