import React, { useState, useEffect } from 'react';

const LogoRotator = ({ className = "", alt = "Phantm.ink Logo" }) => {
  const [currentLogo, setCurrentLogo] = useState(null);
  
  // Predefined list of common logo file patterns to check
  // The system will try these patterns to find logos in the folder
  const logoPatterns = [
    "/logos/logo.png",
    "/logos/logo1.png",
    "/logos/logo2.png",
    "/logos/logo3.png",
    "/logos/logo4.png",
    "/logos/logo5.png",
    "/logos/logo6.png",
    "/logos/logo7.png",
    "/logos/logo8.png",
    "/logos/logo9.png",
    "/logos/logo10.png",
    "/logos/logo11.png",
    "/logos/logo12.png",
    "/logos/logo13.png",
    "/logos/logo14.png",
    "/logos/logo15.png",
    "/logos/logo16.png",
    "/logos/logo17.png",
    "/logos/logo18.png",
    "/logos/logo19.png",
    "/logos/logo20.png",
    "/logos/phantm.png",
    "/logos/phantm-1.png",
    "/logos/phantm-2.png",
    "/logos/phantm-3.png",
    "/logos/phantm-4.png",
    "/logos/phantm-5.png",
    "/logos/dark-logo.png",
    "/logos/light-logo.png",
    "/logos/main-logo.png",
    "/logos/brand.png",
    "/logos/icon.png",
    "/logos/logo-a.png",
    "/logos/logo-b.png",
    "/logos/logo-c.png",
    "/logos/variant-1.png",
    "/logos/variant-2.png",
    "/logos/variant-3.png",
    "/logos/style-1.png",
    "/logos/style-2.png",
    "/logos/style-3.png",
    // iPhone IMG_ format patterns
    "/logos/IMG_0001.png",
    "/logos/IMG_0002.png",
    "/logos/IMG_0003.png",
    "/logos/IMG_0004.png",
    "/logos/IMG_0005.png",
    "/logos/IMG_1000.png",
    "/logos/IMG_2000.png",
    "/logos/IMG_3000.png",
    "/logos/IMG_4000.png",
    "/logos/IMG_5000.png",
    "/logos/IMG_6000.png",
    "/logos/IMG_7000.png",
    "/logos/IMG_8000.png",
    "/logos/IMG_8459.png",
    "/logos/IMG_8460.png",
    "/logos/IMG_8461.png",
    "/logos/IMG_8462.png",
    "/logos/IMG_8463.png",
    "/logos/IMG_8464.png",
    "/logos/IMG_8465.png",
    "/logos/IMG_9000.png",
    "/logos/IMG_9999.png"
  ];

  useEffect(() => {
    // Filter to only existing logos by testing each one
    const checkLogos = async () => {
      const existingLogos = [];
      
      for (const logoPath of logoPatterns) {
        try {
          const response = await fetch(logoPath, { method: 'HEAD' });
          if (response.ok) {
            existingLogos.push(logoPath);
          }
        } catch (error) {
          // File doesn't exist, skip it
        }
      }
      
      if (existingLogos.length > 0) {
        const randomIndex = Math.floor(Math.random() * existingLogos.length);
        setCurrentLogo(existingLogos[randomIndex]);
      }
    };
    
    checkLogos();
  }, []);

  // Fallback if no logo is found
  const logoSrc = currentLogo || "/logos/logo.png";

  return (
    <img 
      src={logoSrc} 
      alt={alt} 
      className={className}
      onError={(e) => {
        // If logo fails to load, try the next one or show fallback
        const fallbackIndex = Math.floor(Math.random() * logoPatterns.length);
        e.target.src = logoPatterns[fallbackIndex];
      }}
    />
  );
};

export default LogoRotator;
