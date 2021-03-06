import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import "../../css/nav.css";

const Nav = ( {links} ) => {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState('none')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => 
      window.removeEventListener("scroll", null);
  }, []);

  const handleClick = () => {
    if(display === 'none'){
      setDisplay('')
    } else {
      setDisplay('none')
    }
  }

  async function handleLogOut () {
      await logout()
      history.push('/')
  }

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <div className='nav-links'>
        <img className='logo' src={logo} alt='logo' />
        <div className='nav-link'>
          {links.map((link, i)=>
            <p key={i}>{link}</p>
          )}
        </div>
      </div>
      <img className='avatar' src={avatar} alt='avatar' onClick={handleClick}/>
      <div className='avatar-module' style={{display:`${display}`}}>
        <p>{currentUser.email}</p>
        <hr/>
        <Link to='/account' className='account-btn'><p>Account</p></Link>
        <Link to='/' className='logout-btn'><p onClick={handleLogOut}>Log Out</p></Link>
      </div>
    </div>
  );
};

export default Nav;
