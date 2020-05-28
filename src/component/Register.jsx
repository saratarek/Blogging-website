import React, { useState } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import axios from "axios";

const Register=props=>{
    const[account,setAccount]=useState(
        {firstname:'',lastname:'',email:'',password:''})
    const [errors,setError]=useState({});

      const schema = {
            firstname: Joi.string()
              .required()
              .label("Firstname"),
            lastname: Joi.string()
              .required()
              .label("Lastname"),
            email:Joi.string().email().required().label("Email"),
            password:Joi.string().min(8).required().label("Password")
               
          }
        
         const validate = () => {
            const result = Joi.validate(account, schema, {
            });
            //No Errors
            if (result.error === null) {
              return null;
            
            }
            //Errors
            const errors = {};
            for (const error of result.error.details) {
              errors[error.path] = error.message;
            }
            return errors;
          }

    const handleChange = ({ target }) => {
        const newaccount = {...account}
        newaccount[target.id] = target.value
        setAccount( newaccount )
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const user = { ...account }
        const errors= validate()
       if(errors) {
          console.log(errors);
          setError(errors)
           return
        }
        const { data } = await axios.post(
            `http://localhost:3000/user/register`, user,
        )
        console.log(data);
         
         props.history.replace("/login")
   
    }
        return (
         
            <div className="Registeration">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <p className="Register-header">Registeration</p>
                        <div className="form-group">
                            <label htmlFor="firstname">FirstName</label>
                            <input type="text" className="form-control"  id="firstname" placeholder="FirstName"
                                value={account.firstname}
                                onChange={handleChange} />
                                  {errors.firstname&& (
                               <div className="alert alert-danger">
                              {errors.firstname}
                              </div>)
                                  }        
                        </div>
                        <div className="form-group">    
                            <label htmlFor="lastname">LastName</label>
                            <input type="text" className="form-control"  id="lastname" placeholder="LastName"
                                value={account.lastname}
                                onChange={handleChange} />
                               
                      
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="text" className="form-control"  id="email" aria-describedby="emailHelp" placeholder="E-mail"
                                value={account.email}
                                onChange={handleChange} />
                                 {errors.email && (
                                 <div className="alert alert-danger">
                                 {errors.email}
                                 </div>)
                                 }
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control"  id="password" placeholder="Password"
                                value={account.password}
                                onChange={handleChange} />
                                 {errors.password && (
                               <div className="alert alert-danger">
                              {errors.password}
                              </div>)
                                 }
                        </div>
                      
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>

            </div>
        )
    }


export default Register;
