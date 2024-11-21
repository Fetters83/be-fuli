const { fetchAllAppRoles, updateAppRoleById } = require("../models/appRoles.models")


function getAllAppRoles(req,res,next){

    fetchAllAppRoles().then((results)=>{
        res.status(200).send(results)
    })
}

function editAppRoleById(req,res,next){
const {status} = req.body
const {role_id} = req.params
updateAppRoleById(role_id,status).then((result)=>{
    res.status(200).send(result)
})
}

module.exports = {getAllAppRoles,editAppRoleById}