import React from 'react';
import Navigation from '../components/Navigation';

function Home() {
  return (
    <div className="home-page">
      <section className="welcome-banner">
        <h1>Welcome to the Home Page</h1>
      </section>
      <Navigation />
      {/* Add your Home page content here */}
    </div>
  );
}

export default Home;
