const {
  fetchAllClientAppointments,
  fetchClientAppointmentsById,
  insertNewClientAppointment,
  deleteClientAppointmentById,
  updateClientAppointmentById,
} = require("../models/clientAppointment.models");


//Controller to get all client appointments
function getAllClientAppointments(req, res, next) {
  fetchAllClientAppointments().then((results) => {
    res.status(200).send(results);
  });
}

//Controller to get all client appointments by appointment id
function getClientAppointmentsById(req, res, next) {
  const { appointment_id } = req.params;

  fetchClientAppointmentsById(appointment_id).then((results) => {
    res.status(200).send(results);
  });
}

//Controller to get all client appointments by client id
function getClientAppointmentsByClientId(req, res, next) {
  const { client_id } = req.params;

  fetchClientAppointmentsById(client_id).then((results) => {
    res.status(200).send(results);
  });
}

//Controller to post a new client appointment by client id
function postNewClientAppointment(req, res, next) {
  const {
    treatment_type_id,
    problem_type_id,
    date,
    time,
    completed,
    cancel_type_id,
    user_id,
  } = req.body;
  const { client_id } = req.params;
  insertNewClientAppointment(
    treatment_type_id,
    problem_type_id,
    client_id,
    date,
    time,
    completed,
    cancel_type_id,
    user_id
  ).then((result) => {
    res.status(200).send(result);
  });
}

//Controller to delete a client appointment by appointment id
function removeClientAppointmentById(req, res, next) {
  const { appointment_id } = req.params;
  deleteClientAppointmentById(appointment_id).then((result) => {
    res.status(200).send(result);
  });
}

//Controller to edit a client appointment by appointment id
function editClientAppointmentById(req, res, next) {
  const {
    treatment_type_id,
    problem_type_id,
    date,
    time,
    completed,
    cancel_type_id,
    user_id,
  } = req.body;
  const { appointment_id } = req.params;
  updateClientAppointmentById(
    appointment_id,
    treatment_type_id,
    problem_type_id,
    date,
    time,
    completed,
    cancel_type_id,
    user_id
  ).then((result) => {
    res.status(200).send(result);
  });
}

module.exports = {
  getAllClientAppointments,
  getClientAppointmentsById,
  getClientAppointmentsByClientId,
  postNewClientAppointment,
  removeClientAppointmentById,
  editClientAppointmentById,
};
