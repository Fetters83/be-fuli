const { insertNewUser, authenticateUser, signOutUser } = require("../models/users.models");


function createNewUser(req,res,next){
    const{email,password,first_name,surname,job_title,user_role_id} = req.body;
   
    
    insertNewUser(email,password,first_name,surname,job_title,user_role_id).then((result)=>{
        res.status(200).send(result)
    }).catch((err)=>{
        next(err)
    })


}

function signIn(req,res,next){
    const {email,password} = req.body
    
    authenticateUser(email,password).then((result)=>{
        res.status(200).send({msg:'Login Successful',user:result.user,token:result.session.access_token})
    }).catch((err)=>{

        next(err)
    })


}

function signOut(req,res,next){
    signOutUser().then((result)=>{
        res.clearCookie('supabase_token');
        res.status(200).send(result)
    })
}

module.exports = {createNewUser,signIn,signOut}