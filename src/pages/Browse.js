import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Browse() {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [error, setError] = useState('');
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
        } else {
            setCities([]);
        }
    }, [selectedState]);

    const handleForecast = () => {

        if (!selectedState && !selectedCity) {
            setError("Please select a state and a city");
        } else if (!selectedState) {
            setError("Please select a state");
        } else if (!selectedCity) {
            setError("Please select a city");
        } else {
            setError('');
            navigate(`/forecast?state=${selectedState}&city=${selectedCity}`);
        }
    };

    const handleCityChange = (e) => {

        if (!selectedState) {
            setError("Please select a state first");
            setSelectedCity('');
        } else {
            setError('');
            setSelectedCity(e.target.value);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)',
            fontFamily: 'Arial, sans-serif',
            padding: '2rem'
        }}>
            <h2 style={{ marginBottom: '2rem', color: '#333' }}>Browse Weather</h2>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ marginRight: '0.5rem' }}>State:</label>
                <select
                    id="stateDropdown"
                    name="state"
                    value={selectedState}
                    onChange={e => {
                        setSelectedState(e.target.value);
                        setError('');
                    }}
                    style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Select a state</option>
                    {states.map((s, idx) => (
                        <option key={idx} value={s.state}>{s.state}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <label style={{ marginRight: '0.5rem' }}>City:</label>
                <select
                    id="cityDropdown"
                    name="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                    style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Select a city</option>
                    {cities.map((c, idx) => (
                        <option key={idx} value={c.city}>{c.city}</option>
                    ))}
                </select>
            </div>

            {error && (
                <div id="formError" style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <button
                id="checkForecastBtn"
                onClick={handleForecast}
                style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                }}
            >
                Get Forecast
            </button>
        </div>
    );
}

export default Browse;
