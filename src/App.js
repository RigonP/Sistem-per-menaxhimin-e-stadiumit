import React from 'react'
import './App.css'
import Eventet from './Components/Eventet/Eventet' 
import Contact from './Components/ContactForm/Contact';  
import Shop from './Components/Shop/Shop'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/eventet' element={<Eventet />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
  </Router>
  )
}

export default App