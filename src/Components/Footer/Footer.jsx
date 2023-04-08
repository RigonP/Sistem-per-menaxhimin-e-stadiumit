import React, {useEffect} from 'react'
import './footer.css'
import video2 from '../../Assets/video2.mp4'
import {FiSend} from 'react-icons/fi'
import {MdOutlineTravelExplore} from 'react-icons/md'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {FaTripadvisor} from 'react-icons/fa'
import {FiChevronRight} from 'react-icons/fi'


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
            <small>Keep in touch</small>
            <h2>Travel with us</h2>
          </div>

          <div className="inputDiv flex">
            <input data-aos="fade-up"  type="text" placeholder='Enter email' />
            <button  data-aos="fade-up" className='btn flex' type="submit">
              SEND <FiSend className='icon' />
            </button>
          </div>
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="#" className="logo flex">
                <MdOutlineTravelExplore className="icon" />Travel.
              </a>
            </div>

            <div data-aos="fade-up" className="footerParagraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dolor velit, 
            vehicula sit amet tempor vitae, 
            tincidunt ut quam. Quisque hendrerit eget magna dictum dignissim. 
            Nunc cursus risus ante, vitae maximus felis tincidunt id. 
            Sed eget diam et lectus vulputate eleifend vel eu lorem. Morbi non finibus odio. 
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
                Our agency
              </span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Services
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Insurance
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Agency
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Tourism
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Payment
              </li>

            </div>

            {/*Grupi i dyte */}
            <div data-aos="fade-up" data-aos-duration="4000" className="linkGroup">
              <span className="groupTitle">
                PARTNERS
              </span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                Bookings
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