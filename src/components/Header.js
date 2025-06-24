import React, { useEffect, useState } from 'react';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-header${scrolled ? ' scrolled' : ''}`}>
      <span className="star-icon" aria-label="star" role="img">
        {/* Cute Star SVG */}
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 3l4.09 8.26L31 12.27l-6.55 6.38L25.18 27 18 22.77 10.82 27l1.73-8.35L5 12.27l8.91-1.01L18 3z" fill="#FFD700" stroke="#FFC700" strokeWidth="2"/>
        </svg>
      </span>
      <span className="site-title">ABC Consultancy</span>
    </header>
  );
}

export default Header;
