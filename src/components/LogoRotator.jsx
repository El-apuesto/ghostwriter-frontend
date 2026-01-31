import React, { useEffect, useState } from 'react';

const LogoRotator = ({ className = "", alt = "Phantm.ink Logo" }) => {
  // Numbered logos 1-18 in /logo/ folder (PNG extension)
  const logoFiles = [
    "/logo/1.PNG",
    "/logo/2.PNG", 
    "/logo/3.PNG",
    "/logo/4.PNG",
    "/logo/5.PNG",
    "/logo/6.PNG",
    "/logo/7.PNG",
    "/logo/8.PNG",
    "/logo/9.PNG",
    "/logo/10.PNG",
    "/logo/11.PNG",
    "/logo/12.PNG",
    "/logo/13.PNG",
    "/logo/14.PNG",
    "/logo/15.PNG",
    "/logo/16.PNG",
    "/logo/17.PNG",
    "/logo/18.PNG"
  ];
  
  // Pick one random logo and use it for both header and background
  const [selectedLogo, setSelectedLogo] = useState('');
  
  // Select logo on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * logoFiles.length);
    const chosenLogo = logoFiles[randomIndex];
    setSelectedLogo(chosenLogo);
    
    // Set background image with the same logo
    document.body.style.backgroundImage = `url(${chosenLogo})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'; // Dark overlay
    
    return () => {
      // Cleanup background when component unmounts
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.backgroundColor = '';
    };
  }, []); // Empty dependency array - only runs once on mount

  return (
    <img 
      src={selectedLogo} 
      alt={alt} 
      className={className}
      style={{ 
        width: '150%', // Make header logo 1.5x bigger (more reasonable)
        height: 'auto',
        maxWidth: '150px' // Cap the maximum size
      }}
      onError={(e) => {
        // If logo fails to load, hide it to prevent broken image
        e.target.style.display = 'none';
      }}
    />
  );
};

export default LogoRotator;
