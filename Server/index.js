const express= require('express')
require('./db');
require('express-async-errors');
require('dotenv').config();
const cors= require('cors');
const port=process.env.Port||3000;
const app=express();
app.use(express.json());

const userRoutes=require("./Routes/User")
const blogsRoutes=require("./Routes/Blogs")

app.use(function (req, res, next) {
    console.log('RequestUrl',req.url);
    console.log('Method',req.method);
    console.log('Time', Date.now())
    next()
  })
app.use(cors())
app.use('/user',userRoutes)
app.use('/blogs',blogsRoutes)
app.use((err,req,res,next)=>{
    console.log(err);
   const statusCode=err.statusCode ||500;
   if(statusCode>=500){
       return res.status(statusCode).json({
           messege:'Internal Server Error '
       })
   }
   res.status(statusCode).json({messege:err.messege})
    });

app.listen(port,()=>{
    console.log(`server running on port:${port}`)
})
