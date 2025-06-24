import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="nav-buttons">
      {currentPath !== '/' && <Link to="/" className="nav-button">Employee Info</Link>}
      {currentPath !== '/home' && <Link to="/home" className="nav-button">Home</Link>}
      {currentPath !== '/about' && <Link to="/about" className="nav-button">About</Link>}
    </div>
  );
}

export default Navigation; 