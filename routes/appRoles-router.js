const { getAllAppRoles, editAppRoleById } = require('../controllers/appRoles.controllers')

const appRolesRouter = require('express').Router()

///Get all application roles

appRolesRouter.get('/',getAllAppRoles)

//Patch application role by app role id
appRolesRouter.patch('/:role_id',editAppRoleById)

module.exports = appRolesRouter