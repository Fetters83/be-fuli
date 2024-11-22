const { getAllGenders } = require('../controllers/genders.controllers')

const gendersRouter = require('express').Router()

gendersRouter.get('/',getAllGenders)

module.exports = gendersRouter


