import React from 'react'
import './App.css'
import Eventet from './Components/Eventet/Eventet' //
import Form from './Components/Contact/Form';  
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/eventet' element={<Eventet />} />
      <Route path="/contact" element={<Form />} />
    </Routes>
  </Router>
  )
}

export default App