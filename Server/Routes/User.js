 const express=require('express');
 const router=express.Router()
 const {check,validationResult}=require('express-validator');
 const validationMiddleware=require('../Middlewares/Validation');
 const authenticationMiddleware=require('../Middlewares/Authentication');
 const authorizationMiddleware=require('../Middlewares/Authorization');
 const customError=require('../Helpers/CustomError');

const User=require('../Models/User');

let validation=[check('password').isLength({min:8}).withMessage("Password must be at least 8 characters"),
check('email').isEmail().withMessage("Incorrect Email")];


router.get('/:id',async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
    const users= await User.findById(id)
    res.json(users)
})

router.get('/',authenticationMiddleware,async(req,res,next)=>{
    const currentUser=req.user
    const user=await User.findById(currentUser._id)
    console.log(user);
    res.json(user);
})


router.patch('/:id',authenticationMiddleware,async(req,res,next)=>{
 const currentUser=req.user
 console.log("current",currentUser.friendsId)
 const {id}=req.params  
  if(currentUser._id.toString()!==id && !currentUser.friendsId.some(userId=>userId.toString()==id)){
      currentUser.friendsId.push(id)
      currentUser.save()
      res.json(currentUser)
  }
  else{
      currentUser.friendsId.pop(id)
      currentUser.save()
      res.json(currentUser);
  }
})

router.post('/register',validationMiddleware(validation[0],validation[1]),async (req,res,next)=>{
    try{
    const{firstname,lastname,email,password}=req.body
    const user=new User({
        firstname,
        lastname,
        email,
        password
    })
    await user.compareEmail(email)
    await user.save();
    console.log(user);
    res.json(user);
}
catch(err){
    console.log(err)
}
})

router.delete('/:id',authenticationMiddleware,async(req,res,next)=>{
    
    const {id}=req.params
    const user= await User.findByIdAndDelete(id);
    res.json(user)
    
})
router.patch('/:id',authenticationMiddleware,async(req,res,next)=>{
 
     const {id}=req.params
     const{firstname,lastname,email,password}=req.body
     const user= await User.findByIdAndUpdate(id,{
         firstname,
         lastname,
         email,
         password
     },{
         omitUndefined:true,runValidators:true}
     );
     res.json(user)
     })
 


router.post('/login',async (req,res,next)=>{
   
    const {email,password}=req.body;
    const user= await User.findOne({email})
    if(!user){
       throw customError(404,'Invalid email or password')
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        throw customError(401,'Invalid email or password')
       }
       const token= await user.generateToken();
       res.json({user,token}) 
     

})


module.exports=router;