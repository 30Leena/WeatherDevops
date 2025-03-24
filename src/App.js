import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import WeatherData from "./Components/WeatherData";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <h1>Weather Dashboard</h1>
      <WeatherData />
      <Footer />
    </div>
  );
}

export default App;






