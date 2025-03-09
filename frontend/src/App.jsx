import React, {useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Filter from './pages/Filter/Filter'
import Details from './pages/Details/Details'
import Footer from './components/Footer/Footer'
import User from './components/User/User'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Verify from './pages/OrderVerify/OrderVerify'

const App = () => {
  const [navChange, setNavChange] = useState(false)
  const [showUser, setShowUser] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  

  return (
    <div className='app'>
      <GoogleOAuthProvider 
        clientId="568127569448-i55ecn18u9c1ud0sfva20vi8i1rcs0b2.apps.googleusercontent.com">
        {showUser && <User 
          showUser={showUser} 
          setShowUser={setShowUser} 
          isLogin={isLogin} 
          setIsLogin={setIsLogin}
          setShowProfile={setShowProfile}
        />}
        <Header 
          navChange={navChange} 
          setNavChange={setNavChange} 
          setShowUser={setShowUser}
          setIsLogin={setIsLogin} 
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/filter' element={<Filter />} />
          <Route path='/details' element={<Details />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
        <Footer navChange={navChange} setNavChange={setNavChange} />
      </GoogleOAuthProvider>
    </div>
  )
}

export default App
