import React, {useEffect} from 'react'
import './ShortcutMain.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'

import { Link } from "react-router-dom";

//import the images 
import Kos1 from '../../../Assets/kosova1.jpg'
import Kos2 from '../../../Assets/kosova2.jpg'
import Kos4 from '../../../Assets/kosovaSw4.png'



import Aos from 'aos'
import 'aos/dist/aos.css'

//array named Data
const Data = [
  {
    id:1,
    imgSrc:Kos1,
    destTitle:'Kosova vs Romania',
    location: 'Kosove',
    grade: '16 Qershor 2023',
    fees: '8:45PM',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:2,
    imgSrc:Kos2,
    destTitle:'Belarus vs Kosova',
    location: 'Belarus',
    grade: '19 Qershor 2023',
    fees: '8:45PM',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:3,
    imgSrc:Kos4,
    destTitle:'Kosova vs Switzerland',
    location: 'Kosove',
    grade: '9 Shtator 2023',
    fees: '8:45PM',
    description: 'Lorem ipsum dolor sit'
  },
]



const ShortcutMain = () => {
  
  //create a react hook to add scroll animation
  useEffect(() => {
    Aos.init({duration: 2000})
  },[])



  return (
    <section className='main container section'>

      <div className="secTitle">
        <h3 data-aos="fade-right"  className="title">
          NDESHJET E ARDHSHME
        </h3>
      </div>

      
    </section>
    
  )
}

export default ShortcutMain