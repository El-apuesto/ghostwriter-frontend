import React, { useEffect, useState } from 'react';

// Global variable to track if background has been set
let backgroundSet = false;
let globalSelectedLogo = '/logo/1.PNG';

const LogoRotator = ({ className = "", alt = "Phantm.ink Logo", style = {} }) => {
  // Numbered logos 1-24 in /logo/ folder (PNG extension)
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
    "/logo/18.PNG",
    "/logo/19.PNG",
    "/logo/20.PNG",
    "/logo/21.PNG",
    "/logo/22.PNG",
    "/logo/23.PNG",
    "/logo/24.PNG"
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
      
      console.log('Global logo selected:', chosenLogo);
      setSelectedLogo(chosenLogo);
      
      // Dispatch event to notify favicon update
      window.dispatchEvent(new CustomEvent('logoSelected', { detail: { logo: chosenLogo } }));
      
      // Apply background to body only - NO MARGINS
      document.body.style.setProperty('background-image', `url(${chosenLogo})`, 'important');
      document.body.style.setProperty('background-size', '50% auto', 'important');
      document.body.style.setProperty('background-position', 'center', 'important');
      document.body.style.setProperty('background-repeat', 'no-repeat', 'important');
      document.body.style.setProperty('background-attachment', 'fixed', 'important');
      document.body.style.setProperty('background-color', 'rgba(0, 0, 0, 0.85)', 'important');
      document.body.style.setProperty('background-blend-mode', 'overlay', 'important');
      document.body.style.setProperty('min-height', '100vh', 'important');
      
      // NO EXCESSIVE MARGINS - let CSS handle it
      document.body.style.setProperty('margin', '0', 'important');
      document.body.style.setProperty('padding', '0', 'important');
      
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.style.setProperty('background', 'transparent', 'important');
        rootElement.style.setProperty('position', 'relative', 'important');
        // REMOVED EXCESSIVE MARGINS
      }
      
      console.log('Background applied to body with normal margins');
    } else {
      // Use the global logo for this instance
      setSelectedLogo(globalSelectedLogo);
      console.log('Using global logo:', globalSelectedLogo);
    }
    
    return () => {
      // Don't cleanup background on unmount - let it persist
    };
  }, []);

  return (
    <img 
      src={selectedLogo} 
      alt={alt} 
      className={className}
      style={{ 
        width: '100%',
        height: 'auto',
        maxWidth: '64px',
        ...style
      }}
      onError={(e) => {
        console.log('Logo failed to load:', selectedLogo);
        e.target.style.display = 'none';
      }}
      onLoad={() => {
        console.log('Logo loaded successfully:', selectedLogo);
      }}
    />
  );
};

export default LogoRotator;
