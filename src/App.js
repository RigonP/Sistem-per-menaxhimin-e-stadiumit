import React from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import Programs from './Components/Programs/Programs';
import Homeslider from './Components/Slider/homeslider/slider';
// import Eventet from './Components/Eventet/Eventet'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <Router>
	    <Navbar />
	    {/* <Routes>
		    <Route path='/eventet' element={<Eventet/>} />
	    </Routes> */}
      <Homeslider />
      <Main />
      <Home />
      <Programs />
      <Footer />
	  </Router>
  )
}

export default App