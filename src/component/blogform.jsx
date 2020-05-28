import React, { useState, useEffect } from 'react';
import { GrFormClose } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";
import Joi from "joi-browser";
import Token from '../tokenService';
import HomePage from './homepage';
import Profile from './profile';
import axios from "axios";

const BlogForm = props => {
  const [newblog, setNewBLog] = useState(
    { userId: '', title: '', body: '', tags: [] }
  )
  
  //LocalStorage
  const jwt = localStorage.getItem('JWT');
  const token =Token(jwt) ;

  //Params
  const id = props.match.params.id;
  
  //Call blogs from backend for edit
  async function fetchAPI() {
    if (id !== "add") {
      console.log(id)
      const { data } = await axios.get(
        "http://localhost:3000/blogs/" + id);
      setNewBLog(data)
      console.log(data);
    }
  }
  //Edit blogs
  async function editAPI() {
    const blog = { ...newblog }
    const { data } = await axios.patch(
      `http://localhost:3000/blogs/${props.match.params.id}`,
      blog
    );
    console.log("edited data", data);
    props.onEdit(data);
  }

  useEffect(() => {
    if(token){
    fetchAPI();
    editAPI();
    }
  }, [])

  const handleChange = ({ target }) => {
    const addedblog = { ...newblog }
    addedblog[target.id] = target.value
    setNewBLog(addedblog)
  }

  //Tags
  const handleTags = e => {
    const clonedblog={...newblog}
    if (e.which == 13) {
      console.log(e.key)
      newblog.tags.push(e.target.value)
      e.target.value = "";
      setNewBLog(clonedblog)      
      e.preventDefault();
    }
  }

  //Submit
  const handleSubmit = async e => {
    e.preventDefault()
    const blog = { ...newblog }
    if (props.match.params.id === "add") {
      console.log("add")
      console.log(blog);
      if(token){
      const { data } = await axios.post(`http://localhost:3000/blogs`, blog
      )
      setNewBLog(newblog)
      console.log(data)
      props.onAdd(data);
    }
    }
    else {
      console.log("edit")
      console.log(props.match.params.id)
      console.log(blog);
      editAPI();
    }
    props.history.replace("/homepage");
  }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
      
        <div id="myModal"  className="modal">
          <div id="modalcontent" className="modal-content">
            <div className="modal-header ">
              <h4 className="font-weight-normal">Create a Blog</h4>
              <Link to={props.match.params.id=="add"?"/homepage":"/profile"}className="close" >×</Link>

            </div>

            <div className="modal-body">
              <div className="form-group">

                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Enter your title" className="form-control"
                 value={newblog.title}
                  onChange={handleChange} />
              </div>

              <div className="form-group">

                <label htmlFor="body">Body</label>
                <textarea type="text" id="body" placeholder="Enter your body" className="form-control"
                 value={newblog.body}
                  onChange={handleChange} />
              </div>
              <div className="taged-textbox form-group">
                <label className="taged-textbox__lable" htmlFor="tags">Tags</label>
                <div className="taged-textbox__data">
                
                  <div className="taged-textbox__tags">
                 
                    {newblog.tags.map((tag) => (
                      <div className="taged-textbox__tag">
                        <span >
                          {tag}
                        </span>
                        <a className="taged-textbox__remove" >
                          <GrFormClose /></a>
                      </div>
                    ))}
                  
                  </div>
                  
                  <div className="taged-textbox__clear">
                    <a ><i className="fas fa-times" /></a>
                  </div>
                </div>
                <textarea onKeyPress={e => handleTags(e)} className="taged-textbox__textbox form-control" type="text" name="tags" id="tags"
                  placeholder="Enter a tag" />
              </div>

              <button type="submit" className="postbtn btn " >{props.match.params.id === "add" ? "Add" : "Save"}</button>
            </div>

          </div>

        </div>
        
            
            
      </form>
   
       <HomePage
       onPageChange={props.onPageChange}
       showedProducts={props.showedProducts}
       filteredProducts={props.filteredProducts}
       pageSize={props.pageSize}
       activePage={props.activePage}
        />
   
    </React.Fragment>
    )
  }

export default BlogForm;