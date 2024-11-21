const { getAllClientAppointments, getClientAppointmentsById, getClientAppointmentsByClientId, postNewClientAppointment, removeClientAppointmentById, editClientAppointmentById } = require('../controllers/clientAppointments.contollers')


const clientAppointmentsRouter = require('express').Router()

/////get client appointments
//all
clientAppointmentsRouter.get('/',getAllClientAppointments)
//by appointment_id
clientAppointmentsRouter.get('/:appointment_id',getClientAppointmentsById)
//by client_id
clientAppointmentsRouter.get('/client/:client_id',getClientAppointmentsByClientId)


////post client appointments
//by client_id
clientAppointmentsRouter.post('/client/:client_id',postNewClientAppointment)

//delete client appointments
//by appointment_id
clientAppointmentsRouter.delete('/appointments/:appointment_id',removeClientAppointmentById)


//patch client appointments
//by appointment_id
clientAppointmentsRouter.patch('/appointments/:appointment_id',editClientAppointmentById)

module.exports = clientAppointmentsRouter;