import React, {useEffect} from 'react';
import './shop.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import img10 from '../../images/full_width_banner-culture_wear_535x.webp'
import img1 from '../../images/d9a6c41ab6ef92bd3e6c11d0df37b942.jpg'
import img2 from '../../images/RealMadrid_Official_Online_Store.avif'
import img3 from '../../images/download.jpeg'
import img4 from '../../images/galerie_bg.jpg'
import img5 from '../../images/kosovo-2021-2022-fourteen-kit-1.webp'
import img6 from '../../images/vedat-muriqi.jpg'
import img7 from '../../images/pod_home_535x.webp'
import img8 from '../../images/shop_by_gender_male_330x.webp'
import img9 from '../../images/chica-shopbygender-1222_535x.webp'
import img11 from '../../images/nino-shopbygender-1222_535x.webp'

import Aos from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js';


function ShopSecond() {
    useEffect(() => {
        Aos.init({duration: 4000})
      },[])
    return(
    <>
        
        <div className='second-cop background-img-color row justify-content-center'>    

            <div class="container-fluid col-lg-4 second-cop-text">
                <img src={img10} alt="" className='img10'/>
            </div>

            <div className='col-lg-4 img-text'>
                    <p data-aos='slide-right' className='h1'>Look good with Kosova Kits</p>
                    <p data-aos='slide-right' className='h3'>Discover what's new in our shop</p>
                    <button data-aos='slide-right' type='button' className='btn btn-outline-light'>Buy Now</button>
            </div>
        </div> 

        <div class="container">
        <div class="row">
          <div class="col-12 d-flex justify-content-start header-div" data-aos="fade-up-right">
            <span class="diagonal-line header-kits">Kosova Football Icons</span> 
            <div className='header-lines'>
              <span className='header-lines'>//////////</span>
            </div>
          </div>
        </div>
      </div>


      <div class="container snap-scroll-container">
        <div class="row">
          <div class="col-12">
            <div class="overflow-auto vertical-scroll" style={{ whiteSpace: "nowrap"}}>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 1"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 2"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 3"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 4"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 5"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
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
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 8"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style">
                <img class="snap-scroll-images" src={img1} alt="Image 9"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container kits-container kits-container-two'>
      <div className='row justify-content-center'>
      <div class="card col-md-4 kits-card border-0 mb-20" data-aos="fade-right" data-aos-delay="8000">
        <img src={img8} class="card-img-top" alt="..."/>
        <div class="card-body kits-card-body">
          <p class="card-title card-text">Lifestyle Man</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <div class="card col-md-4 kits-card border-0 mb-20" data-aos="fade-right" data-aos-delay="8000">
        <img src={img9} class="card-img-top" alt="..."/>
        <div class="card-body kits-card-body">
          <p class="card-title card-text">Lifestyle Woman</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <div class="card col-md-4 kits-card border-0 mb-20" data-aos="fade-right" data-aos-delay="8000">
        <img src={img11} class="card-img-top" alt="..."/>
        <div class="card-body kits-card-body">
          <p class="card-title card-text">Lifestyle Youth</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      </div>
    </div>



    </>
    )
}

export default ShopSecond;
