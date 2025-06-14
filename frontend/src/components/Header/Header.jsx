import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css'; 
import { assets } from '../../assets/assets'; 

const Header = ({ navChange, setNavChange, setShowUser, setIsLogin, showProfile, setShowProfile }) => {
  const [showLogout, setShowLogout] = useState(false); 
  const location = useLocation(); 
  const token = localStorage.getItem('token'); 
  const profile = localStorage.getItem('profile'); 

  useEffect(() => {
    if (location.pathname !== '/') {
      setNavChange(true);
    } else {
      setNavChange(false); 
    }
  }, [location.pathname, setNavChange]);

  
  useEffect(() => {
    if (token) {
      setShowProfile(true); 
      setShowLogout(false);
    }
  }, [token, setShowProfile, setShowLogout]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('profile'); 
    localStorage.removeItem('userName'); 
    setShowProfile(false); 
  }

  return (
    <div className={`position-relative container-fluid ${navChange ? "bg-danger" : "bg-transparent"}`}>
      <div className={`navbar nav-container container d-flex ${!navChange ? "justify-content-end" : "justify-content-between"} align-items-center text-white`}>
        {navChange ? <a href="/">
          <img src={assets.logo} alt="Logo" id='logo' />
        </a> : ""}
        
        {!showProfile ? 
          <ul className='login'>
            <li onClick={() => { setShowUser(true); setIsLogin(true); }}>Login</li>
            <li onClick={() => { setShowUser(true); setIsLogin(false); }} id='createAccount'>Create an account</li>
          </ul>
          : 
          <div className='profile' onMouseLeave={() => setShowLogout(false)}>
            {profile 
              ? <img src={profile} onMouseOver={() => setShowLogout(true)} alt="Profile" /> 
              : <i className={`fa-solid fa-user ${navChange ? "text-body" : "text-primary"}`} onMouseOver={() => setShowLogout(true)}></i>
            }
            <button onClick={handleLogout} className={`${!showLogout ? 'd-none' : 'd-block'}`}>Logout</button>
          </div>
        }
      </div>
    </div>
  );
}

export default Header;