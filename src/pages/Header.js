// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional: move navbar styles here

function Header() {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/browse">Browse</Link>
            <Link to="/forecast">Forecast</Link>
            <Link to="/about">About</Link>
        </div>
    );
}

export default Header;
