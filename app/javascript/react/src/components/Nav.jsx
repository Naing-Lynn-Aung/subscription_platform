import React from 'react';

// Using a placeholder image for a simple box icon
const placeholderLogo = 'https://img.icons8.com/ios/50/4a90e2/box.png';

export default function Nav() {
  return (
    <div className="d-flex align-items-center py-4 ps-md-4 bg-light">
      <img 
          src={placeholderLogo} 
          alt="Subscription Platform Logo" 
          className="me-2"
          style={{ height: '30px' }}
      />
      <h4 className="fw-bold mb-0">SubscriptionPlatform</h4>
    </div>
  );
};
