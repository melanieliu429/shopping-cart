import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

const Shop = () => {
  const { addToCart } = useOutletContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => {
        const womensClothing = json.filter(
          (product) => product.category === "women's clothing"
        );
        setProducts(womensClothing);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div style={{ fontSize: "1.5rem" }}>
      <h1 style={{ margin: "3rem" }}>Welcome to our women's clothing catalog!</h1>
      <div className="catalog" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(550px, 1fr))", gap: "1.5rem" }}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

const ProductItem = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Make sure the image is passed with the correct key
    addToCart({ 
      id: product.id, 
      name: product.title, 
      price: product.price, 
      img: product.image, // use 'img' here to match the Cart component
      quantity 
    });
  };

  return (
    <div className="itemContainer" style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "1.5rem" }}>
      <img src={product.image} alt={product.title} style={{ width: "30rem", height: "30rem", objectFit: "cover" }} />
      <p>{product.title}</p>
      <p>${product.price.toFixed(2)}</p>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button onClick={handleDecrement} style={{ border: "none", backgroundColor: "white", fontSize: "3rem", cursor: "pointer" }}>-</button>
        <p>{quantity}</p>
        <button onClick={handleIncrement} style={{ border: "none", backgroundColor: "white", fontSize: "2rem", cursor: "pointer" }}>+</button>
      </div>
      <button onClick={handleAddToCart} className="add" style={{ fontSize: "1.25rem", padding: "1rem", border: "none", cursor: "pointer" }}>Add to Cart</button>
    </div>
  );
};

export default Shop;