import React, { useEffect, useState } from 'react';

function WeatherData() {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/weather/weatherdata');
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div>
            <h2>Weather Data</h2>
            {weather.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature</th>
                            <th>Humidity</th>
                            <th>Wind Speed</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weather.map((item) => (
                            <tr key={item.weatherdataid}>
                                <td>{item.city}</td>
                                <td>{item.temperature} °C</td>
                                <td>{item.humidity} %</td>
                                <td>{item.windspeed} m/s</td>
                                <td>{item.weatherdescription}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default WeatherData;

