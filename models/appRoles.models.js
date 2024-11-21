const db = require("../db/connection");

function fetchAllAppRoles(){
    return db.query(`SELECT role_id,role_name,CASE WHEN status = TRUE THEN 'Active' ELSE 'Inactive' END AS status FROM app_roles;`).then(({rows})=>{
        return rows
    })
}

function updateAppRoleById(role_id,status){
    const updateAppRoleQuery = `UPDATE app_roles SET status=$2 WHERE role_id=$1 RETURNING *;`
    return db.query(updateAppRoleQuery,[role_id,status]).then(({rows})=>{
        return rows
    })

}

module.exports = {fetchAllAppRoles,updateAppRoleById}