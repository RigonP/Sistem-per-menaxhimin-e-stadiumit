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
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Signup/login";
<<<<<<< HEAD
import Kits from './Components/Kits/Kits'
=======
import ChangePasswordPage from "./Components/Signup/ChangePasswordPage";
import ForgotPasswordPage from "./Components/Signup/ForgotPasswordPage";
>>>>>>> bb44bbf57b9432b461cb9e853b1aff086cd97e10


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
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
<<<<<<< HEAD
      <Route path='/kits' element={<Kits/>}/>
=======
      <Route path='/forgotPassword' element={<ForgotPasswordPage />}/>
      <Route path='/changePassword' element={<ChangePasswordPage />}/>
>>>>>>> bb44bbf57b9432b461cb9e853b1aff086cd97e10
    </Routes>
  </Router>
  )
}

export default App