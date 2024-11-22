const db = require('../db/connection')

function fetchAllGenders(){

    return db.query('SELECT * FROM genders;').then(({rows})=>{
        return rows
    }).catch((err)=>{

        return Promise.reject(err)
    })
}

module.exports={fetchAllGenders}