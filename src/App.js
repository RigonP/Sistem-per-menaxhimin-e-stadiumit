import React from 'react'
import './App.css'
import Stadiumi from './Components/Stadiumi/Stadiumi';
import Eventet from './Components/Eventet/Eventet' 
import Contact from './Components/ContactForm/Contact';  
import Fans from './Components/Fans/Fans'
import Shop from './Components/Shop/Shop'
import Tours from './Components/Tours/Tours'
import { Routes, Route} from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Tiketat from './Components/Tiketat/Tiketat';
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Kits from './Components/Kits/Kits'
import ChangePasswordPage from "./Components/Signup/ChangePasswordPage";
import ForgotPasswordPage from "./Components/Signup/ForgotPasswordPage";
import DashboardAdmin from "./Components/Dashboard/Dashboard";
import axios from "axios";
import { BrowserRouter , Navigate } from 'react-router-dom';
import ArritjaKetu from './Components/Tours/ArritjaKetu';


axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAdmin = localStorage.getItem('role') === 'admin';

  return (
      <Route
          {...rest}
          element={isAdmin ? <Component /> : <Navigate to="/login" replace />}
      />
  );
};

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/stadiumi' element={<Stadiumi />} />
      <Route path='/eventet' element={<Eventet />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/arritja-ketu" element={<ArritjaKetu />} />
      <Route path='/fans' element={<Fans />} /> 
      <Route path='/tours' element={<Tours />} />
      <Route path='tiketat' element={<Tiketat />} />
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/kits' element={<Kits/>}/>
      <Route path='/forgotPassword' element={<ForgotPasswordPage />}/>
      <Route path='/changePassword' element={<ChangePasswordPage />}/>
      <Route path ='/dashboard' element={<DashboardAdmin />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App