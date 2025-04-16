import React from 'react';

function About() {
    return (
        <div
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1521801832997-3fbd9929ab79?auto=format&fit=crop&w=1740&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Arial, sans-serif',
                color: '#ffffff',
                textShadow: '1px 1px 6px rgba(0,0,0,0.8)',
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '2rem',
                    borderRadius: '15px',
                    maxWidth: '700px',
                    width: '100%',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                }}
            >
                <h2
                    style={{
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        textAlign: 'center',
                    }}
                >
                    About WeatherApp
                </h2>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                    WeatherApp is a user-friendly weather forecasting platform built using React for the
                    frontend and Node.js for the backend. It fetches live weather conditions from a PostgreSQL
                    database for various cities across different states.
                </p>
                <p style={{ fontSize: '1.2rem', marginTop: '1rem', lineHeight: '1.6' }}>
                    Simply choose your state and city to instantly view the latest weather conditions like
                    sunny, rainy, cloudy, and more.
                </p>
            </div>
        </div>
    );
}

export default About;
