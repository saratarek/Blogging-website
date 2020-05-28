import React, { useState, useEffect } from 'react';
import NavBar from './navBar';
import HomePage from './homepage'
import SideBar from './sideBar';
import Blog from './blog';
import Footer from './footer';
import Paging from './paging';
import axios from "axios";
import authorizationToken from '../tokenService';
import CreatePost from './createpost';
import Token from '../tokenService'
import _ from "lodash";

const Profile = props => {
  

    const {profileblogs,setprofileBlogs,user,setUser}=props
    let [follow, setFollow] = useState(false)
    const id = props.match.params.id;

    //LocalStorage
    const jwt = localStorage.getItem('JWT');
    const token = Token(jwt);

   //handle following
    const handleFollow = async () => {
        follow = !follow
        setFollow(follow)
        if(token){
        const { data } = await axios.patch("http://localhost:3000/user/" + id)
        console.log(data);
        }
    }

   //fetching profiles
      useEffect(() => {
    
         async function fetchingApi() {
            if (token) {
                 if (id !== "myprofile") {
                     console.log("userProfile")
                     {
                         //Call user from backend
                         const { data } = await axios.get(`http://localhost:3000/user/` + id)
                         setUser(data)
                     }
                         //Call the blogs of user from backend 
                         const { data } = await axios.get(`http://localhost:3000/blogs/userprofile/` + id)
                        setprofileBlogs(data)
                    
                }
                else {
                    //call currentUser from backend
                    {
                    const { data } = await axios.get("http://localhost:3000/user")
                    setUser(data)
                    console.log(data);
                    }
                    //call blogs of currentUser from backend
                    const { data } = await axios.get("http://localhost:3000/blogs/currentUser")
                    setprofileBlogs(data)

                 }
             }
         }
         fetchingApi()
     }, [])
 
     //Paging
     let searcharray = profileblogs.filter(b => b.title.toLowerCase().includes(props.search) || b.tags.includes(props.search));
     let filteredProducts = searcharray
     console.log(filteredProducts);
     const startIndex = (props.activePage - 1) * props.pageSize;
     const showedProducts = _(filteredProducts)
    .slice(startIndex)
    .take(props.pageSize)
    .value();

    return (
        <React.Fragment>
            <NavBar />
            <div className="home_slider_container">
                <div className="owl-carousel owl-theme home_slider">
                    <div className="home_slider_background" style={{ backgroundImage: 'url(/hero2.jpg)' }}>
                        <h1 className="Andrea-header"> Welcome to {user.firstname}'s Profile</h1>
                        {props.match.params.id !== "myprofile" ?
                            <button type="button" onClick={handleFollow} className="profilebtn btn btn-dark">{follow ? 'unFollow' : 'Follow'}</button>
                             : <CreatePost />} 
                    </div>
                </div>
            </div>
            <div className="home">
                <SideBar
                handleSearch={props.handleSearch}
                 />

                <div className="flexcontainer">
                    <div className="Blogss">
                        <h2 className="blogsparag">{user.firstname}'s Blogs</h2>
                        <p className="interestings">Here are all the blog that  was interested in </p>
                    </div>
                    {showedProducts.map(blog => (
                        <Blog
                            key={blog.id}
                            blogs={blog}
                            onDelete={props.onDelete}
                        />
                    ))}
                         {filteredProducts.length > props.pageSize && ( 
                           <Paging
                            pageSize={props.pageSize}
                            pageCount={filteredProducts.length / props.pageSize}
                            activePage={props.activePage}
                            onPageChange={props.onPageChange} 
                        />
                     )} 
                </div>

            </div>
            <Footer />
        </React.Fragment>)
}
export default Profile;