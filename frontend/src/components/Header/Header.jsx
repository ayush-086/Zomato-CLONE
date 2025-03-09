import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css'; // Import CSS styles for the header component
import { assets } from '../../assets/assets'; // Import assets

const Header = ({ navChange, setNavChange, setShowUser, setIsLogin, showProfile, setShowProfile }) => {
  const [showLogout, setShowLogout] = useState(false); // State to toggle logout button visibility
  const location = useLocation(); // Hook to get the current location
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  const profile = localStorage.getItem('profile'); // Retrieve profile image URL from local storage

  // Update navigation state based on current pathname
  useEffect(() => {
    if (location.pathname !== '/') {
      setNavChange(true); // Set navigation state to true if not on the homepage
    } else {
      setNavChange(false); // Set navigation state to false if on the homepage
    }
  }, [location.pathname, setNavChange]);

  // Update profile visibility based on token
  useEffect(() => {
    if (token) {
      setShowProfile(true); // Show profile if token exists
      setShowLogout(false); // Hide logout button initially
    }
  }, [token, setShowProfile, setShowLogout]);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('profile'); // Remove profile from local storage
    localStorage.removeItem('userName'); // Remove userName from local storage
    setShowProfile(false); // Hide profile section
  }

  return (
    <div className={`position-relative container-fluid ${navChange ? "bg-danger" : "bg-transparent"}`}>
      <div className={`navbar nav-container container d-flex ${!navChange ? "justify-content-end" : "justify-content-between"} align-items-center text-white`}>
        {/* Show logo if navChange is true */}
        {navChange ? <a href="/">
          <img src={assets.logo} alt="Logo" id='logo' />
        </a> : ""}
        
        {/* Display login or profile based on showProfile state */}
        {!showProfile ? 
          <ul className='login'>
            <li onClick={() => { setShowUser(true); setIsLogin(true); }}>Login</li>
            <li onClick={() => { setShowUser(true); setIsLogin(false); }} id='createAccount'>Create an account</li>
          </ul>
          : 
          <div className='profile' onMouseLeave={() => setShowLogout(false)}>
            {/* Display profile image or icon based on presence of profile */}
            {profile 
              ? <img src={profile} onMouseOver={() => setShowLogout(true)} alt="Profile" /> 
              : <i className={`fa-solid fa-user ${navChange ? "text-body" : "text-primary"}`} onMouseOver={() => setShowLogout(true)}></i>
            }
            {/* Show logout button only when showLogout is true */}
            <button onClick={handleLogout} className={`${!showLogout ? 'd-none' : 'd-block'}`}>Logout</button>
          </div>
        }
      </div>
    </div>
  );
}

export default Header;