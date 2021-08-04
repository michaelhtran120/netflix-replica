import React from "react";
import {Link} from 'react-router-dom'
import "../../css/landing.css";
import logo from "../../images/logo.svg";
import background from "../../images/landing-background.jpg";
import Footer from "../component/Footer";

const Landing = () => {
  return (
    <div>
      <div className='landing-hero'>
        <img className='landing-background' src={background} alt='background' />
        <div className='landing-header'>
          <img className='landing-logo' src={logo} alt='logo' />
          <Link to="/login" className='landing-sign-in-btn'>
            Sign In
          </Link>
        </div>
        <div className='landing-info'>
          <h1>Unlimited movies, TV shows and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <h3>
            Ready to watch?
          </h3>
        </div>
        <div className='landing-email-input'>
            <Link to='/signup'><button>Get Started</button></Link>
          </div>
      </div>
      <Footer classname='landing-footer' />
    </div>
  );
};

export default Landing;
