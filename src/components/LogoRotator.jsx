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
    
    // Create a background logo same size as header (not full page)
    const bgDiv = document.createElement('div');
    bgDiv.style.position = 'fixed';
    bgDiv.style.top = '50%';
    bgDiv.style.left = '50%';
    bgDiv.style.transform = 'translate(-50%, -50%)';
    bgDiv.style.width = '150px'; // Same max size as header
    bgDiv.style.height = 'auto';
    bgDiv.style.backgroundImage = `url(${chosenLogo})`;
    bgDiv.style.backgroundSize = 'contain';
    bgDiv.style.backgroundPosition = 'center';
    bgDiv.style.backgroundRepeat = 'no-repeat';
    bgDiv.style.opacity = '0.15'; // 15% opacity
    bgDiv.style.zIndex = '-1'; // Behind content
    bgDiv.style.pointerEvents = 'none'; // Don't interfere with clicks
    bgDiv.id = 'logo-background';
    
    document.body.appendChild(bgDiv);
    
    // Ensure the main app container can scroll normally
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.position = 'relative';
      rootElement.style.zIndex = '1';
    }
    
    return () => {
      // Cleanup background when component unmounts
      const existingBg = document.getElementById('logo-background');
      if (existingBg) {
        existingBg.remove();
      }
      
      // Reset root element styles
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.style.position = '';
        rootElement.style.zIndex = '';
      }
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
