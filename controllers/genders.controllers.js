const { fetchAllGenders } = require("../models/genders.models")

function getAllGenders(req,res,next){

    fetchAllGenders().then((results)=>{
        res.status(200).send(results)
    })
}

module.exports = {getAllGenders}