import React from 'react'
import './Programs.css'
import {programsData} from './data/programsData'
import {AiOutlineArrowRight} from 'react-icons/ai'


const Programs = () => {
  return (
    <div className="Programs" id="programs">
        {/* header */}
        <div className="programs-header">
            <span className='stroke-text'>Plan </span>
            <span id='textColor'>Your</span>
            <span className='stroke-text'>Visit</span>
        </div>

        <div className="program-categories">
            {programsData.map((program) =>(
                <div className="category">
                    {program.image}
                    <span>{program.heading}</span>
                    <span>{program.details}</span>
                    <div className="join-now"><span>Read more</span><AiOutlineArrowRight /></div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Programs