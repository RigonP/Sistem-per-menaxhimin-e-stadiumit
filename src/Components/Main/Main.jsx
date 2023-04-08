import React, {useEffect} from 'react'
import './main.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'


//import the images 
import img from '../../Assets/img.jpg'
import img2 from '../../Assets/img2.jpg'
import img3 from '../../Assets/img3.jpg'
import img4 from '../../Assets/img4.jpg'
import img5 from '../../Assets/img5.jpg'
import img6 from '../../Assets/img6.jpg'
import img7 from '../../Assets/img7.jpg'
import img8 from '../../Assets/img8.jpg'
import img9 from '../../Assets/img9.jpg'

import Aos from 'aos'
import 'aos/dist/aos.css'

//array named Data
const Data = [
  {
    id:1,
    imgSrc:img,
    destTitle:'Bora Bora',
    location: 'New Zeland',
    grade: 'Cultural relax',
    fees: '$700',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:2,
    imgSrc:img2,
    destTitle:'Machu Picchu',
    location: 'Peru',
    grade: 'Cultural relax',
    fees: '$600',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:3,
    imgSrc:img3,
    destTitle:'Great Barrier Reef',
    location: 'Australia',
    grade: 'Cultural relax',
    fees: '$700',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:4,
    imgSrc:img4,
    destTitle:'Cappadocia',
    location: 'Turkey',
    grade: 'Cultural relax',
    fees: '$800',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:5,
    imgSrc:img5,
    destTitle:'Guanajuato',
    location: 'Mexico',
    grade: 'Cultural relax',
    fees: '$1100',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:6,
    imgSrc:img6,
    destTitle:'Cinque Terre',
    location: 'Italy',
    grade: 'Cultural relax',
    fees: '$840',
    description: 'Lorem ipsum dolor sit'
  },
  
  {
    id:7,
    imgSrc:img7,
    destTitle:'Angkor Wat',
    location: 'Cambodia',
    grade: 'Cultural relax',
    fees: '$790',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:8,
    imgSrc:img8,
    destTitle:'Taj Mahal',
    location: 'India',
    grade: 'Cultural relax',
    fees: '$900',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:9,
    imgSrc:img9,
    destTitle:'Bali Island',
    location: 'Indonesia',
    grade: 'Cultural relax',
    fees: '$500',
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
          Most visited destinations
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
                      <span>{grade}<small>+1</small></span>
                    </div>
                    <div className="price">
                      <h5>{fees}</h5>
                    </div>
                  </div>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className='btn flex'>
                    DETAILS <HiOutlineClipboardCheck className='icon' />
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