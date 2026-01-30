import React, { useState, useEffect } from 'react';

const LogoRotator = ({ className = "", alt = "Phantm.ink Logo" }) => {
  const [currentLogo, setCurrentLogo] = useState(null);
  
  // Array of logo filenames - add your logos here
  const logos = [
    "/logo.png.PNG",
    "/logo2.png",
    "/logo3.png", 
    "/logo4.png",
    "/logo5.png",
    "/logo6.png",
    "/logo7.png",
    "/logo8.png"
  ];

  useEffect(() => {
    // Get a random logo on component mount
    const randomIndex = Math.floor(Math.random() * logos.length);
    setCurrentLogo(logos[randomIndex]);
  }, []);

  // Fallback if no logo is selected
  const logoSrc = currentLogo || "/logo.png.PNG";

  return (
    <img 
      src={logoSrc} 
      alt={alt} 
      className={className}
      onError={(e) => {
        // Fallback to default logo if selected logo fails to load
        e.target.src = "/logo.png.PNG";
      }}
    />
  );
};

export default LogoRotator;
