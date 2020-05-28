import React from 'react';
import { Link} from "react-router-dom";
import Token from '../tokenService';


const NavBar=()=>{
    const jwt = localStorage.getItem('JWT');
    const token =Token(jwt) ;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-1">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/homepage">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        {token&&
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile/myprofile">Profile</Link>
                        </li>
                        }
                        <li className="nav-item">
                            <a className="nav-link " >About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#" >Contact</a>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link " to="/Register" >Register</Link>
                        </li>
                        {token?
                        <li className="nav-item">
                            <Link className="nav-link "to="/login" >Logout</Link>
                        </li>:
                        <li className="nav-item">
                        <Link className="nav-link "to="/login" >Login</Link>
                        </li>
                        }
                    </ul>
                
                </div>
            </nav>

        );
    }

export default NavBar;