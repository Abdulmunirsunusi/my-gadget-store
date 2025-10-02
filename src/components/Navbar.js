import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import '../styles.css'

function Navbar({ cartCount, user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Gadget Store</Link>
      </div>

      <div
        className={`menu-icon ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart <span className="badge">{cartCount}</span>
          </Link>
        </li>

        {user ? (
          <li>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            </li>
            <li>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
