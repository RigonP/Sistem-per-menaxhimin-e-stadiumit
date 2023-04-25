import React from 'react';
import './Contact.css';
import Navbar from '../Navbar/Navbar'
import {GrMapLocation} from 'react-icons/gr'
import {HiOutlineMailOpen} from 'react-icons/hi'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {FaFacebookF} from 'react-icons/fa'
import {AiOutlineTwitter} from 'react-icons/ai'
import {FiInstagram} from 'react-icons/fi'

import { validateName, validateSurname, validateEmail, validatePhone, validateMessage, validateForm } from './script';


const Contact = () => {
    return (
        <>
        <Navbar/>
        <div className="contactUs">
          <div className="title">
            <h2>KONTAKTI</h2>
          </div>
          <div className="box">
            <div className="contact form">
              <h3>Shkruani mesazh</h3>
              <form>
                <div className="formBox">
                  <div className="row50">
                    <div className="inputBox">
                      <span>Emri</span>
                      <input type="text" placeholder="Emri" id="contact-name" name="contact-name" onKeyUp={validateName} />
                    </div>
                    <div className="inputBox">
                      <span>Mbiemri</span>
                      <input type="text" placeholder="Mbiemri" id="contact-surname" name="contact-surname" onKeyUp={validateSurname} />
                    </div>
                  </div>
                  <div className="row50">
                    <div className="inputBox">
                      <span>Email Adresa</span>
                      <input type="text" placeholder="Email" id="contact-email" name="contact-email" onKeyUp={validateEmail}  />
                    </div>
                    <div className="inputBox">
                      <span>Numri telefonit</span>
                      <input type="text" placeholder="Telefoni" id="contact-phone" name="contact-phone" onKeyUp={validatePhone} />
                    </div>
                  </div>
                  <div className="row100">
                    <div className="inputBox">
                      <span>Mesazhi</span>
                      <textarea placeholder="Shkruani mesazhin tuaj" id="contact-message" name="contact-message" onKeyUp={validateMessage} />
                    </div>
                  </div>
                  <div className="row100">
                    <div className="inputBox">
                      <input type="submit" value="Dergo" onClick={validateForm} />
                      <span id="submit-error"></span>
                      <span id="submit-error2"></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="contact info">
              <h3>Na kontaktoni</h3>
              <div className="infoBox">
                <div>
                  <span><GrMapLocation /></span>
                  <p>Prishtine <br /> Kosovë</p>
                </div>
                <div>
                  <span><HiOutlineMailOpen/></span>
                  <a href="mailto:kosovostadium@gmail.com">kosovostadium@gmail.com</a>
                </div>
                <div>
                  <span><BsFillTelephoneFill /></span>
                  <a href="tel: +38344111222">+383 44 111 222</a>
                </div>
                <ul className="sci">
                <li><a href=""><FaFacebookF/></a></li>
                <li><a href=""><AiOutlineTwitter/></a></li>
                <li><a href=""><FiInstagram /></a></li>
              </ul>
            </div>
          </div>
          {/* Map section */}
          <div className="contact-map">
            <iframe title="Google Maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.928454076262!2d21.1544899753821!3d42.662871515918106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee398234689%3A0x1ecdd21bb52cbd0f!2zU3RhZGl1bSAiIPCdkIXwnZCA8J2Qg_CdkIjwnZCLIPCdkJXwnZCO8J2QivCdkJHwnZCR8J2QiCAiIFByaXN0aW5h!5e0!3m2!1sen!2s!4v1682011069333!5m2!1sen!2s"
                width="600"
                height="450"
                style={{border:"0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          
        </div>
        </div>
        </>
      );
}

export default Contact