import React, { useState, useEffect } from "react";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import "../../css/nav.css";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState('none')

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    // return () => {
    //   window.removeEventListener("scroll");
    // };
  }, []);

  const handleClick = () => {
    if(display === 'none'){
      setDisplay('')
    } else {
      setDisplay('none')
    }
  }
  return (
    <div className={`nav ${show && "nav-black"}`}>
      <div className='nav-links'>
        <img className='logo' src={logo} alt='logo' />
        <div className='nav-link'>
          <p>Home</p>
          <p>TV Shows</p>
          <p>Movies</p>
          <p>New & Popular</p>
          <p>My List</p>
        </div>
      </div>
      <img className='avatar' src={avatar} alt='avatar' onClick={handleClick}/>
      <div className='avatar-module' style={{display:`${display}`}}>
        <p>Account</p>
        <p>Log Out</p>
      </div>
    </div>
  );
};

export default Nav;
