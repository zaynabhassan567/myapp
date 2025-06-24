import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './EmployeeCard.css';

const JOKE_API = 'https://official-joke-api.appspot.com/random_joke';

const EmployeeCard = ({ employee, onDelete }) => {
  const [showContact, setShowContact] = useState(false);
  const [showJoke, setShowJoke] = useState(false);
  const [joke, setJoke] = useState(null);
  const [loadingJoke, setLoadingJoke] = useState(false);
  
  const position = employee.position || 'Software Engineer';

  useEffect(() => {
    if (showJoke) {
      setLoadingJoke(true);
      axios.get(JOKE_API)
        .then(res => {
          setJoke(res.data);
          setLoadingJoke(false);
        })
        .catch(() => {
          setJoke({ setup: 'Failed to fetch joke.', punchline: '' });
          setLoadingJoke(false);
        });
    }
  }, [showJoke]);

  return (
    <div className="employee-card">
      <button className="delete-btn" onClick={onDelete} aria-label="Delete employee">❌</button>
      <img src={employee.image} alt={employee.name} className="employee-image" />
      <div className="employee-overlay compact-overlay">
        <div className="overlay-main-content">
          <h2 className="emp-name">{employee.name}</h2>
          <div className="emp-pos">{position}</div>
          <p className="emp-id"><span role="img" aria-label="ID">🆔</span> <strong>ID:</strong> {employee.id}</p>
          <button className="contact-btn icon-btn" onClick={() => setShowContact((v) => !v)} aria-label="Contact">
            {showContact ? '✖️' : '📞'}
          </button>
          {showContact && (
            <div className="contact-info compact-contact-info">
              <p><span role="img" aria-label="Phone">📞</span> <strong>Phone:</strong> <span className="emp-phone">{employee.phone}</span></p>
              <p><span role="img" aria-label="Email">✉️</span> <strong>Email:</strong> <span className="emp-email">{employee.email}</span></p>
            </div>
          )}
        </div>
        <div className="overlay-bottom">
          <button className="joke-btn" onClick={() => setShowJoke(true)} aria-label="Show joke">Their Fav Joke</button>
          {showJoke && (
            <div className="joke-popup">
              <button className="close-joke-btn" onClick={() => setShowJoke(false)} aria-label="Close joke">✖️</button>
              {loadingJoke ? (
                <div className="joke-loading">Loading joke...</div>
              ) : (
                <div className="joke-text">
                  <div>{joke?.setup}</div>
                  <div style={{marginTop:'6px', fontWeight:'bold'}}>{joke?.punchline}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
