import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
  const [activeCard, setActiveCard] = useState(null);

  const algorithms = [
    {
      name: 'ElGamal Encryption',
      route: '/elgamal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      description: 'Secure public-key cryptosystem based on discrete logarithms.',
      color: 'blue'
    },
    {
      name: 'Diffie-Hellman',
      route: '/diffie-hellman',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22v-7l-2-2V7a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v6l-2 2v7"></path>
          <circle cx="12" cy="5" r="1"></circle>
        </svg>
      ),
      description: 'Pioneering method for secure key exchange over public channels.',
      color: 'green'
    },
    {
      name: 'RSA Encryption',
      route: '/rsa',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22v-7l-2-2V7a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v6l-2 2v7"></path>
          <circle cx="12" cy="5" r="1"></circle>
          <rect x="4" y="14" width="16" height="6" rx="2"></rect>
        </svg>
      ),
      description: 'Asymmetric cryptographic algorithm for secure data transmission.',
      color: 'purple'
    }
  ];

  return (
    <div className="home-page">
      <div className="header">
        <h1 className="gradient-text">CRYPTOGRAPHY EXPLORER</h1>
        <p className="subheader">
          Explore and understand the fundamental cryptographic algorithms that secure our digital world.
        </p>
      </div>

      <div className="algorithm-grid">
        {algorithms.map((algo) => (
          <div 
            key={algo.name}
            className={`algorithm-card ${activeCard === algo.name ? 'active' : ''}`}
            onMouseEnter={() => setActiveCard(algo.name)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <a href={algo.route} className={`card-content ${algo.color}`}>
              <div className="card-background"></div>
              
              <div className="card-inner">
                <div className={`icon-wrapper ${algo.color}`}>
                  {algo.icon}
                </div>
                
                <h2 className="algorithm-name">{algo.name}</h2>
                
                <p className="algorithm-description">{algo.description}</p>
                
                <div className="explore-link">
                  <span>Explore</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;