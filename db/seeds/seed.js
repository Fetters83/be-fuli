const format = require("pg-format");
const db = require("../connection");
const {
  appRolesData,
  cancelTypesData,
  clientAppointmentsData,
  clientDetailsData,
  clientsData,
  ethnicitiesData,
  gendersData,
  problemTypesData,
  treatmentTypesData,
  userAppointmentsData,
  userDetailsData,
  usersData
} = require("../data/development-data");


const seed = ( {
  appRolesData,
  cancelTypesData,
  clientAppointmentsData,
  clientDetailsData,
  clientsData,
  ethnicitiesData,
  gendersData,
  problemTypesData,
  treatmentTypesData,
  userAppointmentsData,
  userDetailsData,
  usersData
  

}) =>{
    return db
    .query('DROP TABLE IF EXISTS user_appointments;')
    .then(()=>{
        return db.query('DROP TABLE IF EXISTS client_appointments;')
    }).then(()=>{
        return db.query('DROP TABLE IF EXISTS user_details;')
    }).then(()=>{
        return db.query('DROP TABLE IF EXISTS client_details;')
    }).then(()=>{
        return db.query('DROP TABLE IF EXISTS app_roles;')
    })
    .then(()=>{
        return db.query('DROP TABLE IF EXISTS clients;')
    })
    .then(()=>{
        return db.query('DROP TABLE IF EXISTS genders;')
    })
    .then(()=>{
        return db.query('DROP TABLE IF EXISTS ethnicities;')
    })
    .then(()=>{
        return db.query('DROP TABLE IF EXISTS cancel_types;')
    })
    .then(()=>{
        return db.query('DROP TABLE IF EXISTS treatment_types;')
    })
    .then(()=>{
        return db.query('DROP TABLE IF EXISTS problem_types;')
    })
    .then(()=>{
        return db.query('DROP TABLE IF EXISTS users;')
    }) .then(()=>{
        const userTablePromise = db.query(`
              CREATE TABLE users (
              user_id SERIAL PRIMARY KEY,
              username VARCHAR NOT NULL
            );`);
        const problemTypesTablePromise = db.query(`
               CREATE TABLE problem_types (
               problem_type_id SERIAL PRIMARY KEY,
               description VARCHAR NOT NULL
                );`);    
        const treatmentTypesTablePromise = db.query(`
                CREATE TABLE treatment_types (
                treatment_type_id SERIAL PRIMARY KEY,
                description VARCHAR NOT NULL
                 );`);
        const cancelTypesTablePromise = db.query(`
                 CREATE TABLE cancel_types (
                 cancel_type_id SERIAL PRIMARY KEY,
                 description VARCHAR NOT NULL,
                 status BOOLEAN NOT NULL
                 );`);
        const ethnicitiesTablePromise = db.query(`
                 CREATE TABLE ethnicities (
                 ethnicity_id SERIAL PRIMARY KEY,
                 ethnicity_name VARCHAR NOT NULL
                 );`);
        const gendersTablePromise = db.query(`
                 CREATE TABLE genders (
                 gender_id SERIAL PRIMARY KEY,
                 gender_name VARCHAR NOT NULL
                 );`);
        const appRolesTablePromise = db.query(`
                 CREATE TABLE app_roles (
                 role_id SERIAL PRIMARY KEY,
                 role_name VARCHAR NOT NULL,
                 status BOOLEAN NOT NULL
                 );`);
        const clientsTablePromise = db.query(`
                 CREATE TABLE clients (
                 client_id SERIAL PRIMARY KEY,
                 client_username VARCHAR NOT NULL
                    );`);
        return Promise.all([userTablePromise,problemTypesTablePromise,treatmentTypesTablePromise,cancelTypesTablePromise,ethnicitiesTablePromise,gendersTablePromise,appRolesTablePromise,clientsTablePromise])       
                                          
    })
    .then(()=>{
        return db.query(`
            CREATE TABLE user_details (
            user_id INT REFERENCES users(user_id) NOT NULL,
            first_name VARCHAR NOT NULL,
            surname VARCHAR NOT NULL,
            job_title VARCHAR NOT NULL,
            user_role_id INT REFERENCES app_roles(role_id));`)

    }).then(()=>{
        return db.query(`
            CREATE TABLE client_details (
            client_id INT REFERENCES clients(client_id) NOT NULL,
            first_name VARCHAR NOT NULL,
            surname VARCHAR NOT NULL,
            dob DATE NOT NULL,
            identity_gender_id INT REFERENCES genders(gender_id) NOT NULL,
            birth_gender_id INT REFERENCES genders(gender_id) NOT NULL,
            ethnicity_id INT REFERENCES ethnicities(ethnicity_id) NOT NULL
            );`)
    })
    .then(()=>{
        return db.query(`
            CREATE TABLE client_appointments (
            appointment_id SERIAL PRIMARY KEY,
            treatment_type_id INT REFERENCES treatment_types(treatment_type_id) NOT NULL,
            problem_type_id INT REFERENCES problem_types(problem_type_id) NOT NULL,
            client_id INT REFERENCES clients(client_id) NOT NULL,
            date DATE NOT NULL,
            time VARCHAR NOT NULL,
            completed BOOLEAN,
            cancel_type_id INT REFERENCES cancel_types(cancel_type_id) NOT NULL,
            user_id INT REFERENCES users(user_id) NOT NULL);           
            `)
    }).then(()=>{
        const insertUsersQueryStr = format(
            `INSERT INTO users (username) VALUES %L;`,
            usersData.map(({username})=>[username])
        );
        const usersPromise = db.query(insertUsersQueryStr)

        const insertProblemTypeQueryStr = format(
            'INSERT INTO problem_types (description) VALUES %L;',
            problemTypesData.map(({description})=>[description])
        )
        const problemTypesPromise = db.query(insertProblemTypeQueryStr)

        const insertTreatmentTypeQueryStr = format(
            'INSERT INTO treatment_types (description) VALUES %L;',
            treatmentTypesData.map(({description})=>[description])
        )
        const treatmentTypesPromise = db.query(insertTreatmentTypeQueryStr)

        const cancelTypesQueryStr = format(
            'INSERT INTO cancel_types (description,status) VALUES %L;',
            cancelTypesData.map(({description,status})=>[description,status])
        )
        const cancelTypesPromise = db.query(cancelTypesQueryStr)

        const ethnicityQueryStr = format(
            'INSERT INTO ethnicities (ethnicity_name) VALUES %L;',
            ethnicitiesData.map(({ethnicity_name})=>[ethnicity_name])
        )
        const ethnicityPromise = db.query(ethnicityQueryStr)

        const gendersQueryStr = format(
            'INSERT INTO genders (gender_name) VALUES %L;',
            gendersData.map(({gender_name})=>[gender_name])
        )
        const gendersPromise = db.query(gendersQueryStr)

        const appRoleQueryStr = format(
            'INSERT INTO app_roles (role_name,status) VALUES %L;',
            appRolesData.map(({role_name,status})=>[role_name,status])
        )
        const appRolePromise = db.query(appRoleQueryStr)

        const clientsQueryStr = format(
            'INSERT INTO clients (client_username) VALUES %L;',
            clientsData.map(({client_username})=>[client_username])
        )
     
        const clientsPromise = db.query(clientsQueryStr)

        return Promise.all([usersPromise,problemTypesPromise,treatmentTypesPromise,cancelTypesPromise,ethnicityPromise,gendersPromise,appRolePromise,clientsPromise]);

    }) .then(()=>{

        const insertUserDetailsQueryStr = format(
            'INSERT INTO user_details (user_id, first_name, surname, job_title, user_role_id) VALUES %L;',
            userDetailsData.map(
              ({
                user_id,
                first_name,
                surname,
                job_title,
                user_role_id
              }) => [user_id,first_name,surname,job_title,user_role_id]
            )
          );
    
          return db.query(insertUserDetailsQueryStr);
        
    })   .then(()=>{

        const insertClientDetailsQueryStr = format(
           'INSERT INTO client_details (client_id,first_name,surname,dob,identity_gender_id,birth_gender_id,ethnicity_id) VALUES %L;',
            clientDetailsData.map(
                ({
                    client_id,
                    first_name,
                    surname,
                    dob,
                    identity_gender_id,
                    birth_gender_id,
                    ethnicity_id
                })=>[client_id,first_name,surname,dob,identity_gender_id,birth_gender_id,ethnicity_id]
            )
        );
        return db.query(insertClientDetailsQueryStr);
    })  
    .then(()=>{

        const insertClientAppointmentsQueryStr = format(
            'INSERT INTO client_appointments (treatment_type_id,problem_type_id,client_id,date,time,completed,cancel_type_id,user_id) VALUES %L;',
            clientAppointmentsData.map(
                ({
                    treatment_type_id,
                    problem_type_id,
                    client_id,
                    date,
                    time,
                    completed,
                    cancel_type_id,
                    user_id
                })=>[treatment_type_id,problem_type_id,client_id,date,time,completed,cancel_type_id,user_id]
            )
        );
        return db.query(insertClientAppointmentsQueryStr);
    }) 

};

module.exports = seed;
