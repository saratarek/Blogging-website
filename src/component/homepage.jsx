import React, { useState, useEffect } from 'react';
import Token from '../tokenService';
import _ from "lodash";
import NavBar from './navBar';
import SideBar from './sideBar';
import Blog from './blog';
import Header from './header';
import Footer from './footer';
import axios from "axios";
import Paging from "./paging";

const HomePage = props => {

    return (
        <React.Fragment>
            <NavBar />
            <Header />
            <div className="home">
                <SideBar
                    handleSearch={props.handleSearch}
                />
                <div className="flexcontainer">
                    {props.showedProducts.map(blog => (
                        <Blog
                            key={blog.id}
                            blogs={blog}
                            onDelete={props.onDelete}

                        />
                    ))}
                      {props.filteredProducts.length > props.pageSize && (
                        <Paging
                            pageSize={props.pageSize}
                            pageCount={props.filteredProducts.length / props.pageSize}
                            activePage={props.activePage}
                            onPageChange={props.onPageChange}
                        />
                    )}
                </div>

            </div>




            <Footer/>




        </React.Fragment>

    )
}

export default HomePage;