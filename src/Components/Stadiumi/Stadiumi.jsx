import React, { useState } from 'react'; 
import './StadiumiStyle.css'
import { FaSearchLocation } from 'react-icons/fa';
import { FaRegAddressBook } from 'react-icons/fa';
import { FaLaptop } from 'react-icons/fa';
import myImage1 from "./kos-his.jpg";
import myImage2 from "./kos-his2.jpg";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from "react-router-dom";
const Stadiumi = () => {
    return(
        <>
        <Navbar />
        <div class="hero">
		    <div class="hero-inner">
			<h1>KOSOVO STADIUM</h1>
			<p>Një vendtakim i kampionëve dhe histori e ndeshjeve të përjetshme në Prishtinë</p>
			<Link to="/tiketat" className='tiketButon'>
            BLEJ TIKETA
        </Link>
		</div>
        </div>

        <div className="containerContact">
      <div className="cardContact">
      <FaSearchLocation className="FaSearchLocation" />
        <h2>Adresa</h2><br></br>
        <p>
        Rruga “28 Nëntori”, nr. 171<br></br><br></br>
        Prishtinë / Kosovë 10000
        </p>
      </div>
      <div className="cardContact">
      <FaRegAddressBook className="FaRegAddressBook" />
        <h2>Administrata</h2><br></br>
        <p>
        Tel: +383 38 600 220<br></br><br></br>
        Fax: +383 38 548 560<br></br><br></br>
        E-mail: info@ffk-kosova.com
        </p>
      </div>
      <div className="cardContact">
      <FaLaptop className="FaLaptop" />
        <h2>Zyra per Media</h2><br></br>
        <p>
        Tel: +383 48 101 333<br></br><br></br>
        E-mail: press@ffk-kosova.com<br></br><br></br>
        E-mail: makibajrami@ffk-kosova.com
        </p>
      </div>
      
    </div>

    <div className="container1">
      <div className="contact-info">
        <h4>Kontakti për edukimin e trajnerëve :</h4>
        <p>departamentiteknik@ffk-kosova.com</p>
        <h4>Kontaktet me ekipet Kombëtare :</h4>
        <p>Kombëtarja U-15 e-mail:<b>  u-15@ffk-kosova.com</b></p>
        <p>Kombëtarja U-17 e-mail:<b>  u-17@ffk-kosova.com</b></p>
        <p>Kombëtarja U-19 e-mail:<b>  u-19@ffk-kosova.com</b></p>
        <p>Kombëtarja U-21 e-mail:<b>  u-21@ffk-kosova.com</b></p>
        <p>Kombëtarja Femrat e-mail:<b>  perfaqesuesjafemrat@ffk-kosova.com</b></p>
        <p>Kombëtarja Futsall e-mail:<b>  futsall@ffk-kosova.com</b></p>
      </div>
    </div>
    <div className="HeaderHis">
    <h1 >Historiku i FFK-së</h1>
    </div>
    <div className="container2">
    <div className="image-container">
    <img src={myImage1} alt="kos-his1"/>
    </div>
    <div className="image-container">
    <img src={myImage2} alt="kos-his2"/>
    </div>
    <div className="text-container">
        <p>
        Federata e Futbollit e Kosovës u themelua si institucion i pavarur i Republikës së Kosovës, më 20 gusht të vitit 1991, në një periudhë shumë të vështirë, kur vendi ishte okupuar nga regjimi i egër serbo-sllav.
        Futbolli në Kosovë para kësaj date ishte zhvilluar nën organizimin e Lidhjes së Futbollit të Kosovës, që ishte pjesë e barabartë me Lidhjet e tjera të Futbollit në Federatën e Jugosllavisë dhe që funksiononte që nga viti 1948.
        Por, periudha e shpërbërjes së Jugosllavisë me nisjen e luftës në fillim vitet e 90-ta dhe instalimi i masave të dhunshme nga Serbia në çdo lëmi të jetës në Kosovë, e goditi edhe futbollin, kur nga stadiumet u dëbuan të gjitha ekipet shqiptare.
        Të ndodhur në një situatë okupuese e përjashtuese, në gusht të vitit 1991 njerëzit e futbollit në Kosovë vendosën që përkundër rrethanave të vështira ta ndërmarrin hapin e guximshëm – themelimin e Federatës së Futbollit të Kosovës dhe fillimin e garave në tërë vendin, ndonëse në pa mundësi të shfrytëzimit të stadiumeve të futbollit, në të cilat ishin instaluar klubet serbe.
        Kuvendi konstituiv i FFK-së, të cilit i paraprinë shumë takime sensibilizuese nëpër qytete të ndryshme, u mbajt në shkollën fillore “Asim Vokshi” në lagjen Kodra e Trimave në Prishtinë, derisa drejtimin e këtij institucioni me vota unanime të delegatëve e mori punëtori i dalluar sportiv nga Prizreni, Agim Bytyqi. Ndërkohë, vetëm disa javë më vonë, saktësisht më 13 shtator, filloi edhe kampionati i parë i futbollit të pavarur të Kosovës, me ndeshjen ndërmjet dy rivalëve të kryeqytetit, Flamurtarit dhe Prishtinës.
        Liga e parë e Kosovës në kampionatin e parë numëronte 20 skuadra, ndërsa ligat tjera varësisht nga Regjionet, por ndeshjet luheshin në kushte shumë të vështira nëpër fusha të improvizuara, ku shumë familje i kishin dhuruar tokat e tyre për t’i shndërruar në fusha futbolli, vetëm e vetëm që futbolli të luhej dhe të rinjtë ta zhvillonin talentin e tyre.
        Edhe në këto rrethana futbolli luhej sipas rregullave të UEFA-s dhe FIFA-s, dhe çdo ndryshim i rregullave të tyre menjëherë aplikohej në sistemin e garave tona.
        Gjatë kësaj periudhe maltretimet, burgosjet, rrahjet ndaj zyrtarëve, trajnerëve dhe futbollistëve nga pushtuesi serb ishin të pranishme po thuajse çdo javë, por motivi për të vazhduar tutje ishte i madh, ngase të gjithë besonin se herët a vonë kjo sakrificë dhe rezistencë ndaj pushtuesit do të sillte ditë të mira për futbollin në Kosovë.
        Garat në kushte të tilla vazhduan deri në janar të vitit 1998, kur filloi lufta në Kosovë dhe kur shumë futbollistë u rreshtuan në UÇK në misionin e çlirimit të vendit. Si rrjedhojë u ndal çdo aktivitet deri pas çlirimit të vendit.
        Menjëherë pas përfundimit të luftës në Kosovë më 1999, Federata e Futbollit e Kosovës u riorganizua me të gjitha organet e saj, derisa klubet u rikthyen në objektet e stadiumeve, të cilat ishin në gjendje të mjerë për shkak të mos investimeve për thuajse një dekadë nga okupuesit. Futbolli në vitet e para të pasluftës ishte në ekspansion, por më pas pamundësia për t’u anëtarësuar në UEFA e FIFA dhe shpenzimi i madh i donatorëve për t’i mbajtur klubet bëri që futbolli shpeshherë të kalojë në faza të vështira të mbijetesës.
        Megjithatë, pas shumë peripecive, sakrificave të shumë gjeneratave, në fund Federata e Futbollit e Kosovës, më 3 maj të vitit 2016 arriti ta finalizojë misionin e nisur më 20 gusht të vitit 1991, duke u  anëtarësuar në UEFA, derisa më pas më 13 maj të njëjtit vit u anëtarësua edhe në FIFA. Kjo periudhë vlerësohet edhe si më e rëndësishmja për FFK-në, pasi nga këtu mori hov zhvillimi i mëtejmë i futbollit të Kosovës në të gjitha aspektet. Kombëtarja e Kosovës u bë pjesë e kualifikimeve për Evropian dhe Botëror, derisa klubet kosovare filluan garimin në kupat evropiane, që ishte ëndrra e të gjithë atyre që ishin pjesë dhe kontribuuan për futbollin e Kosovës.
        </p>
      </div>
    </div>
      <Footer />
        </>

    )
}


export default Stadiumi
