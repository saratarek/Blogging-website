const{validationResult}=require("express-validator")
const customError=require('../Helpers/CustomError')
module.exports=(...validationChecks)=>async(req,res,next)=>{
    
    const promises=validationChecks.map
    (validationCheck=>validationCheck.run(req));
    await Promise.all(promises);
    const {errors}=validationResult(req);
    if(!errors.length) {
        return next();
    }
   throw customError('ValidationError',422,errors);

}