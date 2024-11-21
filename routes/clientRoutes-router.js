const { getAllClients, getClientById, postNewClient, editClient } = require('../controllers/clients.controllers')

const clientRouter = require('express').Router()


clientRouter.get('/',getAllClients)

clientRouter.get('/:client_id',getClientById)

clientRouter.post('/',postNewClient)

clientRouter.patch('/:client_id',editClient)



module.exports = clientRouter