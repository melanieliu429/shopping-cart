import React from 'react';
import { useOutletContext } from "react-router-dom";
import Trash from '../img/trash.svg';

const Cart = () => {
  const { cartItems, removeFromCart } = useOutletContext();

  // Calculate the total cost
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div style={{ padding: " 1rem 3rem"}}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1.5rem" }}>
            <h1>Your Shopping Cart</h1>
            <div style={{ fontWeight: "bold", fontSize: "2rem" }}>
                Total Cost: ${totalCost.toFixed(2)}
            </div>
        </div>
      {cartItems.length > 0 ? (
        <div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {cartItems.map((item, index) => (
              <li 
                key={index} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  marginBottom: "1rem",
                  padding: "1rem",
                  borderBottom: "1px solid #ccc"
                }}
              >
                <img 
                  src={item.img} 
                  alt={item.name} 
                  style={{ 
                    width: "15rem", 
                    height: "15rem", 
                    objectFit: "cover", 
                    marginRight: "2rem" 
                  }} 
                />
                <p 
                  style={{ 
                    fontSize: "2rem", 
                    flexGrow: 1 
                  }}
                >
                  {item.name} - ${item.price} x {item.quantity}
                </p>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  style={{ 
                    border: "none", 
                    backgroundColor: "transparent", 
                    cursor: "pointer",
                  }}
                >
                  <img 
                    src={Trash} 
                    alt="Trash" 
                    style={{ 
                      width: "3rem" 
                    }} 
                  />
                </button>
              </li>
            ))}
          </ul>
          
        </div>
      ) : (
        <p style={{ fontSize: "2rem" }}>Items you have added to the cart will appear here.</p>
      )}
    </div>
  );
};

export default Cart;