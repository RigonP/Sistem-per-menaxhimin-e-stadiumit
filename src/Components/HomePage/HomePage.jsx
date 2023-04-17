import React from 'react'
import '../../App.css'
import Navbar from '../Navbar/Navbar'
import Eventet from '../Eventet/Eventet'
import Homeslider from '../Slider/homeslider/slider'
// import Main from '../Main/Main'
import Home from '../Home/Home'
import Programs from '../Programs/Programs'
import Footer from '../Footer/Footer'
import {Routes, Route} from 'react-router-dom';
import Testimonials from '../Testimonials/Testimonials'
const HomePage = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/eventet' element={<Eventet/>} />
    </Routes>
    <Homeslider />
    <Testimonials />
    <Home />
    <Programs />
    <Footer />
    </>
  )
}

export default HomePage