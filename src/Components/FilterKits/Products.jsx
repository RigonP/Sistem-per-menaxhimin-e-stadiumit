import React , {useState} from 'react'




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




const data = [
  {
    id: 1,
    image: require ('../../images/aliti-both.webp'),
    title: 'Aliti Home Kit',
    price: '40.00$',
    color: 'red',
    size: 'L',
    matchwear: 'Defender'
  },
  {
    id: 2,
    image: muriqiboth,
    title: 'Muriqi Home Kit',
    price: '70.00$',
    color: 'blue',
    size: 'XS,S,M,XL,',
    matchwear: 'Attacker'
  },
  {
    id: 3,
    image: celinaboth,
    title: 'Celina Home Kit',
    price: '60.00$',
    color: 'black',
    size:'M,L,XL',
    matchwear: 'Midfielder'
  },
  {
    id: 4,
    image: vojvodaboth,
    title: 'Vojvoda Home Kit',
    price: '50.00$',
    color: 'red',
    size:'M,XL',
    matchwear: 'Defender'
  },
];

const ProductFilter = () => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMatchWear, setSelectedMatchWear] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleColorFilter = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    filterProducts(color, selectedSize,selectedMatchWear, selectedSortBy);
  };

  const handleSizeFilter = (event) => {
    const size = event.target.value;
    setSelectedSize(size);
    filterProducts(selectedColor, size, selectedMatchWear, selectedSortBy);
  };

  const handleMatchWearFilter = (event) => {
  const matchwear = event.target.value;
  setSelectedMatchWear(matchwear);
  filterProducts(selectedColor, selectedSize , matchwear, selectedSortBy);
  }

  const handleSortByFilter = (event) => {
   const sortBy = event.target.value;
   setSelectedSortBy(sortBy);
   filterProducts(selectedColor, selectedSize, selectedMatchWear, sortBy);
  }



 const filterProducts = (color, size, matchwear, sortBy) => {
   let sortedProducts = [...data];
   if (sortBy === 'lowesthighest') {
     sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
   } else if (sortBy === 'highestlowest') {
     sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
   } else if (sortBy === 'atoz') {
     sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
   } else if (sortBy === 'ztoa') {
     sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
   }

   const filteredProducts = sortedProducts.filter((product) => {
     if (color === '' && size === '' && matchwear === '') {
       return true;
     }
     if (color === '') {
       return product.size.includes(size) && product.matchwear.includes(matchwear);
     }
     if (size === '') {
       return product.color === color && product.matchwear.includes(matchwear);
     }
     if (matchwear === '') {
       return product.color === color && product.size.includes(size);
     }
     return (
       product.color === color &&
       product.size.includes(size) &&
       product.matchwear.includes(matchwear)
     );
   });



    setFilteredData(filteredProducts);
  };



return (
  <div>
    <div className='container filter-options'>
    <select class="btn btn-lg btn-outline-dark buton1" id="color-filter"
    value={selectedSize}
    onChange={handleSizeFilter}
    >
                <option value="">Size</option>
                <option value="XXL">XXL</option>
                <option value="XL">XL</option>
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="S">S</option>
                <option value="XS">XS</option>
      </select>
    <select
      className="btn btn-lg btn-outline-dark buton2"
      id="color-filter"
      value={selectedColor}
      onChange={handleColorFilter}
    >
      <option value="">Color</option>
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="black">Black</option>
    </select>
    <select class="btn btn-lg btn-outline-dark buton3" id="color-filter"
    value={selectedMatchWear}
    onChange={handleMatchWearFilter}
    >
        <option value="">Matchwear</option>
        <option value="GoalKeeper">GoalKeeper</option>
        <option value="Defender">Defender</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Attacker">Attacker</option>
    </select>
    <select class="btn btn-lg btn-outline-dark buton4" id="color-filter"
    value={selectedSortBy}
    onChange={handleSortByFilter}
    >
                    <option value="">Sort By</option>
                    <option value="bestseller">Best Seller</option>
                    <option value="lowesthighest">Lowest to Highest</option>
                    <option value="highestlowest">Highest to Lowest</option>
                    <option value="atoz">Alphabetically A-Z</option>
                    <option value="ztoa">Alphabetically Z-A</option>
                </select>
    </div>

    <div className="container snap-scroll-container">
      <div className="row">
        {filteredData.map((product) => (
          <div className="col-md-3" key={product.id}>
            <div className={`d-inline-block mx-10 card card-style-${product.id}`}>
              <img className="snap-scroll-images" src={product.image} alt="Product" />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.price}</p>
                <button className="btn btn-outline-light">Buy now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default ProductFilter;


























{/* <div class="container snap-scroll-container">
        <div class="row">
          <div class="col-md-3">
              <div class="d-inline-block mx-10 card card-style-1">
                <img class="snap-scroll-images" src={alitiboth} alt="Image 1"/>
                <div class="card-body">
                  <h5 class="card-title">Aliti Home Kit</h5>
                  <p class="card-text">50.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
            </div>  
        </div>
        <div class="col-md-3">
              <div class="d-inline-block mx-10 card card-style-2">
                <img class="snap-scroll-images" src={muriqiboth} alt="Image 1"/>
                <div class="card-body">
                  <h5 class="card-title">Aliti Home Kit</h5>
                  <p class="card-text">50.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
            </div>  
        </div>
        <div class="col-md-3">
              <div class="d-inline-block mx-10 card card-style-4">
                <img class="snap-scroll-images" src={celinaboth} alt="Image 1"/>
                <div class="card-body">
                  <h5 class="card-title">Aliti Home Kit</h5>
                  <p class="card-text">50.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
            </div>  
        </div>
        <div class="col-md-3">
              <div class="d-inline-block mx-10 card card-style-5">
                <img class="snap-scroll-images" src={vojvodaboth} alt="Image 1"/>
                <div class="card-body">
                  <h5 class="card-title">Aliti Home Kit</h5>
                  <p class="card-text">50.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
            </div>  
        </div>
      </div>
    </div> */}