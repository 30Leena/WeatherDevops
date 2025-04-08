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
}

export default App;








