<<<<<<< HEAD
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Forecast from './pages/Forecast';
import About from './pages/About';
import Header from './components/Header';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    );
=======
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
>>>>>>> e870f4649f5ac3480b9b4f9521362c9850386fcc
}

export default App;






<<<<<<< HEAD


=======
>>>>>>> e870f4649f5ac3480b9b4f9521362c9850386fcc
