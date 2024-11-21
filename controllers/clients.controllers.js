const { fetchAllClients, fetchClientById, insertNewClient, updateClient } = require("../models/clients.models")

function getAllClients(req,res,next){

    fetchAllClients().then((results)=>{
        res.status(200).send(results)
    })

}

function getClientById(req,res,next){
    const{client_id} = req.params

    fetchClientById(client_id).then((results)=>{
        res.status(200).send(results)
    })

}

function postNewClient(req,res,next){

    const {client_username,first_name,surname,dob,identity_gender_id,birth_gender_id,ethnicity_id} = req.body
    insertNewClient(client_username,first_name,surname,dob,identity_gender_id,birth_gender_id,ethnicity_id).then((result)=>{
        res.status(200).send(result)
    }).catch((err)=>{
        next(err)
    })

}

function editClient(req,res,next){
    
    const{client_id} = req.params
    const {client_username,first_name,surname,dob,identity_gender_id,birth_gender_id,ethnicity_id} = req.body

    updateClient(client_id,client_username,first_name,surname,dob,identity_gender_id,birth_gender_id,ethnicity_id).then((result)=>{
        res.status(200).send(result)
    }).catch((err)=>{
        next(err)
    })



}



module.exports = {getAllClients,getClientById,postNewClient,editClient}