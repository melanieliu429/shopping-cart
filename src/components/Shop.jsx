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
      <h2 style={{ margin: "3rem" }}>Welcome to our women's clothing catalog!</h2>
      <div className="catalog" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
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
    addToCart({ 
      id: product.id, 
      name: product.title, 
      price: product.price, 
      img: product.image,
      quantity 
    });
  };

  return (
    <div className="itemContainer" style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "1rem" }}>
      <img src={product.image} alt={product.title} style={{ width: "15rem", height: "15rem", objectFit: "cover" }} />
      <p>{product.title}</p>
      <p>${product.price.toFixed(2)}</p>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button onClick={handleDecrement} style={{ border: "none", backgroundColor: "white", fontSize: "2rem", cursor: "pointer" }}>-</button>
        <p>{quantity}</p>
        <button onClick={handleIncrement} style={{ border: "none", backgroundColor: "white", fontSize: "1.5rem", cursor: "pointer" }}>+</button>
      </div>
      <button onClick={handleAddToCart} className="add" style={{ fontSize: "1rem", padding: "1rem", border: "none", cursor: "pointer" }}>Add to Cart</button>
    </div>
  );
};

export default Shop;