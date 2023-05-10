import React from 'react'
import './kits.css'

import MyNavbar from '../ShopNavbar/ShopN'
import SecondN from '../Navbar/Navbar';


import img1 from '../../images/collection_banner__mens_kits_1070x.webp'
import backKit from '../../images/back-kit.jpg'
import alitiback from '../../images/aliti-back.webp'
import alitiboth from '../../images/aliti-both.webp'
import awaykitback from '../../images/away-kit-back.webp'
import awaykitfront from '../../images/away-kit-front.webp'
import bluzaback from '../../images/bluza-back.webp'
import bluzafront from '../../images/bluza-front.webp'
import celinaback from '../../images/celina-back.webp'
import celinaboth from '../../images/celina-both.webp'
import duksback from '../../images/duks-back.webp'
import duksfront from '../../images/duks-front.webp'
import duks2back from '../../images/duks2-back.webp'
import duks2front from '../../images/duks2-front.webp'
import trainers from '../../images/komplet-trainers.webp'
import muriqiback from '../../images/muriqi-back.webp'
import muriqiboth from '../../images/muriqi-both.webp'
import rashicaback from '../../images/rashica-back.webp'
import rashicaboth from '../../images/rashica-both.webp'
import frontkit from '../../images/style-front-kit.webp'
import whitekit from '../../images/style-front-white-kit.webp'
import vojvodaback from '../../images/vojvoda-back.webp'
import vojvodaboth from '../../images/vojvoda-both.webp'
import yourback from '../../images/your-back.webp'
import yourboth from '../../images/your-both.webp'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProductFilter from '../FilterKits/Products';



function Kits(){
    return(
        <>
            <SecondN/>
            <div className="events">
                <h2>SHOP</h2>
            </div>
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

            <hr />

            <MyNavbar/>

            <hr />

            <div className='image-banner container-fluid'>
                <div className='container text-bannerr'>
                    <p className='heading-banner'>FOOTBALL KITS</p>
                    <p className='paragraph-banner'>Introducing the official kits worn by Kosova National Football Team players at the Santiago Bernabéu and around the world. For men, women and youth, personalise your shirt with your name or your favourite player´s name.</p>
                    <a href='#' className='read-link'>READ MORE</a>
                </div>
            </div>

            <ProductFilter/>

            

        {/* <div className='container filter-options'>    
            <select class="btn btn-lg btn-outline-dark buton1" id="color-filter">
                <option value="">Size</option>
                <option value="XXL">XXL</option>
                <option value="XL">XL</option>
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="S">S</option>
                <option value="XS">XS</option>

            </select>
            <select class="btn btn-lg btn-outline-dark buton2" id="color-filter">
                <option value="">Color</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
            </select>
            <select class="btn btn-lg btn-outline-dark buton3" id="color-filter">
                <option value="">Matchwear</option>
                <option value="red">GoalKeeper</option>
                <option value="blue">Defender</option>
                <option value="green">Midfielder</option>
                <option value="green">Attacker</option>
            </select>
            <select class="btn btn-lg btn-outline-dark buton4" id="color-filter">
                <option value="">Sort By</option>
                <option value="red">Best Seller</option>
                <option value="blue">Price | Lowest to Highest</option>
                <option value="green">Price | Highest to Lowest</option>
            </select>
        </div>  */}
          
    
                                    
            





        </>
    )
}

export default Kits;