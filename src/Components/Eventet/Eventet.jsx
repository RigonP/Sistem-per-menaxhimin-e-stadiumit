import React from 'react'
import './Eventet.css'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import Main from '../Main/Main'
import Sponsors from './Sponsors/Sponsors'

const Eventet = () => {
  return (
    <>
    <Navbar />
      <div className="events">
        <h2>EVENTET</h2>
      </div>
    <Main />
    <Sponsors />
    <Footer />
    </>
  )
}

export default Eventet
