const express=require('express');
const router=express.Router()
const {check,validationResult}=require('express-validator');
const validationMiddleware=require('../Middlewares/Validation');
const authenticationMiddleware=require('../Middlewares/Authentication');
const User=require('../Models/User');
const _ = require("lodash");



const Blog=require('../Models/Blogs');



router.get('/userprofile/:id',async(req,res,next)=>{
    const {id}=req.params
    const blog= await Blog.find({userId:id});
    res.json(blog)
})

router.get('/currentUser',authenticationMiddleware,async(req,res,next)=>{
  const currentUser=req.user
  const blogs= await Blog.find({userId:currentUser})
  res.json(blogs);
})

router.get('/:id',async(req,res,next)=>{
    const{id}=req.params;
    const blog= await Blog.findById(id)
    console.log(blog)
    res.json(blog)
})


router.get('/',async (req,res,next)=>{
    const blogs=await Blog.find({}).populate({
        path:'userId',
        select:'_id firstname lastname email '
    });
    res.json(blogs)
})

router.post('/',authenticationMiddleware,async (req,res,next)=>{
     req.body.userId=req.user._id
     console.log(req.body.userId)
     const blog= new Blog(req.body);
     await blog.save();
     res.send(blog);
})
// router.get('/:id',async(req,res,next)=>{
// const blog=await Blog.find(req.params)
// res.json(blog)
// })

router.patch('/:id',authenticationMiddleware,async(req,res,next)=>{
    const {id}=req.params;
    const editedBlog= await Blog.findByIdAndUpdate(id, req.body,{
      new:true, omitUndefined:true,runValidators:true
    })
    res.json(editedBlog)
})



router.delete('/:id',authenticationMiddleware,async(req,res,next)=>{
    const{id}=req.params;
    const blog= await Blog.findByIdAndDelete(id);
    res.send(blog);

})
router.get('/page/:id',async(req,res,next)=>{
    const pageNo=parseInt(req.query.pageNo);
    const size=parseInt(req.query.size);
    console.log("pageno",pageNo);
    console.log("pagesize",size);
    // const {id}=req.params;
    // const blogs=Blog.find({userId:id}).sort({updatedAt:-1}).skip(size*(pageNo-1)).limit(size);
    // const total=Blog.find({userId:id}).count();
    // res.json({
    //     blogs:blogs,
    //     total:total
    // })
})


module.exports=router;