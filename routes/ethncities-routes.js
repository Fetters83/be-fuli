const { getAllEthnicities, postNewEthnicity, editEthnicityById } = require('../controllers/ethncities.controllers')

const ethnicitiesRouter = require('express').Router()

ethnicitiesRouter.get('/',getAllEthnicities)

ethnicitiesRouter.post('/',postNewEthnicity)

ethnicitiesRouter.patch('/:ethnicity_id',editEthnicityById)


module.exports = ethnicitiesRouter