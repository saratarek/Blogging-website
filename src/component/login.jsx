import React, { useState } from 'react';
import Joi from "joi-browser";
import axios from "axios";
import authorizationToken from '../tokenService';
const Login = props => {


    const [account, setAccount] = useState(
        { email: '', password: '' })
    const [errors, setError] = useState({});

    const schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password")
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
        const newaccount = { ...account }
        newaccount[target.id] = target.value
        setAccount(newaccount)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const user = { ...account }
        const errors = validate()
        if (errors) {
            console.log(errors);
            setError(errors)
            return
        }
       try{
           const {data}= await axios.post('http://localhost:3000/user/login',user
           )
           console.log(data)

           localStorage.setItem('JWT',data.token)
           if (data.token){
            axios.defaults.headers.common["Authorization"]=data.token;
           }  
          
           props.history.replace("/homepage");

       }
      catch(err){
         if(err.response && err.response.status>=400){
           alert("Invalid Email or Password")
         }
      }

    }


    return (
        <div className="LogIn">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <p className="Register-header">Login</p>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="text" className="form-control" id="email" aria-describedby="emailHelp" placeholder="E-mail"
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
                        <input type="password" className="form-control" id="password" placeholder="Password"
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
export default Login;