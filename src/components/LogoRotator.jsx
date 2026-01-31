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
  const [selectedLogo, setSelectedLogo] = useState('/logo/1.PNG'); // Set initial logo
  
  // Select logo on component mount - but only set background once globally
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * logoFiles.length);
    const chosenLogo = logoFiles[randomIndex];
    console.log('Selected logo:', chosenLogo); // Debug log
    setSelectedLogo(chosenLogo);
    
    // Only set background if it hasn't been set already (check for existing background)
    if (!document.body.style.backgroundImage) {
      // Apply background directly to body element (true background)
      document.body.style.backgroundImage = `url(${chosenLogo})`;
      document.body.style.backgroundSize = 'cover'; // Cover entire page
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundAttachment = 'fixed'; // Fixed while scrolling
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'; // Dark overlay for 15% opacity effect
      console.log('Background applied to body'); // Debug log
    }
    
    // Ensure the main app container can scroll normally
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.position = 'relative';
      rootElement.style.zIndex = '1';
    }
    
    return () => {
      // Don't cleanup background on unmount - let it persist
      // Only cleanup if this is the last instance
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
        console.log('Logo failed to load:', selectedLogo); // Debug log
        // If logo fails to load, hide it to prevent broken image
        e.target.style.display = 'none';
      }}
      onLoad={() => {
        console.log('Logo loaded successfully:', selectedLogo); // Debug log
      }}
    />
  );
};

export default LogoRotator;
