import React from 'react';

const LogoRotator = ({ className = "", alt = "Phantm.ink Logo" }) => {
  // Numbered logos 1-18 in /logo/ folder
  const logoFiles = [
    "/logo/1.png",
    "/logo/2.png", 
    "/logo/3.png",
    "/logo/4.png",
    "/logo/5.png",
    "/logo/6.png",
    "/logo/7.png",
    "/logo/8.png",
    "/logo/9.png",
    "/logo/10.png",
    "/logo/11.png",
    "/logo/12.png",
    "/logo/13.png",
    "/logo/14.png",
    "/logo/15.png",
    "/logo/16.png",
    "/logo/17.png",
    "/logo/18.png"
  ];
  
  const randomLogo = logoFiles[Math.floor(Math.random() * logoFiles.length)];

  return (
    <img 
      src={randomLogo} 
      alt={alt} 
      className={className}
      onError={(e) => {
        // If logo fails to load, hide it to prevent broken image
        e.target.style.display = 'none';
      }}
    />
  );
};

export default LogoRotator;
