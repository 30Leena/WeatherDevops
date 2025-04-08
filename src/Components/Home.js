import React, { useState } from "react";
import "../Home.css"; // Corrected import path

const Home = () => {
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setError(""); // Clear error on input
        if (name === "state") setState(value);
        if (name === "city") setCity(value);
    };

    // Function to Fetch Weather
    const fetchWeather = async (e) => {
        e.preventDefault(); // Prevent page refresh
        if (!state || !city) {
            setError("Please enter both state and city.");
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:5000/api/weather?state=${state}&city=${city}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }
            const data = await response.json();
            if (data.error) {
                setError(data.error);
                return;
            }
            setWeather(data);
            setError("");
        } catch (err) {
            setError("Could not fetch weather data. Try again later.");
            console.error(err);
        }
    };

    return (
        <div className="home-container">
            <h1>🌎 Weather Dashboard</h1>

            <form className="weather-form" onSubmit={fetchWeather}>
                <input
                    type="text"
                    name="state"
                    placeholder="Enter State"
                    value={state}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    value={city}
                    onChange={handleChange}
                />
                <button type="submit">Get Weather</button>
            </form>

            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="weather-container">
                    <h2>
                        {city}, {state}
                    </h2>
                    <p>
                        <strong>Temperature:</strong> {weather.temperature}°C
                    </p>
                    <p>
                        <strong>Condition:</strong> {weather.condition}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Home;


