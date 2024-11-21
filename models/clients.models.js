const db = require("../db/connection");

function fetchAllClients() {
  return db.query(`SELECT 
    c.client_id, c.client_username, cd.first_name,cd.surname,cd.dob,cd.identity_gender_id,cd.birth_gender_id,ig.gender_name AS "Identified Gender",
    bg.gender_name AS "Assigned Gender",e.ethnicity_name
FROM clients AS c
INNER JOIN client_details AS cd
ON c.client_id = cd.client_id
INNER JOIN genders AS ig
ON cd.identity_gender_id = ig.gender_id
INNER JOIN genders AS bg
ON cd.birth_gender_id = bg.gender_id
INNER JOIN ethnicities AS e
ON cd.ethnicity_id = e.ethnicity_id;`).then(({rows})=>{
    return rows
});
}

function fetchClientById(client_id){
    const getClientByIdQuery = `SELECT 
        c.client_id, c.client_username, cd.first_name,cd.surname,cd.dob,cd.identity_gender_id,cd.birth_gender_id,ig.gender_name AS "Identified Gender",
        bg.gender_name AS "Assigned Gender",e.ethnicity_name
    FROM clients AS c
    INNER JOIN client_details AS cd
    ON c.client_id = cd.client_id
    INNER JOIN genders AS ig
    ON cd.identity_gender_id = ig.gender_id
    INNER JOIN genders AS bg
    ON cd.birth_gender_id = bg.gender_id
    INNER JOIN ethnicities AS e
    ON cd.ethnicity_id = e.ethnicity_id
    WHERE c.client_id=$1;`
    return db.query(getClientByIdQuery,[client_id]).then(({rows})=>{
        return rows
    }).catch((err)=>{
        return err
    });
}

function insertNewClient(client_username,first_name,surname,dob,identity_gender_id,birth_gender_id,ethnicity_id){

    return db.query('SELECT gender_id FROM genders').then(({rows})=>{
        
        const genderIdMatch = rows.find(gender => gender.gender_id === Number(identity_gender_id) && gender.gender_id === Number(birth_gender_id))

        if(!genderIdMatch) {
            return Promise.reject({status:404,msg:'gender ID does not exist'})
        }

        return rows

    }).then(()=>{

        return db.query('SELECT ethnicity_id FROM ethnicities')

    }).then(({rows})=>{

        const ethnicityIdMatch = rows.find(ethnicity => ethnicity.ethnicity_id === Number(ethnicity_id))

        if(!ethnicityIdMatch) {
            return Promise.reject({status:404,msg:'ethnicity ID does not exist'})
        }

        return rows

    }).then(()=>{

        const insertClientQuery = 'INSERT INTO clients (client_username) VALUES ($1) RETURNING *;'

        return db.query(insertClientQuery,[client_username])

    }).then(({rows})=>{

        const clientId = rows[0].client_id

        const insertClientDetailsQuery = 'INSERT INTO client_details (client_id,first_name,surname,dob,identity_gender_id,birth_gender_id,ethnicity_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;'

        return db.query(insertClientDetailsQuery,[clientId,first_name,surname,dob,identity_gender_id,birth_gender_id,ethnicity_id])

    }).then(({rows})=>{

        return rows
    }).catch((err)=>{
        return err
    })

}

function updateClient(client_id,client_username,first_name,surname,dob,identity_gender_id,birth_gender_id,ethnicity_id){

    return db.query('SELECT client_id FROM clients').then(({rows})=>{
        
        const clientIdMatch = rows.find(client => client.client_id === Number(client_id))

        if(!clientIdMatch) {
            return Promise.reject({status:404,msg:'client ID does not exist'})
        }

        return rows

    }).then(()=>{

        return db.query('SELECT gender_id FROM genders')

    }).then(({rows})=>{

        const genderIdMatch = rows.find(gender => gender.gender_id === Number(identity_gender_id) && gender.gender_id === Number(birth_gender_id))

        if(!genderIdMatch) {
            return Promise.reject({status:404,msg:'gender ID does not exist'})
        }

        return rows

    }).then(()=>{

        return db.query('SELECT ethnicity_id FROM ethnicities')

    }).then(({rows})=>{

        const ethnicityIdMatch = rows.find(ethnicity => ethnicity.ethnicity_id === Number(ethnicity_id))

        if(!ethnicityIdMatch) {
            return Promise.reject({status:404,msg:'ethnicity ID does not exist'})
        }

        return rows

    }).then(()=>{

        const updateClientQuery = 'UPDATE clients SET client_username =$2 WHERE client_id=$1 RETURNING *;'

        return db.query(updateClientQuery,[client_id,client_username])

    }).then(()=>{

        const updateClientDetailsQuery = 'UPDATE client_details SET first_name=$2,surname=$3,dob=$4,identity_gender_id=$5,birth_gender_id=$6,ethnicity_id=$7 WHERE client_id =$1 RETURNING *;'

        return db.query(updateClientDetailsQuery,[client_id,first_name,surname,dob,identity_gender_id,birth_gender_id,ethnicity_id])

    }).then(({rows})=>{
        return rows
    }).catch((err)=>{
        return err
    })


}

module.exports = {fetchAllClients,fetchClientById,insertNewClient,updateClient}