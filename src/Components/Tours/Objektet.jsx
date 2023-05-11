import React, { useState } from 'react'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Autobuset.css';
import resto from '../../Assets/resto.jpg'

const Objektet = () => {
    return(
        <>
        <Navbar />


    <div className="containerA">
    <div className="text-containerA">
        <header>OBJEKTET USHQIMORE MË TË AFTËRTA PËR NJË EKSPERIENCE SA MË TË MIRË</header>
        <p>
        Ka disa opsione për fast-food ose baret që janë afër ose brenda Stadiumit Fadil Vokrri në Prishtinë. Këtu janë disa sugjerime:
      </p>
      <p>
        1.<strong>Restorant-Bar "Qebaptore"</strong> 
        <ul>
          <li>Lokacion: Rruga Mehë Uka, Prishtinë (afër Stadiumit Fadil Vokrri)</li>
          <li>Kuzhina: Qebap, ushqim tradicional kosovar</li>
          <li>Ofron ushqim shpejt dhe shërbim në stil fast-food</li>
        </ul>
      </p>
      <p>
        2. <strong>Pizza Palace</strong>
        <ul>
          <li>Lokacion: Rruga Fehmi Agani, Prishtinë (në afërsi të Stadiumit Fadil Vokrri)</li>
          <li>Kuzhina: Pizza, ushqim italiane</li>
          <li>Ofron pica të shumta dhe ushqim shpejt</li>
        </ul>
      </p>
      <p>
        3. <strong>Chill Out Bar</strong>
        <ul>
          <li>Lokacion: Rruga Fehmi Agani, Prishtinë (brenda Stadiumit Fadil Vokrri)</li>
          <li>Kuzhina: Ushqim shpejt dhe pije</li>
          <li>Ofron ambiente të këndshme për të pushuar dhe relaksuar</li>
        </ul>
      </p>
      <p>
        4. <strong>Burger King</strong>
        <ul>
          <li>Lokacion: Rruga Fehmi Agani, Prishtinë (në afërsi të Stadiumit Fadil Vokrri)</li>
          <li>Kuzhina: Hamburgere dhe ushqim shpejt</li>
          <li>Ofron një gamë të gjerë të hamburgereve dhe ushqimeve të shpejta</li>
        </ul>
      </p>
      <p>
       <em>Ju rekomandoj të kontrolloni oraret e hapjes së këtyre vendëve dhe të verifikoni informacionin aktual përkatës pasi mund të ndryshojnë. Gjithashtu, ka edhe opsione të tjera për fast-food ose baret në zonën përreth Stadiumit Fadil Vokrri në Prishtinë, kështu që gjithmonë është mirë të shikoni për mundësitë e reja që mund të jenë hapur në afërsi.</em> 
      </p>
    </div>
    <div className="image-containerB" style={{ marginTop: '100px' }}>
  <img src={resto} alt="resto.jpg" />
</div>

    </div>
      <Footer />
        </>

    )
}


export default Objektet
