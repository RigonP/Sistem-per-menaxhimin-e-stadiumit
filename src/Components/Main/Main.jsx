import React from 'react'
import './main.css'

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
  return (
    <section className='main container section'>

      <div className="secTitle">
        <h3 className="title">
          Most visited destinations
        </h3>
      </div>

      <div className="secContent grid">
        
      </div>
    </section>
  )
}

export default Main