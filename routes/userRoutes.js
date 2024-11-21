const { createUser, createNewUser, signIn, signOut } = require('../controllers/users.controllers')

const usersRouter = require('express').Router()

usersRouter.post('/auth/signup',createNewUser)
usersRouter.post('/auth/verify',signIn)
usersRouter.post('/auth/signout',signOut)

module.exports = usersRouter