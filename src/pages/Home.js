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
            {/* The "Browse" text should be part of the button or link */}
            <Link to="/browse">
                <button
                    id="checkForecastBtn" // ID used in the selenium test
                    style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                    }}
                >
                    Check Forecast
                </button>
            </Link>
        </div>
    );
}

export default Home;


