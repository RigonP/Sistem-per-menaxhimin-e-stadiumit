import React from 'react'
import './kits.css'

import MyNavbar from '../ShopNavbar/ShopN'

import img1 from '../../images/collection_banner__mens_kits_1070x.webp'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function Kits(){
    return(
        <>
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

            
            <div className="container dropdown-container">
                <div className="row g-1">
                    <div className="col-md-1">
                        <div className="dropdown">
                            <button style={{color:"black"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                KITS | SIZE
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#">Item 1</a></li>
                                <li><a className="dropdown-item" href="#">Item 2</a></li>
                                <li><a className="dropdown-item" href="#">Item 3</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="dropdown">
                            <button style={{color:"black"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                COLORS
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                <li><a className="dropdown-item" href="#">Item 1</a></li>
                                <li><a className="dropdown-item" href="#">Item 2</a></li>
                                <li><a className="dropdown-item" href="#">Item 3</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-1">
                    <div className="dropdown">
                            <button style={{color:"black"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
                                MATCHWEAR
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                                <li><a className="dropdown-item" href="#">Item 1</a></li>
                                <li><a className="dropdown-item" href="#">Item 2</a></li>
                                <li><a className="dropdown-item" href="#">Item 3</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="dropdown">
                            <button style={{color:"black"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton4" data-bs-toggle="dropdown" aria-expanded="false">
                                SORT BY
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton4">
                                <li><a className="dropdown-item" href="#">Item 1</a></li>
                                <li><a className="dropdown-item" href="#">Item 2</a></li>
                                <li><a className="dropdown-item" href="#">Item 3</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
                    
            





        </>
    )
}

export default Kits;