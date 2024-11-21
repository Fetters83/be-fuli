const {getSignInToken} = require('../controllers/getSignInToken')

const authRouter = require('express').Router()

//Auth router will call getSignInToken to start the process of verifying the user
authRouter.post('/',getSignInToken)


module.exports = authRouter;