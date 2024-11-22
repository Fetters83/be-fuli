const appRolesRouter = require('./appRoles-router');
const cancelTypesRouter = require('./cancelTypes-router');
const clientAppointmentsRouter = require('./clientAppointment-router');
const clientRouter = require('./clientRoutes-router');
const ethnicitiesRouter = require('./ethncities-routes');
const gendersRouter = require('./gendersRoutes-router');
const usersRouter = require('./userRoutes');

const apiRouter = require('express').Router()




//Router for client appointments
apiRouter.use('/clientAppointments',clientAppointmentsRouter)

//Router for app roles
apiRouter.use('/appRoles',appRolesRouter)

//Router for cancel types
apiRouter.use('/cancelTypes',cancelTypesRouter)

//Router for clients
apiRouter.use('/clients',clientRouter)

//Router for ethnicities
apiRouter.use('/ethnicities',ethnicitiesRouter)

//Router for genders
apiRouter.use('/genders',gendersRouter)

//Router for problem types
//apiRouter.use('/problemTypes')

//Router for treatment types
//apiRouter.use('/treatmentTypes')

//Router for users
apiRouter.use('/users',usersRouter)







module.exports = apiRouter;