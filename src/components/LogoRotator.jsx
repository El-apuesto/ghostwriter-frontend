import React from 'react';

const LogoRotator = ({ className = "", alt = "Phantm.ink Logo" }) => {
  // Temporarily disabled for testing - just shows text
  return (
    <div className={className} style={{color: 'white', fontWeight: 'bold', fontSize: '1.2rem'}}>
      Phantm.ink
    </div>
  );
};

export default LogoRotator;
