import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import HeroSection from './HeroSection';


function App() {
  return (
     
     <Router>
            <Routes>
                
                <Route path="/" element= {<LandingPage />} />
                <Route path="/hero" element={<HeroSection />} />
               {/* <Route path="/register" element={<Register />} /> */} 
                
                 
                 
            </Routes>
        </Router>


        
       
       
        
  );
}

export default App;
