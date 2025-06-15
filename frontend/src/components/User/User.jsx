import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; 
import './User.css'; 
import { assets } from '../../assets/assets.js'; 
import { GoogleLogin } from '@react-oauth/google'; nent
import FacebookLogin from '@greatsumini/react-facebook-login'; 
import { jwtDecode } from 'jwt-decode'; 


Modal.setAppElement('#root');

const User = ({ showUser, setShowUser, isLogin, setIsLogin, setShowProfile }) => {

  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const sendReq = async (e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password')
    };
    try {
      let response;
      if (isLogin) {
        response = await axios.post('http://localhost:3000/login', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        response = await axios.post('http://localhost:3000/signup', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', user);
      setShowUser(false);
      setShowProfile(true);
    } catch (error) {
      document.querySelector('.error').textContent = error.response.data.message;
    }
  };

  const facebookLogin = (response) => {
    setShowProfile(true); 
    setShowUser(false);
    localStorage.setItem('token', response.accessToken);
    fetch(`https://graph.facebook.com/me?access_token=${response.accessToken}&fields=name`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.name) {
          localStorage.setItem('userName', data.name);
        } else {
          console.error("Failed to get user's name from Facebook");
        }
      })
      .catch((error) => {
        console.error('Error fetching user information from Facebook:', error);
      });
  };

  const responseGoogle = (response) => {
    setShowProfile(true); 
    setShowUser(false);
    const decoded = jwtDecode(response.credential);
    const { email, name, picture } = decoded;
    localStorage.setItem('profile', picture);
    localStorage.setItem('token', response.credential);
    localStorage.setItem('userName', name);
  };

  return (
    <Modal
      isOpen={showUser}
      onRequestClose={() => setShowUser(false)} 
      className="user-modal"
      overlayClassName="user-modal-overlay"
    >
      <div className='user'>
        <div className='user-header'>
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <img src={assets.crossIcon} onClick={() => setShowUser(false)} alt="Close" />
        </div>
        <form onSubmit={sendReq}>
          {!isLogin && (
            <>
              <div>
                <label htmlFor="first-name">First Name</label>
                <input type="text" name='first-name' id='first-name' placeholder='First Name' required/>
              </div>
              <div>
                <label htmlFor="last-name">Last Name</label>
                <input type="text" name='last-name' id='last-name' placeholder='Last Name' required/>
              </div>
            </>
          )}
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' placeholder='Enter your email' required/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' placeholder='Password' required/>
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" name='confirm-password' id='confirm-password' placeholder='Confirm Password' required/>
            </div>
          )}
          <p>
            {isLogin ? (
              'By logging in you agree to our Terms & Privacy.'
            ) : (
              'By creating an account you agree to our Terms & Privacy.'
            )}
          </p>
          <button>{isLogin ? 'Login' : 'Proceed'}</button>
          <p className="error"></p> {/* Display error messages */}
        </form>
        <p>
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          <span onClick={toggleForm}>{isLogin ? ' Sign Up' : ' Login'}</span>
        </p>
        <p className='text-center text-primary'>------------ OR ------------</p>
        <div className='d-flex align-items-center justify-content-center gap-2 flex-column flex-md-row'>
          <GoogleLogin 
            buttonText="Continue with Google"
            className="google-button"
            onSuccess={responseGoogle} 
            onFailure={() => {
              document.getElementsByClassName('error').textContent = "Error, please try again or use one of the other methods";
            }}
            cookiePolicy={'single_host_origin'}
          />
          <FacebookLogin 
            appId='1621312848664618'
            textButton='Continue with Facebook'
            fields='name,email,picture'
            callback={facebookLogin} 
            cssClass="facebook-button"
            onSuccess={facebookLogin}
            onFail={() => {
              document.getElementsByClassName('error').textContent = "Error, please try again or use one of the other methods";
            }}
            style={{
              backgroundColor: '#4267b2',
              color: '#fff',
              fontSize: '14px',
              width: '100%',
              padding: '8px 10px',
              border: 'none',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default User;