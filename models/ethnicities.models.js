const db = require("../db/connection");

function fetchAllEthnicities(){
    return db.query(`SELECT ethnicity_id,ethnicity_name FROM ethnicities`).then(({rows})=>{
        return rows
    }).catch((err)=>{

        return err
    })
}

function insertNewEthnicity(ethnicity_name){
    const insertEthnicityQuery = `INSERT INTO ethnicities (ethnicity_name) VALUES ($1) RETURNING *;`
    return db.query(insertEthnicityQuery,[ethnicity_name]).then(({rows})=>{
        return rows
    }).catch((err)=>{
        return err
    })
}

function updateEthnicityById(ethnicity_id,ethnicity_name){

    return db.query(`SELECT ethnicity_id FROM ethnicities;`).then(({rows})=>{
        
        const ethnicityIdMatch = rows.find(ethnicity => ethnicity.ethnicity_id === Number(ethnicity_id))

        if(!ethnicityIdMatch) {
            return Promise.reject({status:404,msg:'ethnicity ID does not exist'})
        }

        return rows
    }).then(()=>{

        const updateEthnicityQuery = `UPDATE ethnicities SET ethnicity_name=$2 WHERE ethnicity_id=$1 RETURNING *;`

        return db.query(updateEthnicityQuery, [ethnicity_id,ethnicity_name])
        
    }).then(({rows})=>{

        return rows
    }).catch((err)=>{
        return err
    })
   
}

module.exports = {fetchAllEthnicities,insertNewEthnicity,updateEthnicityById}