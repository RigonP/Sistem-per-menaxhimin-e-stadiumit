import React, {useState} from 'react'
import './navbar.css'
import {AiFillCloseCircle} from 'react-icons/ai';
import {TbGridDots} from 'react-icons/tb';
import {MdOutlineStadium} from 'react-icons/md';
import {AiOutlineSearch} from 'react-icons/ai'

const Navbar = () => {
    
    const[active, setActive] = useState('navBar')
    //Function to toggle navBar
    const showNav = () => {
        setActive('navBar activeNavbar')
    }


    //Function to remove navBar
    const removeNavbar = () => {
        setActive('navBar')
    }



  return (
    <section className='navBarSection'>
        <header className="header flex">
            <div className="logoDiv">
                <a href="#" className="logo flex">
                    <h1><MdOutlineStadium className="icon"/> Kosovo Stadium.</h1>
                </a>
            </div>

            <div className={active}>
                <ul className="navLists flex">

                    <li className="navItem">
                        <a href="#" className="navLink">Eventet</a>
                    </li>

                    <li className="navItem">
                        <a href="#" className="navLink">Stadiumi</a>
                    </li>

                    <li className="navItem">
                        <a href="#" className="navLink">Tours</a>
                    </li>

                    <li className="navItem">
                        <a href="#" className="navLink">Fans</a>
                    </li>

                    <li className="navItem">
                        <a href="#" className="navLink">Tiketat</a>
                    </li>

                    <li className="navItem">
                        <a href="#" className="navLink">Shop</a>
                    </li>

                    <li className="navItem">
                        <a href="#" className="navLink">Kontakt</a>
                    </li>

                    <button className='btn'>
                        <a href="#">LOGIN</a>
                    </button>

                    <li className="navItem">
                        <a href="" ><AiOutlineSearch /></a>
                    </li>
                </ul>

                <div onClick={removeNavbar} className="closeNavBar">
                    <AiFillCloseCircle className="icon" />
                </div>
            </div>

            <div onClick={showNav} className="toggleNavBar">
                <TbGridDots className="icon" />
            </div>
        </header>
    </section>
  )
}

export default Navbar