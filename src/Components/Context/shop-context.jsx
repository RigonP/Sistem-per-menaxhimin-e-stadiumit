// // shop-context.js
// import React, { createContext, useState } from 'react';
//
// export const ShopContext = createContext();
//
// export const ShopContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState({});
//
//   const addToCart = (productId) => {
//     setCartItems((prevCartItems) => ({
//       ...prevCartItems,
//       [productId]: (prevCartItems[productId] || 0) + 1,
//     }));
//   };
//
//   const removeFromCart = (productId) => {
//     setCartItems((prevCartItems) => {
//       const updatedCartItems = { ...prevCartItems };
//       if (updatedCartItems[productId] > 0) {
//         updatedCartItems[productId] -= 1;
//       }
//       return updatedCartItems;
//     });
//   };
//
//   const clearCart = () => {
//     setCartItems({});
//   };
//
//   return (
//     <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </ShopContext.Provider>
//   );
// };
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // import React, { createContext, useState } from 'react';
// // import { PRODUCTS } from '../FilterKits/productsdata';
//
// // export const ShopContext = createContext({
// //   cartItems: {},
// //   addToCart: () => {},
// // });
//
// // const getDefaultCart = () => {
// //   let cart = {};
// //   PRODUCTS.forEach((product) => {
// //     cart[product.id] = 0;
// //   });
// //   return cart;
// // };
//
//
// // // const getDefaultCart = () => {
// // //   let cart = {};
// // //   for(let i=0; i<PRODUCTS.length + 1 ; i++){
// // //     cart[i] = 0;
// // //   }
// // //   return cart;
// // // };
//
//
// // export const ShopContextProvider = (props) => {
// //   const [cartItems, setCartItems] = useState(getDefaultCart());
//
// //   // const addToCart = (itemId) => {
// //   //   const product = PRODUCTS.find((product) => product.id === itemId);
// //   //   console.log("Adding product to cart:", product);
// //   //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
// //   // };
//
// //   const addToCart = (productId) => {
// //     setCartItems((prevCartItems) => ({
// //       ...prevCartItems,
// //       [productId]: (prevCartItems[productId] || 0) + 1,
// //     }));
// //   };
//
//
// //   const removeFromCart = (itemId) => {
// //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
// //   };
//
// //   const contextValue = { cartItems, addToCart, removeFromCart };
//
// //   console.log(cartItems);
//
// //   return (
// //     <ShopContext.Provider value={contextValue}>
// //       {props.children}
// //     </ShopContext.Provider>
// //   );
// // };
//
// // export default ShopContext;
