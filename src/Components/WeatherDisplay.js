import React from "react";

const WeatherDisplay = ({ weather }) => {
    if (!weather) return null;

    return (
        <div className="mt-4 bg-gray-100 p-4 rounded shadow">
            <h3 className="text-xl">{weather.name}, {weather.sys.country}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
        </div>
    );
};

export default WeatherDisplay;
