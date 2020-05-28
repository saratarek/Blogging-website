import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import './App.scss';
import _ from "lodash";
import Token from './tokenService';
import axios from "axios";
import HomePage from './component/homepage';
import Register from './component/Register';
import Login from './component/login';
import Profile from './component/profile';
import BlogForm from './component/blogform';


const App = props => {

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({})
  const [profileblogs,setprofileBlogs]=useState([])
  //Local Storage
  const jwt = localStorage.getItem('JWT');
  const token = Token(jwt);
  //Search  
  let [searcharray, setSearchArray] = useState([]);
  let [search, setSearch] = useState("")
  //Paging
  const [pageSize] = useState(4);
  const [activePage, setActivePage] = useState(1);

  //Fetching blogs
  useEffect(() => {
    async function fetchApi(blog) {
      const { data } = await axios.get("http://localhost:3000/blogs")
      setBlogs(data);
      console.log(data)
    }
    fetchApi();
  }, [
      user,
      profileblogs,
      searcharray
  ]
  )
  //Add blogs
  const handleAdd = blog => {
    window.scrollTo(0, 0);
    console.log("handleadd")
    blogs.push(blog)
    setBlogs(blogs)
  }
  //Edit blogs
  const handleEdit = blog => {
    window.scrollTo(0, 0);
    console.log("handleedit");
    const blogindex = blogs.findIndex(b => b.id == blog.id)
    blogs[blogindex] = blog
    setBlogs(blogs)
  }
  //Delete blogs
  const handleDelete = blog => {
    window.scrollTo(0, 0);
    const deletedblog = { ...blogs }
    const index = deletedblog.findIndex(b => b.id == blog.id)
    deletedblog.splice(index, 1)
    setBlogs(deletedblog);
    console.log("deleteditem", deletedblog)
  }


  const onDelete = async (blog) => {
    if (token) {
      console.log(blog._id);
      try {
        const { data } = await axios.delete(`http://localhost:3000/blogs/${blog._id}`);
        console.log("deleted data", data);
        handleDelete(data);

      }
      catch (err) {
        if (err.response && err.response.status >= 400) {
          alert("Not Authorized")
        }
      }
    }
  }

  //Handle search
  const handleSearch = e => {
    console.log(e);
    setSearch(e)
  }

  //Paging
  const handlePageChange = page => {
    window.scrollTo(0, 0);
    setActivePage(page);
  }




  
  searcharray = blogs.filter(b =>
     b.title.toLowerCase().includes(search) || b.tags.includes(search));








  let filteredProducts = searcharray
  const startIndex = (activePage - 1) * pageSize;
  const showedProducts = _(filteredProducts)
    .slice(startIndex)
    .take(pageSize)
    .value();

   
  return (
    <div className="App">
      <Switch>
        <Route
          path="/Register"
          component={Register} />

        <Route path="/login" component={Login} />
        <Route
          path="/homepage"
          exact render={props => (
            <HomePage
              {...props}
              blogs={blogs}
              onDelete={onDelete}
              handleSearch={handleSearch}
              onPageChange={handlePageChange}
              showedProducts={showedProducts}
              filteredProducts={filteredProducts}
              pageSize={pageSize}
              activePage={activePage}

            />
          )}
        />

        <Route path="/profile/:id" render={props => (
          <Profile
            {...props}
            blogs={blogs}
            user={user}
            onDelete={onDelete}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            activePage={activePage}
            handleSearch ={handleSearch}
            searcharray={searcharray}
            search={search}
            setprofileBlogs={setprofileBlogs}
            profileblogs={profileblogs}
            setUser={setUser}
          />
        )} />
        <Route path="/blogform/:id"
          render={props => (
            <BlogForm
              {...props}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onPageChange={handlePageChange}
              showedProducts={showedProducts}
              filteredProducts={filteredProducts}
              pageSize={pageSize}
              activePage={activePage}
            />
          )}
        />
        <Redirect from="/" to="/homepage" />
      </Switch>
    </div>

  )
}

export default App;
