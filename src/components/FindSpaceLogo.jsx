import React from 'react';

/**
 * FindSpaceLogo Component
 * Renders the custom golden House + Search logo provided by the user.
 */
export default function FindSpaceLogo({
  className = 'w-4 h-4',
  rounded = 'rounded-md',
  alt = 'Find Your Space',
  ...props
}) {
  return (
    <img
      src="/find-space-logo.png"
      alt={alt}
      className={`inline-block object-contain ${rounded} ${className}`}
      {...props}
    />
  );
}
