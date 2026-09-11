import React from 'react';

/**
 * HouseSearchLogo
 * Custom gold brand logo featuring a house with a magnifying glass search emblem,
 * matching the user's requested brand emblem for "Find Your Space" and coliving discovery.
 */
export default function HouseSearchLogo({
  className = 'w-5 h-5',
  withBadge = false,
  badgeClassName = 'w-8 h-8',
  style = {},
  ...props
}) {
  const svgContent = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={withBadge ? 'w-full h-full' : className}
      style={style}
      {...props}
    >
      <defs>
        <linearGradient id="houseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D77F" />
          <stop offset="50%" stopColor="#D4A64A" />
          <stop offset="100%" stopColor="#B38128" />
        </linearGradient>
      </defs>

      {/* Optional Badge Squircle Border */}
      {withBadge && (
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="22"
          className="fill-[#0B1220] stroke-[#D4A64A]"
          strokeWidth="4"
        />
      )}

      {/* Chimney on right roof slope */}
      <path
        d="M 57 32 V 26 C 57 24.8 57.8 24 59 24 H 63 C 64.2 24 65 24.8 65 26 V 38"
        fill="url(#houseGoldGrad)"
      />

      {/* Gable Roof (Thick geometric structure with overhangs) */}
      <path
        d="M 26 45.5 L 48.2 23.3 C 49.2 22.3 50.8 22.3 51.8 23.3 L 73 44.5"
        stroke="url(#houseGoldGrad)"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left Wall & Base Foundation */}
      <path
        d="M 33 44 V 68 C 33 71.5 35.5 73.5 39 73.5 H 52"
        stroke="url(#houseGoldGrad)"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2x2 Window Panes in Upper Center */}
      <rect x="42.5" y="39.5" width="4.5" height="4.5" rx="1" fill="url(#houseGoldGrad)" />
      <rect x="49" y="39.5" width="4.5" height="4.5" rx="1" fill="url(#houseGoldGrad)" />
      <rect x="42.5" y="46" width="4.5" height="4.5" rx="1" fill="url(#houseGoldGrad)" />
      <rect x="49" y="46" width="4.5" height="4.5" rx="1" fill="url(#houseGoldGrad)" />

      {/* Magnifying Glass Lens Outer Rim */}
      <circle
        cx="62"
        cy="59.5"
        r="13.5"
        stroke="url(#houseGoldGrad)"
        strokeWidth="6.5"
        fill="none"
      />

      {/* Inner Lens Curved Glint Highlight */}
      <path
        d="M 55.5 58 A 7.5 7.5 0 0 1 60.5 52"
        stroke="url(#houseGoldGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Magnifying Glass Handle */}
      <path
        d="M 72 69.5 L 81 78.5"
        stroke="url(#houseGoldGrad)"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );

  if (withBadge) {
    return (
      <div className={`relative inline-flex items-center justify-center ${badgeClassName}`}>
        {svgContent}
      </div>
    );
  }

  return svgContent;
}
