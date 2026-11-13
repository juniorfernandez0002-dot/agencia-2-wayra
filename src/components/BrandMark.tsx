import React from 'react';

export const BrandMark: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Logotipo Wayra Perú"
  >
    <rect x="2" y="2" width="60" height="60" rx="16" fill="#FFF2E2" stroke="#F4A62A" strokeWidth="2" />
    {/* Rising Cusco Sun */}
    <circle cx="32" cy="21" r="8.5" fill="#F4A62A" />
    {/* Vibrant Andes & Valley Silhouettes */}
    <path
      d="M11 45L25 25L36.5 38L44.5 29L53 45H11Z"
      fill="#0D9F8B"
    />
    {/* Flowing Wayra Wind Ribbon */}
    <path
      d="M14 51.5C24 46.5 40 46.5 50 51.5"
      stroke="#F26430"
      strokeWidth="4.2"
      strokeLinecap="round"
    />
  </svg>
);

export default BrandMark;
