import React, { useState } from 'react';
import Navigation from "./components/Navigation";
import { Outlet } from "react-router-dom";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <Navigation cartItems={cartItems} />
      <Outlet context={{ cartItems, addToCart, removeFromCart }} />
    </div>
  );
};

export default App;