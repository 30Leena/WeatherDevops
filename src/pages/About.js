import React from 'react';

function About() {
    return (
        <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
            <h2>About WeatherApp </h2>
            <p style={{ fontSize: '1.1rem' }}>
                WeatherApp is a simple weather forecasting app built with React and Node.js.
                It connects to a PostgreSQL database to show weather conditions for various cities.
            </p>
            <p style={{ marginTop: '1rem' }}>
                You can select your state and city to view live weather conditions like sunny, rainy, etc.
            </p>
        </div>
    );
}

export default About;


