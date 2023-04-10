import React from 'react'
import './app.css'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';

import Homeslider from './Components/Slider/homeslider/slider';

const App = () => {
  return (
    <>
    <Navbar />
    <Homeslider />
    <Main />
    <Home />
    <Footer />
    </>
  )
}

export default App