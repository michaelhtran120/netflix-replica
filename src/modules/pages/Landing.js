import React from "react";
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
          <a className='landing-sign-in-btn'>Sign In</a>
        </div>
        <div className='landing-info'></div>
        <h1>Unlimited movies, TV shows and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <h3>
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <div className='landing-email-input'>
          <input type='email' placeholder='Email Address' />
          <button>Get Started</button>
        </div>
      </div>
      <Footer classname='landing-footer' />
    </div>
  );
};

export default Landing;
