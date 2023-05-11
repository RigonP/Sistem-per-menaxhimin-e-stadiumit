import React, { useState } from 'react'; 
import { FaSearchLocation } from 'react-icons/fa';
import { FaRegAddressBook } from 'react-icons/fa';
import { FaLaptop } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Autobuset.css';
import { Link } from "react-router-dom";
import autobus from '../../Assets/autobus.jpg'

const Autobuset = () => {
    return(
        <>
        <Navbar />


    <div className="containerA">
    <div className="text-containerA">
        <header>TA BËJMË TË LEHTË RRUGËN DREJT STADIUMIT</header>
    <p>Në Prishtinë, ka disa linja të autobusëve urbanë që shkojnë në stadiumin "Fadil Vokrri". Linjat e autobusëve ndryshojnë ndonjëherë, kështu që është mirë të verifikoni informacionin aktual në momentin e udhëtimit tuaj. Por zakonisht, autobuset që shkojnë në stadiumin "Fadil Vokrri" janë autobusët e linjës <strong>numër 1</strong>.
       Ju mund të merrni autobusin urban <strong>numër 1</strong>, i cili kalon përmes shumicës së rrugëve kryesore të Prishtinës. Nëse jeni në qendër, mund të nisni nga stacioni i autobusëve tek "Zogu i Zi" dhe të merrni autobusin e linjës numër 1 që shkon në drejtim të Kombinatit. Ju do të duhet të dilni në stacionin e autobusëve tek <strong>"Rruga e Dibres"</strong> dhe të vazhdoni këmbë në rrugën <strong>"Nëna Terezë"</strong> për të arritur në stadiumin "Fadil Vokrri".
       Gjithashtu, ju gjithashtu mund të hyni në autobusin urban <strong>numër 1</strong> në ndonjë stacion tjetër në rrugën <strong>"Nëna Terezë"</strong> ose në rrugë të tjera në afërsi të stadiumit dhe të shkoni deri te stadiumi "Fadil Vokrri".
       Rekomandohet gjithashtu të kontaktoni stacionin e autobusëve ose të pyesni banorët vendas për informacion më të freskët në lidhje me linjat dhe oraret e autobusëve drejt stadiumit "Fadil Vokrri".</p>
    </div>
    <div className="image-containerA">
    <img src={autobus} alt="autobus.jpg"/>
    </div>
    </div>
      <Footer />
        </>

    )
}


export default Autobuset
