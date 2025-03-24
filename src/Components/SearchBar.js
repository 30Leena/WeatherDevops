import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const handleSearch = () => {
        if (state && city) {
            onSearch(state, city);
        } else {
            alert("Please enter both State and City.");
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Enter State"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleSearch}>Get Weather</button>
        </div>
    );
};

export default SearchBar;

