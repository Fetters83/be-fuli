const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.json());

const apiRouter = require('./routes/apiRoutes');


// Call apiRouters - the gateway to all the apps api Routers
app.use('/api',apiRouter) 


//Error Handling

app.use((err,req,res,next)=>{
    if(err.status && err.msg){
         res.status(err.status).send({msg:err.msg})
        }
        next(err)
    })
    
module.exports = app;

