import React, { useState } from 'react';
import {FaSearch} from 'react-icons/fa';
import Token from '../tokenService';

const SideBar =props=>{
    const jwt = localStorage.getItem('JWT');
    const token =Token(jwt)
    const [categories,setCategories]=useState([
        {id:0, name:"Fashion", number:6},
        {id:1, name:"Technology",number: 8},
        {id:2, name:"Travel",number:2},
        {id:4, name:"Food",number:2},
        {id:5, name:"Photography",number:7}
        ])
        const [tags,setTags]=useState([
          {id:0,name:"Animals"},
          {id:1,name:"Human"},
          {id:2,name:"People"},
          {id:3,name:"Cat"},
          {id:4,name:"Dog"},
          {id:5,name:"Nature"},
          {id:6,name:"Leaves"},
          {id:7,name:"Food"}
        ])
        const [archives,setArchive]=useState([
          {id:0, name:"Decob14 2018", number:10},
          {id:1, name:"September 2018", number:6},
          {id:2, name:"August 2018", number:8},
          {id:3, name:"July 2018", number:2},
          {id:4, name:"June 2018", number:7},
          {id:5, name:"May 2018", number:5}
        ])
    return (
        <div className="col-xl-3 ftco sidebar ftco-animate bg-light pt-5">
            <div className="sidebar-box pt-md-5">
            {token&&
                <form action="#" className="search-form">
                    <div className="form-group searchform">
                   <span className="search"> <FaSearch/></span>
                        <input type="text" className=" form-control" placeholder="Search" onChange={e=> props.handleSearch(e.target.value)} />
                   
                    </div>
                </form>
            }
            </div>
            <div className="sidebar-box ftco-animate">
                <h3 className="sidebar-heading">Categories</h3>
                <ul className="categories">
                {categories.map(category=>(
                     <li><a
                     href="#"
                     key={category.id}
                     className="cat"
                     >{category.name} <span>{category.number}</span>
                     </a>
                    </li>
                    
                ))} 
                     </ul> 
            </div>
            <div className="sidebar-box ftco-animate">
                <h3 className="sidebar-heading">Popular Articles</h3>
                <div className="block-21 mb-4 d-flex">
                    <a className="blog-img mr-4" style={{backgroundImage:'url(image_1.jpg)'}} />
                    <div className="text">
                        <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                        <div className="meta">
                            <div><a href="#"><span className="icon-calendar" /> June 28, 2019</a></div>
                            <div><a href="#"><span className="icon-person" /> Dave Lewis</a></div>
                            <div><a href="#"><span className="icon-chat" /> 19</a></div>
                        </div>
                    </div>
                </div>
                <div className="block-21 mb-4 d-flex">
                    <a className="blog-img mr-4" style={{ backgroundImage: 'url(image_2.jpg)' }} />
                    <div className="text">
                        <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                        <div className="meta">
                            <div><a href="#"><span className="icon-calendar" /> June 28, 2019</a></div>
                            <div><a href="#"><span className="icon-person" /> Dave Lewis</a></div>
                            <div><a href="#"><span className="icon-chat" /> 19</a></div>
                        </div>
                    </div>
                </div>
                <div className="block-21 mb-4 d-flex">
                    <div className="blog-img mr-4 " style={{ backgroundImage: 'url(bg_1.jpg)' }} ></div>
                    <div className="text">
                        <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control</a></h3>
                        <div className="meta">
                            <div><a href="#"><span className="icon-calendar" /> June 28, 2019</a></div>
                            <div><a href="#"><span className="icon-person" /> Dave Lewis</a></div>
                            <div><a href="#"><span className="icon-chat" /> 19</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar-box ftco-animate">
                <h3 className="sidebar-heading">Tag Cloud</h3>
                <ul className="tagcloud">
                {tags.map(tags=>(
                    <a key={tags.id} href="#" className="tag-cloud-link">{tags.name}</a>
                ))}
                </ul>
            </div>
            <div className="sidebar-box subs-wrap img py-4" style={{ backgroundImage: 'url(bg_1.jpg)' }}>
                <div className="overlay" />
                <h3 className="mb-4 sidebar-heading">Newsletter</h3>
                <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia</p>
                <form action="#" className="subscribe-form">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Email Address" />
                    </div>
                </form>
            </div>
            <div className="sidebar-box ftco-animate">
                <h3 className="sidebar-heading">Archives</h3>
                <ul className="categories">
                {archives.map(archive=>(
                     <li><a key={archive.id} 
                     className="arc" href="#">
                     {archive.name} <span>{archive.number}</span></a></li>
                ))}
                </ul>
            </div>
        </div>

    )
}

export default SideBar;
