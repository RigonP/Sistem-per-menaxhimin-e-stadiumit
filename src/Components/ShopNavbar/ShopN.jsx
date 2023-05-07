import React, {useEffect} from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BiFontSize } from 'react-icons/bi';
import {MdOutlineStadium} from 'react-icons/md';
import { Link } from "react-router-dom";

import Aos from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js';


const ShopN = () => {
  useEffect(() => {
    Aos.init({duration: 4000, easing:'ease-in-out'})
  },[])
  return (
    <Navbar className='container' expand="md">
            <div className="logoDiv">
                <Link to="/" className="logo flex">
                    <h1 className="logo-text"><MdOutlineStadium className="icon"/> Kosovo Stadium.</h1>
                </Link>
            </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" data-target="#basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        <Link to="/kits" style={{color: 'black'}} className="nav-link">Kits</Link>
        <Link to="/shop-by-player" style={{color: 'black'}} className="nav-link">Shop By Player</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default ShopN;