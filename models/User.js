const db=require('../models/queries')

const tasteTested=(id)=> {
    return db.setTasteTested(id)
}

module.exports={
    tasteTested
}