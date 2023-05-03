import React from 'react'
import './kits.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import MyNavbar from '../Shop/ShopNav'

import img1 from '../../images/collection_banner__mens_kits_1070x.webp'




function Kits(){
    return(
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

            <hr />

            <MyNavbar/>

            <hr />

            <div className='image-banner'>
                <div className='container text-banner'>
                    <h1>FOOTBALL KITS</h1>
                    <p>Introducing the official kits worn by Kosova National Football Team players at the Santiago Bernabéu and around the world. For men, women and youth, personalise your shirt with your name or your favourite player´s name!</p>
                </div>
            </div>




        </>
    )
}

export default Kits;