const { getAllCancelTypes, postNewCancelType, editCancelTypeById } = require('../controllers/cancelTypes.controllers')

const cancelTypesRouter = require('express').Router()


///Get all cancel types

cancelTypesRouter.get('/',getAllCancelTypes)

///Insert new cancel types

cancelTypesRouter.post('/',postNewCancelType)

//Patch application role by app role id
cancelTypesRouter.patch('/:cancel_type_id',editCancelTypeById)

module.exports = cancelTypesRouter