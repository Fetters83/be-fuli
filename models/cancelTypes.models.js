const db = require("../db/connection");

function fetchAllCancelTypes(){
    return db.query(`SELECT cancel_type_id,description,CASE WHEN status = TRUE THEN 'Active' ELSE 'Inactive' END AS status FROM cancel_types`).then(({rows})=>{
        return rows
    })
}

function insertNewCancelType(description,status){
    const insertCancelTypeQuery = `INSERT INTO cancel_types (description, status) VALUES ($1,$2) RETURNING *;`
    return db.query(insertCancelTypeQuery,[description,status]).then(({rows})=>{
        return rows
    })
}

function updateCancelTypeById(cancel_type_id,description,status){
    const updateCancelTypeQuery = `UPDATE cancel_types SET description=$2,status=$3 WHERE cancel_type_id=$1 RETURNING *;`
    return db.query(updateCancelTypeQuery, [cancel_type_id,description,status]).then(({rows})=>{
        return rows
    })
}
module.exports = {fetchAllCancelTypes,insertNewCancelType,updateCancelTypeById}