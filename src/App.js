import React from 'react'
import './App.css'
import Eventet from './Components/Eventet/Eventet' 
import Contact from './Components/ContactForm/Contact';  
import Fans from './Components/Fans/Fans'
import Shop from './Components/Shop/Shop'
import Tours from './Components/Tours/Tours'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Tiketat from './Components/Tiketat/Tiketat';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/eventet' element={<Eventet />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} />
      <Route path='/fans' element={<Fans />} /> 
      <Route path='/tours' element={<Tours />} />
      <Route path='tiketat' element={<Tiketat />} />
    </Routes>
  </Router>
  )
}

export default App