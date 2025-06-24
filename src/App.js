import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import EmployeeInfoPage from './pages/EmployeeInfo';
import Navigation from './components/Navigation';
import Header from './components/Header';

import './App.css';

const headerStyle = {
  height: '2in',
  backgroundColor: '#1f2937',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url("/texture.png")',
  backgroundRepeat: 'repeat',
  backgroundSize: 'contain',
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '2px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
};

function App() {
  return (
    <Router>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<EmployeeInfoPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
