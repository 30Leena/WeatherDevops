import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h1> Welcome to WeatherApp</h1>
            <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
                Get live weather updates by selecting your State and City.
            </p>
            <Link to="/browse">
                <button style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px'
                }}>
                    Check Forecast
                </button>
            </Link>
        </div>
    );
}

export default Home;


