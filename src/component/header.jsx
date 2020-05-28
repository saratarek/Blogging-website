import React, { useState } from 'react';
import CreatePost from './createpost';

const Header = props=> {
    
    return (
        <div className="home_slider_container">
            <div className="owl-carousel owl-theme home_slider">
                <div className="home_slider_background" style={{ backgroundImage: 'url(/berlin-header.jpg)' }}>
                 <h1 className="Andrea-header"> Andrea Moore</h1>
                 {/* <button type="button" className="profilebtn btn btn-dark">Read More</button> */}
              
                 <CreatePost/>
    
            </div>
            </div>
        </div>

    )
}
export default Header;