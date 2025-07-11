import React from 'react';

const mediaImages = [
  '/media1.jpg',
  '/media2.jpg',
  '/media3.jpg',
  '/media4.jpg',
  '/media5.jpg'
];

const LandingPage = ({ onToggleTheme, isDarkMode }) => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <ul>
          <li><a href="#">Manifesto</a></li>
          <li><a href="#">Careers</a></li>
          <li><button className="nav-btn">Sign In</button></li>
          <li><button className="nav-btn primary">Join waitlist</button></li>
        </ul>
      </nav>

      <div className="hero">
        <h1 className="logo">JAMSYNC</h1>
        <p className="subtitle">
          A real-time music collaboration tool for <span className="tag">creators</span>
        </p>
      </div>

      <div className="media-orbit">
        {mediaImages.map((src, i) => (
          <img
            key={i}
            src={src}
            className="media-float"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDuration: `${30 + Math.random() * 30}s`
            }}
            alt="floating"
          />
        ))}
      </div>

      <div className="theme-toggle">
        <button onClick={onToggleTheme} className="toggle-btn">{isDarkMode ? 'Light' : 'Dark'}</button>
      </div>

      <div className="scroll-hint">Scroll to explore</div>
    </div>
  );
};

export default LandingPage;
