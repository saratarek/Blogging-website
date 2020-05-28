import React from 'react';
import { Link} from "react-router-dom";
import Token from '../tokenService';


const CreatePost=props=>{
      //LocalStorage
  const jwt = localStorage.getItem('JWT');
  const token =Token(jwt) ;
    return(
        <React.Fragment>
            {token&&
                 <div className="createpost">
                 <Link to="/blogform/add"><h4 className="createlink">Create Blog</h4></Link>
              </div> 
            }
   
     </React.Fragment>
    )
}
export default CreatePost;