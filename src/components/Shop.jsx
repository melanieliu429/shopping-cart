import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import Hoodie from '../img/hoodie.png';
import Top from '../img/top.png';
import Sweatpants from '../img/sweatpants.png';
import Zipup from '../img/zipup.png';

const Shop = () => {
  const { addToCart } = useOutletContext();

  const products = [
    { id: 1, name: 'CHRISTY HOODIE', price: 42, img: Hoodie },
    { id: 2, name: 'CASEY TOP', price: 24, img: Top },
    { id: 3, name: 'AUTUMN TIE SWEATPANTS', price: 35, img: Sweatpants },
    { id: 4, name: 'CHRISTY NEW YORK HOODIE', price: 48, img: Zipup }
  ];

  return (
    <div style={{ fontSize: "1.5rem"}}>
      <h1 style={{ margin: "3rem"}}>Welcome to our catalog!</h1>
      <div className="catalog" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(550px, 1fr))" }}>
      {products.map(product => (
        <ProductItem key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
    </div>
  );
};

const ProductItem = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="itemContainer" style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "1.5rem" }}>
      <img src={product.img} alt={product.name} style={{ width: "30rem", height: "30rem", objectFit: "cover" }} />
      <p>{product.name}</p>
      <p>${product.price}</p>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button onClick={handleDecrement} style={{ border: "none", backgroundColor: "white", fontSize: "3rem", cursor: "pointer" }}>-</button>
        <p>{quantity}</p>
        <button onClick={handleIncrement} style={{ border: "none", backgroundColor: "white", fontSize: "2rem", cursor: "pointer" }}>+</button>
      </div>
      <button onClick={handleAddToCart} className="add" style={{ fontSize: "1.25rem", padding: "1rem", border: "none", cursor: "pointer"}}>Add to Cart</button>
    </div>
  );
};

export default Shop;