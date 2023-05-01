import React, {useEffect} from 'react';
import './shop.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';



import img1 from '../../images/d9a6c41ab6ef92bd3e6c11d0df37b942.jpg'
import img2 from '../../images/RealMadrid_Official_Online_Store.avif'
import img3 from '../../images/download.jpeg'
import img4 from '../../images/galerie_bg.jpg'
import img5 from '../../images/kosovo-2021-2022-fourteen-kit-1.webp'
import img6 from '../../images/vedat-muriqi.jpg'
import img7 from '../../images/pod_home_535x.webp'
import MyNavbar from './ShopNav'
import ShopSecond from './ShopSecond'
import Footer from '../Footer/Footer'

import Aos from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js';




const Shop = () => {
  useEffect(() => {
    Aos.init({duration: 2000})
  },[])
    return (
        <>

            <div class="container">

                <div className="row height d-flex justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="form span">
                            <i className="fa fa-search"></i>
                            <input type="text" className="form-control form-input" placeholder="Search anything..."/>
                        </div>
                    </div>
                </div>
            </div>

        <hr/>

        <MyNavbar/>

        <hr />

      <div id="carouselExampleCaptions" class="slide container" data-ride="">
            <div className="carousel-inner">
                <div className="carousel-item active container-fluid" data-aos="flip-up">
                    <img src={img6} class="d-block" alt="..."/>
                        <div className="carousel-caption" data-aos="slide-right">
                            <h5>Vedat Muriqi</h5>
                            <p>Top goalscorer in LaLiga with Mallorca and also a topscorer in Kosova National Football Team</p>
                        </div>
                </div>
            </div>
        </div>
    <hr />

      <div class="container snap-scroll-container">
        <div class="row">
          <div class="col-12">
            <div class="overflow-auto vertical-scroll" style={{ whiteSpace: "nowrap"}}>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 1"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 2"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 3"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 4"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 5"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 6"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 7"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 8"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 9"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="container">
        <div class="row">
          <div class="col-12 d-flex justify-content-start header-div" data-aos="fade-up-right">
            <span class="diagonal-line header-kits">Kits</span> 
            <div className='header-lines'>
              <span className='header-lines'>//////////</span>
            </div>
          </div>
        </div>
      </div>


    <div className='container kits-container'>
      <div className='row justify-content-center'>
      <div class="card col-md-4 kits-card border-0 mb-20" data-aos="fade-right">
        <img src={img7} class="card-img-top" alt="..."/>
        <div class="card-body kits-card-body">
          <p class="card-title card-text">Home Kit 22/23</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <div class="card col-md-4 kits-card border-0 mb-20" data-aos="fade-right">
        <img src={img7} class="card-img-top" alt="..."/>
        <div class="card-body kits-card-body">
          <p class="card-title card-text">Home Kit 22/23</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      </div>
    </div>

    <div className='container kits-container'>
      <div className='row justify-content-center'>
      <div class="card col-md-4 kits-card border-0 mb-20" data-aos="fade-right" data-aos-delay="8000">
        <img src={img7} class="card-img-top" alt="..."/>
        <div class="card-body kits-card-body">
          <p class="card-title card-text">Home Kit 22/23</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <div class="card col-md-4 kits-card border-0 mb-20" data-aos="fade-right" data-aos-delay="8000">
        <img src={img7} class="card-img-top" alt="..."/>
        <div class="card-body kits-card-body">
          <p class="card-title card-text">Home Kit 22/23</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      </div>
    </div>



      <ShopSecond/>


      
      <Footer/>
      </>
      

    )
}

export default Shop;