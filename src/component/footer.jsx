import React  from 'react';
import {FaTwitter} from 'react-icons/fa';
import {AiFillFacebook} from 'react-icons/ai';
import {AiFillInstagram} from 'react-icons/ai';

const Footer=props=>{
    return(
<footer className="ftco-footer ftco-bg-dark ftco-section">
  <div className="containerfooter">
    <div className="row mb-5">
      <div className="col-md">
        <div className="ftco-footer-widget mb-4">
          <h2 className="ftco-heading-2">Snipp.</h2>
          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        </div>
      </div>
      <div className="col-md">
        <div className="ftco-footer-widget mb-4 ml-5">
          <h2 className="ftco-heading-2">Quick Links</h2>
          <ul className="list-unstyled">
            <li><a href="/homepage" className="py-2 d-block">Home</a></li>
            <li><a href="" className="py-2 d-block">Case studies</a></li>
            <li><a href="" className="py-2 d-block">Services</a></li>
            <li><a href="" className="py-2 d-block">Portfolio</a></li>
            <li><a href="" className="py-2 d-block">About</a></li>
            <li><a href="" className="py-2 d-block">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="col-md">
        <div className="ftco-footer-widget mb-4">
          <h2 className="ftco-heading-2">Contact Information</h2>
          <ul className="list-unstyled">
            <li><a href="#" className="py-2 d-block">198 West 21th Street, Suite 721 New York NY 10016</a></li>
            <li><a href="#" className="py-2 d-block">+ 1235 2355 98</a></li>
            <li><a href="#" className="py-2 d-block">info@yoursite.com</a></li>
            <li><a href="#" className="py-2 d-block">email@email.com</a></li>
          </ul>
        </div>
      </div>
      <div className="col-md">
        <div className="ftco-footer-widget mb-4">
          <ul className="ftco-footer-social list-unstyled float-md-left float-lft">
            <li className="ftco-animate"><a href="#" className="footer-icon"><span className="icon-twitter" ><FaTwitter/></span></a></li>
            <li className="ftco-animate"><a href="#"><span className="icon-facebook" ><AiFillFacebook/></span></a></li>
            <li className="ftco-animate"><a href="#"><span className="icon-instagram" ><AiFillInstagram/></span></a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 text-center">
        <p>
          Copyright © All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
       </p>
      </div>
    </div>
  </div>
</footer>

    
  

    )
}
export default Footer;