// pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'white',
            textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
        }}>
            <h1>Welcome to WeatherApp</h1>
            <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
                Get live weather updates by selecting your State and City.
            </p>
            <Link to="/browse">
                <button>Check Forecast</button>
            </Link>
        </div>
    );
}

export default Home;

