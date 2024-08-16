import React from 'react';
import { Link } from "react-router-dom";
import brandLogo from '../img/logo.svg';
import cartIcon from '../img/cart.svg';

const Navigation = ({ cartItems }) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "lightBlue", fontSize: "1.5rem", padding: "0 3rem" }}>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <img src={brandLogo} alt="Logo" style={{ width: "3rem" }} />
        <h2>Berries and Cream</h2>
      </div>
      
      <ul style={{ listStyleType: "none", display: "flex", gap: "2rem", alignItems: "center" }}>
        <li>
          <h2>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
          </h2>
        </li>
        <li>
          <h2>
            <Link to="/shop" style={{ textDecoration: "none", color: "inherit" }}>
              Shop
            </Link>
          </h2>
        </li>
        <li style={{ position: "relative" }}>
          <h2>
            <Link to="/cart" style={{ textDecoration: "none", color: "inherit", position: "relative" }}>
              <img src={cartIcon} alt="Cart Icon" style={{ width: "3rem" }} />
              {totalItems > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-0.5rem",
                  right: "-0.5rem",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "0.2rem 0.5rem",
                  fontSize: "1rem"
                }}>
                  {totalItems}
                </span>
              )}
            </Link>
          </h2>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;