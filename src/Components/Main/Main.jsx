import React, {useEffect} from 'react'
import './main.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'


//import the images 
import Kos1 from '../../Assets/kosova1.jpg'
import Kos2 from '../../Assets/kosova2.jpg'
import Kos3 from '../../Assets/kosova3.avif'
import Kos4 from '../../Assets/kosovaSw4.png'
import Kos5 from '../../Assets/kosovaRomania.jpg'
import Kos6 from '../../Assets/kosovaAndora.jpg'
import Kos7 from '../../Assets/swissKosova.jpg'
import Kos8 from '../../Assets/belarusKosova.jpg'


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

  {
    id:4,
    imgSrc:Kos5,
    destTitle:'Romania vs Kosovo',
    location: 'Romani',
    grade: '12 Shtator 2023',
    fees: '8:45PM',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:5,
    imgSrc:Kos6,
    destTitle:'Andora vs Kosova',
    location: 'Andora',
    grade: '12 Tetor 2023',
    fees: '8:45PM',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:6,
    imgSrc:Kos3,
    destTitle:'Kosova vs Izrael',
    location: 'Kosova',
    grade: '15 Tetor 2023',
    fees: '8:45PM',
    description: 'Lorem ipsum dolor sit'
  },
  
  {
    id:7,
    imgSrc:Kos7,
    destTitle:'Switzerland vs Kosova',
    location: 'Switzerland',
    grade: '18 Nentor 2023',
    fees: '8:45PM',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:8,
    imgSrc:Kos8,
    destTitle:'Kosova vs Belarus',
    location: 'Kosova',
    grade: '21 Nentor 2023',
    fees: '8:45PM',
    description: 'Lorem ipsum dolor sit'
  },


]



const Main = () => {
  
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

      <div className="secContent grid">
        
        {
          Data.map(({id, imgSrc, destTitle, location, grade, fees, description})=>{
            return( 
              <div key={id} className="singleDestination" data-aos="fade-up">
                
                <div className="imageDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>
                  <span className="continent flex">
                    <HiOutlineLocationMarker className='icon' />
                    <span className="name">{location}</span>
                  </span>

                  <div className="fees flex">
                    <div className="grade">
                      <span>{grade}</span>
                    </div>
                    <div className="price">
                      <span>{fees}</span>
                    </div>
 
                  </div>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className='btn flex'>
                    LEXO ME SHUME <HiOutlineClipboardCheck className='icon' />
                  </button>
                </div>
              </div>
            )
          })
        }

      </div>
    </section>
  )
}

export default Main