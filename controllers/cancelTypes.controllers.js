const { fetchAllCancelTypes, insertNewCancelType, updateCancelTypeById } = require("../models/cancelTypes.models")


function getAllCancelTypes(req,res,next){

    fetchAllCancelTypes().then((results)=>{
        res.status(200).send(results)
    })

}

function postNewCancelType(req,res,next){
    
    const{description,status} = req.body
    insertNewCancelType(description,status).then((result)=>{
        res.status(200).send(result)
    })
    
}

function editCancelTypeById(req,res,next){
    const{cancel_type_id} = req.params
    const{description,status} = req.body
    updateCancelTypeById(cancel_type_id,description,status).then((result)=>{
        res.status(200).send(result)
    })
    

}

module.exports={getAllCancelTypes,postNewCancelType,editCancelTypeById}