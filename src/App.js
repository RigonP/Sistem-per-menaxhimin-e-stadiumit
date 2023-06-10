import React from 'react'
import './App.css'
import Stadiumi from './Components/Stadiumi/Stadiumi';
import Eventet from './Components/Eventet/Eventet'
import Contact from './Components/ContactForm/Contact';
import Fans from './Components/Fans/Fans'
import Shop from './Components/Shop/Shop'
import Cart from './Components/Cart/Cart'
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
import Autobuset from './Components/Tours/Autobuset';
import UserProfilePage from "./Components/UserProfilePage/UserProfilePage";
import {AuthProvider} from "./Components/Authentication/AuthContext";
import VirtualTour from "./Components/Tours/VirtualTour"; 



const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/stadiumi' element={<Stadiumi />} />
      <Route path='/eventet' element={<Eventet />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/arritja-ketu" element={<ArritjaKetu />} />
      <Route path='/fans' element={<Fans />} />
      <Route path='/autobuset' element={<Autobuset />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/virtualTour' element={<VirtualTour />} />
      <Route path='tiketat' element={<Tiketat />} />
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/kits' element={<Kits/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/forgotPassword' element={<ForgotPasswordPage />}/>
      <Route path='/changePassword' element={<ChangePasswordPage />}/>
      <Route path ='/dashboard' element={<DashboardAdmin />}/>
      <Route path='/userPage' element={<UserProfilePage />}/>
        </Routes>
      </AuthProvider>
  </BrowserRouter>
  )
}

export default App