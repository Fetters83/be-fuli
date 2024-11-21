const db = require('../db/connection')
const supabase = require("../supabase_client");

function insertNewUser(email,password,first_name,surname,job_title,user_role_id){
    console.log(user_role_id)

    return db.query(`SELECT username FROM users`).then(({rows})=>{

        const userNameMatch = rows.find(user=>user.username===email)

        if(userNameMatch){
            return Promise.reject({status:404,msg:"Username in use"})
        }

        return rows
    }).then(()=>{
        return db.query(`SELECT role_id FROM app_roles;`)
    }).then(({rows})=>{
           const userRoleIdMatch = rows.find(role=>role.role_id===Number(user_role_id))

        if(!userRoleIdMatch){
            return Promise.reject({status:404,msg:'User role ID does not exist'})
        }

        return rows
    }).then(()=>{

        return supabase.auth.signUp(
            {
                email:email,
                password:password
            }
        )
        
    }).then(({data})=>{
        const createdEmail = data.user.email
       

        const insertNewUserQuery = `INSERT INTO users (username) VALUES($1) RETURNING *;`
        return db.query(insertNewUserQuery,[createdEmail])
    
    }).then(({rows})=>{
        const createdUserId = rows[0].user_id;
        const insertNewUserDetailsQuery = `INSERT INTO user_details (user_id,first_name,surname,job_title,user_role_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;`
        return db.query(insertNewUserDetailsQuery,[createdUserId,first_name,surname,job_title,user_role_id])

    }).then(({rows})=>{

        return rows

    }).catch((err)=>{
        return Promise.reject(err)
    })


}

function authenticateUser(email,password){

    const userNameQuery = `SELECT username FROM users WHERE username=$1;`;
    
    return db.query(userNameQuery,[email]).then(({rows})=>{

        if(rows.length === 0){
            return Promise.reject({status:400,msg:"user name does not exist."})
        }

        return rows
    }).then(()=>{
        return supabase.auth.signInWithPassword({
            email:email,
            password:password
        })
    }).then(({data})=>{
       
        if(!data.user || !data.session){
    
            return Promise.reject({status:404,msg:"Incorrect username or password"})
        }

        const {user,session}= data;
        const result = {user:user,session:session}

       

      
        return result
    }).catch((err)=>{
        return Promise.reject(err);
    })
}

function signOutUser(){

    return supabase.auth.signOut().then(({error})=>{

        if(error){
            return Promise.reject({status:404,msg:error.error.message})
        }

        return {msg:"Logout Successful!"}
    }).catch((err)=>{

        return Promise.reject(err)
    })

}

module.exports = {insertNewUser,authenticateUser,signOutUser}