import React, { useEffect } from 'react';
import './Footer.css'; // Import CSS styles for the footer component

const Footer = ({ navChange, setNavChange }) => {
  useEffect(() => {
    // Check if the current path is not the homepage
    if (window.location.pathname !== '/') {
      setNavChange(true); // Update the navigation state if not on the homepage
    }
  }, [setNavChange]); // Add setNavChange to dependencies array to avoid warning

  return (
    <div className={`container-fluid ${navChange ? 'bg-danger' : 'bg-success'}`}>
      <footer className={`footer container`} id="contact">
        <div className='footer-container'>
          {/* Social media section */}
          <div className='social-media'>
            <h1>Follow US</h1>
            <div className='social-icons'>
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
          {/* Address section */}
          <div className='address'>
            <h1><i className="fa-solid fa-map-location-dot"></i>Address</h1>
            <p>123 Main Street, City, State, Zip Code</p>
          </div>
          {/* Contact information section */}
          <div className='contact-us'>
            <h1><i className="fa-solid fa-address-book"></i>Contact US</h1>
            <p><i className="fa-solid fa-phone"></i>Phone: +91 1234567890</p>
            <p><i className="fa-solid fa-envelope"></i>Email: username@example.com</p>
          </div>
        </div>
        <div className='text-center'>&copy; 2024 Zomato</div> {/* Copyright text */}
      </footer>
    </div>
  );
}

export default Footer;