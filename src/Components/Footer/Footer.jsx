import React, {useEffect} from 'react'
import './footer.css'
import video2 from '../../Assets/Kosovo_Flag_Loop.mp4'
import {FiSend} from 'react-icons/fi'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {FaTripadvisor} from 'react-icons/fa'
import {FiChevronRight} from 'react-icons/fi'
import {BiFootball} from 'react-icons/bi'

import Aos from 'aos'
import 'aos/dist/aos.css'


const Footer = () => {
  //create a react hook to add scroll animation
  useEffect(() => {
    Aos.init({duration: 2000})
  },[])




  return (
    <section className="footer">
      <div className="videoDiv">
        <video src={video2} loop autoPlay muted type="video/mp4"></video>
      </div>

      <div className="secContent container">
        <div className="contactDiv flex">
          <div data-aos="fade-up" className="text">
            <small>Na shkruani</small>
            <h2>KOSOVA</h2>
          </div>

          <div className="inputDiv flex">
            <input data-aos="fade-up"  type="text" placeholder='Shkruani email' />
            <button  data-aos="fade-up" className='btn flex' type="submit">
              DERGO <FiSend className='icon' />
            </button>
          </div>
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="#" className="logo flex">
                <BiFootball className="icon" />KOSOVO - Stadium.
              </a>
            </div>

            <div data-aos="fade-up" className="footerParagraph">
            Topi i parë i futbollit në Kosovë mendohet se është sjellë nga një student i Grenoblit më 1919, 
            por burime tjera japin një version se më 1914 është zhvilluar ndeshja e parë e futbollit në Kosovë, 
            ku kanë luajtur Austro-Hungarezët, të cilët kanë shërbyer në atë kohë në vendin tonë. 
            </div>

            <div className="footerSocials flex">
              <AiOutlineTwitter className="icon" />
              <AiFillYoutube className="icon" />
              <AiFillInstagram className="icon" />
              <FaTripadvisor className="icon" />
            </div>
          </div>

          
          <div className="footerLinks grid">
            {/*Grupi i pare */}
            <div data-aos="fade-up" data-aos-duration="3000" className="linkGroup">
              <span className="groupTitle">
                EVENTET
              </span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Lorem
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Lorem
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Lorem
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Lorem
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Lorem
              </li>

            </div>

            {/*Grupi i dyte */}
            <div data-aos="fade-up" data-aos-duration="4000" className="linkGroup">
              <span className="groupTitle">
                PARTNERET
              </span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                STADIUMI
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Lorem
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                impsum
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                lorem
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                lorem
              </li>

            </div>

            {/*Grupi i trete */}
            <div data-aos="fade-up" data-aos-duration="5000" className="linkGroup">
              <span className="groupTitle">
                LAST MINUTE
              </span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Lorem
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Lorem
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Lorem
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Lorem
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Payment
              </li>

            </div>
          </div>

          <div className="footerDiv flex">
            <small>BEST STADIUM</small>
            <small>Copyright reserved - UBT 2023</small>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Footer