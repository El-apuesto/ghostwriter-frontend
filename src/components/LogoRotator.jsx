import React, { useEffect } from 'react';

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
  
  const randomLogo = logoFiles[Math.floor(Math.random() * logoFiles.length)];

  // Set background image with 15% opacity
  useEffect(() => {
    // Create a background div that fits within the normal page
    const bgDiv = document.createElement('div');
    bgDiv.style.position = 'fixed';
    bgDiv.style.top = '0';
    bgDiv.style.left = '0';
    bgDiv.style.width = '100%'; // Normal page width
    bgDiv.style.height = '100%'; // Normal page height
    bgDiv.style.backgroundImage = `url(${randomLogo})`;
    bgDiv.style.backgroundSize = 'cover'; // Cover entire page
    bgDiv.style.backgroundPosition = 'center';
    bgDiv.style.backgroundRepeat = 'no-repeat';
    bgDiv.style.backgroundAttachment = 'fixed';
    bgDiv.style.opacity = '0.15'; // 15% opacity for background
    bgDiv.style.zIndex = '-1'; // Put behind content
    bgDiv.style.overflow = 'hidden'; // Prevent scrolling
    bgDiv.id = 'logo-background';
    
    document.body.appendChild(bgDiv);
    
    return () => {
      // Cleanup background when component unmounts
      const existingBg = document.getElementById('logo-background');
      if (existingBg) {
        existingBg.remove();
      }
    };
  }, [randomLogo]);

  return (
    <img 
      src={randomLogo} 
      alt={alt} 
      className={className}
      style={{ 
        width: '200%', // Make header logo twice as big
        height: 'auto',
        maxWidth: 'none'
      }}
      onError={(e) => {
        // If logo fails to load, hide it to prevent broken image
        e.target.style.display = 'none';
      }}
    />
  );
};

export default LogoRotator;
