import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Forecast.css'; // assuming you'll put styles here or use inline

function Forecast() {
    const [condition, setCondition] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const state = params.get('state');
        const city = params.get('city');

        if (state && city) {
            fetch(`http://localhost:5000/api/forecast?state=${state}&city=${city}`)
                .then(res => res.json())
                .then(data => {
                    if (data.condition) {
                        setCondition(data.condition);
                    } else if (data.error) {
                        setError(data.error);
                    }
                })
                .catch(() => setError('Error fetching forecast.'));
        }
    }, [location.search]);

    const params = new URLSearchParams(location.search);
    const state = params.get('state');
    const city = params.get('city');

    return (
        <div className="forecast-background">
            <div className="forecast-container">
                <h2>Forecast for {city}, {state}</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {condition && <p>Weather condition: {condition}</p>}
            </div>
        </div>
    );
}

export default Forecast;
