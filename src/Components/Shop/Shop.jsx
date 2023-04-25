import React from 'react';
import './shop.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import video2 from '../../Assets/Kosovo_Flag_Loop.mp4'
import img1 from '../../images/d9a6c41ab6ef92bd3e6c11d0df37b942.jpg'
import img2 from '../../images/RealMadrid_Official_Online_Store.avif'
import img3 from '../../images/download.jpeg'
import img4 from '../../images/galerie_bg.jpg'
import img5 from '../../images/kosovo-2021-2022-fourteen-kit-1.webp'
import img6 from '../../images/vedat-muriqi.jpg'
import Footer from '../Footer/Footer'


function Shop(){
    return (
        <>
            <div class="container">

                <div class="row height d-flex justify-content-center align-items-center">
                    <div class="col-md-6">
                        <div class="form">
                            <i class="fa fa-search"></i>
                            <input type="text" class="form-control form-input" placeholder="Search anything..."/>
                        </div>
                    </div>
                </div>
            </div>

        <hr/>
        <nav class="navbar navbar-expand-lg navbar-light nav-style">
        <div class="container div-style">
            <a class="navbar-brand" href="#">Kosova Team</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link text-primary kits" href="#">Kits</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-primary shbp" href="#">Shop by player</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-primary sale" href="#">Sale</a>
                </li>
              </ul>
            </div>
        </div>
          </nav>

      <hr />

      <div id="carouselExampleCaptions" class="carousel slide container" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active container">
                    <img src={img6} class="d-block" alt="..."/>
                        <div class="carousel-caption">
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
            <div class="overflow-auto" style={{ whiteSpace: "nowrap" }}>
              <div class="card-img-top d-inline-block mx-2 card">
                <img class="card-img-top snap-scroll-images" src={img1} alt="Image 1"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="card-img-top d-inline-block mx-2 card">
                <img class="snap-scroll-images" src={img1} alt="Image 2"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="card-img-top d-inline-block mx-2 card">
                <img class="snap-scroll-images" src={img1} alt="Image 3"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="card-img-top d-inline-block mx-2 card">
                <img class="snap-scroll-images" src={img1} alt="Image 4"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="card-img-top d-inline-block mx-2 card">
                <img class="snap-scroll-images" src={img1} alt="Image 5"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="card-img-top d-inline-block mx-2 card">
                <img class="snap-scroll-images" src={img1} alt="Image 6"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="card-img-top d-inline-block mx-2 card">
                <img class="snap-scroll-images" src={img1} alt="Image 7"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="card-img-top d-inline-block mx-2 card">
                <img class="snap-scroll-images" src={img1} alt="Image 8"/>
                <div class="card-body">
                  <h5 class="card-title">Away Kit</h5>
                  <p class="card-text">45.00$</p>
                </div>
              </div>
              <div class="card-img-top d-inline-block mx-2 card">
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
      

      <Footer />
        </>
    )
}

export default Shop;