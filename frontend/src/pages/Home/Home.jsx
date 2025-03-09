import React from 'react'
import './Home.css'
import Wallpaper from '../../components/Wallpaper.jsx/Wallpaper'
import QuickSearches from '../../components/QuickSearches/QuickSearches'
const Home = () => {
  return (
    <div className='home position-relative'>
      <Wallpaper />
      <QuickSearches />
    </div>
  )
}

export default Home
