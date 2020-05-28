import React, { useState ,useEffect} from 'react';
import {AiFillEdit, AiOutlineDelete} from "react-icons/ai";
import {MdDelete} from "react-icons/md"
import { Link, NavLink } from "react-router-dom";
import Token from '../tokenService';
import axios from "axios";



const Blog = props => {

//LocalStorage
  const jwt = localStorage.getItem('JWT');
  const token =Token(jwt)
    return (
 <React.Fragment>
   {console.log(props.blogs)}
  <div className="blog-entry ftco-animate d-md-flex"> 
  <a href="single.html" className="img img-2" style={{backgroundImage: `url("/image_3.jpg")`}} />
  <div className="text text-2 pl-md-4">
    <h3 className="mb-2"><a href="single.html">{props.blogs.title}</a></h3>
    <div className="meta-wrap">
      <p className="meta">
        <span><i className="icon-calendar mr-2" />June 28, 2019</span>
        {token ?
         <span><Link to={`/profile/${props.blogs.userId._id}`}>
         <i className="icon-folder-o mr-2" />{props.blogs.userId.firstname}</Link></span>:
         <span >
          <i className="icon-folder-o mr-2" />
          {props.blogs.userId.firstname}
        </span> 
         }  
       
        <span><i className="icon-comment2 mr-2" />5 Comment</span>
      </p>
    </div>
    <p className="mb-4 blogtext">{props.blogs.body}</p>

   <div>
   {props.blogs.tags.map(tag=>
  <div className="chip">
     <div className="chip-content">{tag}</div>
 </div>

   )} 
  </div>
   {window.location.href =="http://localhost:3001/profile/myprofile"&&
  <div className="Crud-operations">
  <Link to={`/blogform/${props.blogs._id}` } className="crud"> <AiFillEdit/></Link>
  <Link to="/homepage" className="crud" onClick={()=>props.onDelete(props.blogs)}><MdDelete/></Link>
  </div>
   }
  </div>
  </div>
</React.Fragment>
 
    )
}
export default Blog;

