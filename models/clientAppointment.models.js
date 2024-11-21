const db = require("../db/connection");

//Model to query db for all client appointments
function fetchAllClientAppointments() {
  return db.query(`SELECT *
FROM (
    SELECT ca.appointment_id, tt.description, pt.description, cd.first_name, cd.surname,
           ca.date, ca.time,  
           CASE 
                WHEN ca.completed = TRUE THEN 'Completed'
                WHEN ca.completed = FALSE THEN 'Not Completed'
                
           END AS status, 
           ct.description AS "cancel reason", u.username AS "Therapist Username"
    FROM client_appointments AS ca
    LEFT JOIN treatment_types as tt
    ON ca.treatment_type_id = tt.treatment_type_id
    LEFT JOIN problem_types as pt
    ON ca.problem_type_id = pt.problem_type_id
    LEFT JOIN client_details as cd
    ON ca.client_id=cd.client_id
    LEFT JOIN cancel_types as ct
    ON ca.cancel_type_id = ct.cancel_type_id
    LEFT JOIN users AS u ON ca.user_id = u.user_id
    ) AS subquery
ORDER BY date ASC,time ASC; `).then(({rows})=>{
    return rows;
});
}

//Model to query db for all client appointments by appointment id
function fetchClientAppointmentsById(appointment_id){

    let queryString = `SELECT *
FROM (
    SELECT ca.appointment_id, tt.description, pt.description, cd.first_name, cd.surname,
           ca.date, ca.time,  CASE 
        WHEN ca.completed = TRUE THEN 'Completed'
        WHEN ca.completed = FALSE THEN 'Not Completed'
        ELSE 'Unknown' -- Optional, handles NULL or unexpected values
    END AS status, ct.description AS "cancel reason",
           u.username AS "Therapist Username"
    FROM client_appointments AS ca
    LEFT JOIN treatment_types as tt
ON ca.treatment_type_id = tt.treatment_type_id
LEFT JOIN problem_types as pt
ON ca.problem_type_id = pt.problem_type_id
LEFT JOIN client_details as cd
ON ca.client_id=cd.client_id
LEFT JOIN cancel_types as ct
ON ca.cancel_type_id = ct.cancel_type_id
    LEFT JOIN users AS u ON ca.user_id = u.user_id
    WHERE ca.appointment_id=$1
) AS subquery
ORDER BY date ASC,time ASC; 
`
    return db.query(queryString,[appointment_id]).then(({rows})=>{
        return rows
    })
    

}

//Model to query db for all client appointments by client id
function fetchClientAppointmentsByClientId(client_id){

    let queryString = `SELECT *
FROM (
    SELECT ca.appointment_id, tt.description, pt.description, cd.first_name, cd.surname,
           ca.date, ca.time,  CASE 
        WHEN ca.completed = TRUE THEN 'Completed'
        WHEN ca.completed = FALSE THEN 'Not Completed'
        ELSE 'Unknown' -- Optional, handles NULL or unexpected values
    END AS status, ct.description AS "cancel reason",
           u.username AS "Therapist Username"
    FROM client_appointments AS ca
    LEFT JOIN treatment_types as tt
ON ca.treatment_type_id = tt.treatment_type_id
LEFT JOIN problem_types as pt
ON ca.problem_type_id = pt.problem_type_id
LEFT JOIN client_details as cd
ON ca.client_id=cd.client_id
LEFT JOIN cancel_types as ct
ON ca.cancel_type_id = ct.cancel_type_id
    LEFT JOIN users AS u ON ca.user_id = u.user_id
    WHERE ca.client_id=$1
) AS subquery
ORDER BY date ASC,time ASC; 
`
    return db.query(queryString,[client_id]).then(({rows})=>{
        return rows
    })
    

}

//Model to insert into db a new client appointments by client id
function insertNewClientAppointment(treatment_type_id,problem_type_id,client_id,date,time,completed,cancel_type_id,user_id){

    const insertNewAppointmentQuery = `INSERT into client_appointments (treatment_type_id,problem_type_id,client_id,date,time,completed,cancel_type_id,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`;
    return db.query(insertNewAppointmentQuery,[treatment_type_id,problem_type_id,client_id,date,time,completed,cancel_type_id,user_id]).then(({rows})=>{
        return rows[0]
    })
}

//Model to delete from the db a client appointment by appointment id
function deleteClientAppointmentById(appointment_id){
    const deleteAppointmentQuery = `DELETE FROM client_appointments WHERE appointment_id=$1 RETURNING *;`
    return db.query(deleteAppointmentQuery,[appointment_id]).then(({rows})=>{
        return rows
    })
}

//Model to edit int the db a client appointment by appointment id
function updateClientAppointmentById(appointment_id,treatment_type_id,problem_type_id,date,time,completed,cancel_type_id,user_id){
const updateAppointmentQuery = `UPDATE client_appointments SET treatment_type_id=$2,problem_type_id=$3,date=$4,time=$5,completed=$6,cancel_type_id=$7,user_id=$8 WHERE appointment_id=$1 RETURNING *;`;
return db.query(updateAppointmentQuery,[appointment_id,treatment_type_id,problem_type_id,date,time,completed,cancel_type_id,user_id]).then(({rows})=>{
    return rows
})
}

module.exports = { fetchAllClientAppointments,fetchClientAppointmentsById,fetchClientAppointmentsByClientId,insertNewClientAppointment,deleteClientAppointmentById,updateClientAppointmentById };
