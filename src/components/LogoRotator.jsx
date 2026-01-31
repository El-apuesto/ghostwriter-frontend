import React, { useEffect, useState } from 'react';

// Global variable to track if background has been set
let backgroundSet = false;
let globalSelectedLogo = '/logo/1.PNG';

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
  
  // Use global selected logo for consistency
  const [selectedLogo, setSelectedLogo] = useState(globalSelectedLogo);
  
  // Select logo on component mount - but only set background once globally
  useEffect(() => {
    // Only set background if it hasn't been set already
    if (!backgroundSet) {
      const randomIndex = Math.floor(Math.random() * logoFiles.length);
      const chosenLogo = logoFiles[randomIndex];
      globalSelectedLogo = chosenLogo;
      backgroundSet = true;
      
      console.log('Global logo selected:', chosenLogo); // Debug log
      setSelectedLogo(chosenLogo);
      
      // Apply background using CSS classes for better control
      document.body.classList.add('logo-background');
      document.body.style.setProperty('--logo-image', `url(${chosenLogo})`);
      console.log('Background CSS class applied globally'); // Debug log
    } else {
      // Use the global logo for this instance
      setSelectedLogo(globalSelectedLogo);
      console.log('Using global logo:', globalSelectedLogo); // Debug log
    }
    
    return () => {
      // Don't cleanup background on unmount - let it persist
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
