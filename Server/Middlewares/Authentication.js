const User=require('../Models/User');
const customError=require('../Helpers/CustomError');
module.exports=async (req,res,next)=>{
    const token=req.headers.authorization;
    if(!token) throw customError ('No Authorization provided',401);
    const currentUser=await User.getUserFromToken(token);
    req.user=currentUser;
    next();
   
}