import React, { useState, useEffect } from 'react';

const LogoRotator = ({ className = "", alt = "Phantm.ink Logo" }) => {
  const [currentLogo, setCurrentLogo] = useState(null);
  
  // Array of logo filenames in the /logos/ folder
  // Add your exact filenames here - any names work!
  const logos = [
    "/logos/your-logo-name-1.png",
    "/logos/phantm-dark.png",
    "/logos/logo-variant-3.jpg", 
    "/logos/fourth-logo.svg",
    "/logos/fifth-design.png"
    // Add as many as you want!
  ];

  useEffect(() => {
    // Get a random logo on component mount
    const randomIndex = Math.floor(Math.random() * logos.length);
    setCurrentLogo(logos[randomIndex]);
  }, []);

  // Fallback if no logo is selected
  const logoSrc = currentLogo || "/logos/your-logo-name-1.png";

  return (
    <img 
      src={logoSrc} 
      alt={alt} 
      className={className}
      onError={(e) => {
        // Fallback to default logo if selected logo fails to load
        e.target.src = "/logos/your-logo-name-1.png";
      }}
    />
  );
};

export default LogoRotator;
