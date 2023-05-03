import React, {useEffect} from 'react'
import './Tiketat.css'
import Navbar from '../Navbar/Navbar'

import Aos from 'aos'
import 'aos/dist/aos.css'

const Tiketat = () => {

  useEffect(() => {
    Aos.init({duration: 2000})
  },[])

  return (
    <>
    <Navbar />
      <div className="events">
        <h2 data-aos='fade-right'>TIKETAT</h2>
      </div>
    </>
  )
}

export default Tiketat
