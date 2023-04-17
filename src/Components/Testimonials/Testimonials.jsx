import React from 'react'
import './Testimonials.css'
import { testimonialsData } from './testimonialsData'
import { useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';
import {BsArrowLeft} from 'react-icons/bs'

const Testimonials = () => {
    
    const[selected, setSelected] = useState(0);
    const tLength = testimonialsData.length;


  return (
    <div className='Testimonials'>
        <div className="left-t">
            <span></span>
            <span className='stroke-text'>Mikpritja</span>
            <span>Hospitality</span>
            <span>
                {testimonialsData[selected].review}
            </span>
            <span>
                <span style={{color:'hsl(199,100%,33%)'}}>
                    {testimonialsData[selected].name}
                </span>{" "}
                - {testimonialsData[selected].status}
            </span>
        </div>
        <div className="right-t">
            <div></div>
            <div></div>
            <img src={testimonialsData[selected].image} alt="" />

            <div className="arrows">
                <BsArrowLeft className='img'
                onClick={()=>{
                    selected===0? setSelected(tLength-1) : setSelected((prev)=>prev-1)
                }}
                />
                <BsArrowRight className='img'
                onClick={()=>{
                    selected===tLength-1? setSelected(0) : setSelected((prev)=>prev+1)
                }}
                />
            </div>
        </div>
    </div>
  )
}

export default Testimonials