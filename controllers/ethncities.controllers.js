
const { fetchAllEthnicities, insertNewEthnicity, updateEthnicityById } = require("../models/ethnicities.models")


function getAllEthnicities(req,res,next){

    fetchAllEthnicities().then((results)=>{
        res.status(200).send(results)
    }).catch((err)=>{
        next(err)
    })

}

function postNewEthnicity(req,res,next){
    
    const{ethnicity_name} = req.body
    insertNewEthnicity(ethnicity_name).then((result)=>{
        res.status(200).send(result)
    }).catch((err)=>{
        next(err)
    })
    
}

function editEthnicityById(req,res,next){
    const{ethnicity_id} = req.params
    const{ethnicity_name} = req.body
    updateEthnicityById(ethnicity_id,ethnicity_name).then((result)=>{
        res.status(200).send(result)
    }).catch((err)=>{
        next(err)
    })
    

}

module.exports = {getAllEthnicities,postNewEthnicity,editEthnicityById}