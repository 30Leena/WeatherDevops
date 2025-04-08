import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Browse() {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/states')
            .then(res => res.json())
            .then(data => setStates(data))
            .catch(err => console.error('Failed to fetch states:', err));
    }, []);

    useEffect(() => {
        if (selectedState) {
            fetch(`http://localhost:5000/api/cities?state=${selectedState}`)
                .then(res => res.json())
                .then(data => setCities(data))
                .catch(err => console.error('Failed to fetch cities:', err));
        }
    }, [selectedState]);

    const handleForecast = () => {
        if (selectedState && selectedCity) {
            navigate(`/forecast?state=${selectedState}&city=${selectedCity}`);
        }
    };

    return (
        <div>
            <h2>Browse Weather</h2>
            <label>State: </label>
            <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
                <option value="">Select a state</option>
                {states.map((s, idx) => (
                    <option key={idx} value={s.state}>{s.state}</option>
                ))}
            </select>

            <label> City: </label>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                <option value="">Select a city</option>
                {cities.map((c, idx) => (
                    <option key={idx} value={c.city}>{c.city}</option>
                ))}
            </select>

            <button onClick={handleForecast}>Get Forecast</button>
        </div>
    );
}

export default Browse;














