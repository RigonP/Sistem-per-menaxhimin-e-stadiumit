import React from 'react'
import './App.css'
import Stadiumi from './Components/Stadiumi/Stadiumi';
import Eventet from './Components/Eventet/Eventet' 
import Contact from './Components/ContactForm/Contact';  
import Fans from './Components/Fans/Fans'
import Shop from './Components/Shop/Shop'
import Tours from './Components/Tours/Tours'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Tiketat from './Components/Tiketat/Tiketat';
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Signup/Login";
import Kits from './Components/Kits/Kits'
import ChangePasswordPage from "./Components/Signup/ChangePasswordPage";
import ForgotPasswordPage from "./Components/Signup/ForgotPasswordPage";


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/stadiumi' element={<Stadiumi />} />
      <Route path='/eventet' element={<Eventet />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} />
      <Route path='/fans' element={<Fans />} /> 
      <Route path='/tours' element={<Tours />} />
      <Route path='tiketat' element={<Tiketat />} />
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/kits' element={<Kits/>}/>
      <Route path='/forgotPassword' element={<ForgotPasswordPage />}/>
      <Route path='/changePassword' element={<ChangePasswordPage />}/>
    </Routes>
  </Router>
  )
}

export default App