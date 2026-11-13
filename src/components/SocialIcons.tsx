import React from 'react';

interface IconProps {
  className?: string;
}

export const WhatsAppLogo: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path
      fill="#FFFFFF"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.56 8.44A10.61 10.61 0 0 0 6.82 21.18L5.31 26.69l5.64-1.48a10.6 10.6 0 0 0 5.07 1.29h.01c5.85 0 10.61-4.76 10.61-10.61a10.55 10.55 0 0 0-3.08-7.45zm-7.53 16.27h-.01a8.8 8.8 0 0 1-4.49-1.23l-.32-.19-3.35.88.89-3.26-.21-.33a8.82 8.82 0 1 1 7.49 4.13zm4.84-6.6c-.26-.13-1.57-.77-1.81-.86-.24-.09-.42-.13-.6.13-.18.27-.68.86-.84 1.04-.15.18-.31.2-.57.07-.27-.13-1.12-.41-2.13-1.32-.79-.7-1.32-1.57-1.48-1.83-.15-.27-.02-.41.12-.54.12-.12.26-.31.4-.46.13-.15.18-.27.26-.44.09-.18.04-.33-.02-.46-.07-.13-.6-1.44-.82-1.97-.22-.52-.44-.45-.6-.46h-.51c-.18 0-.46.07-.71.33-.24.27-.93.91-.93 2.21 0 1.3.95 2.57 1.08 2.74.13.18 1.87 2.86 4.53 4.01.63.27 1.13.44 1.51.56.63.2 1.21.17 1.67.11.51-.08 1.57-.64 1.79-1.26.22-.62.22-1.15.15-1.26-.06-.11-.24-.18-.5-.31z"
    />
  </svg>
);

export const InstagramLogo: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="wayraIgGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FD5949" />
        <stop offset="45%" stopColor="#D6249F" />
        <stop offset="100%" stopColor="#285AEB" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#wayraIgGrad)" />
    <rect x="6" y="6" width="12" height="12" rx="3.5" stroke="#FFFFFF" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="2.8" stroke="#FFFFFF" strokeWidth="1.8" />
    <circle cx="15.8" cy="8.2" r="0.9" fill="#FFFFFF" />
  </svg>
);

export const FacebookLogo: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10.5" fill="#1877F2" />
    <path
      d="M13.55 19.5V12.66h2.29l.34-2.66h-2.63V8.3c0-.77.21-1.3 1.32-1.3h1.41V4.62c-.24-.03-1.08-.1-2.05-.1-2.03 0-3.42 1.24-3.42 3.51V10H8.5v2.66h2.31v6.84h2.74z"
      fill="#FFFFFF"
    />
  </svg>
);

export const TikTokLogo: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5.5" fill="#162A22" />
    <path
      d="M15.8 8.95a4.2 4.2 0 0 1-2.45-3.25V5.3h-2.2v9.45a2.1 2.1 0 1 1-1.45-2v-2.25a4.35 4.35 0 1 0 3.65 4.28v-4.8a6.3 6.3 0 0 0 3.65 1.15V8.98c-.42 0-.82-.01-1.2-.03z"
      fill="#25F4EE"
      transform="translate(-0.5,-0.3)"
    />
    <path
      d="M15.8 8.95a4.2 4.2 0 0 1-2.45-3.25V5.3h-2.2v9.45a2.1 2.1 0 1 1-1.45-2v-2.25a4.35 4.35 0 1 0 3.65 4.28v-4.8a6.3 6.3 0 0 0 3.65 1.15V8.98c-.42 0-.82-.01-1.2-.03z"
      fill="#FE2C55"
      transform="translate(0.5,0.3)"
    />
    <path
      d="M15.8 8.95a4.2 4.2 0 0 1-2.45-3.25V5.3h-2.2v9.45a2.1 2.1 0 1 1-1.45-2v-2.25a4.35 4.35 0 1 0 3.65 4.28v-4.8a6.3 6.3 0 0 0 3.65 1.15V8.98c-.42 0-.82-.01-1.2-.03z"
      fill="#FFFFFF"
    />
  </svg>
);

export const YouTubeLogo: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M22.06 7.05a2.78 2.78 0 0 0-1.95-1.96C18.38 4.62 12 4.62 12 4.62s-6.38 0-8.11.47a2.78 2.78 0 0 0-1.95 1.96A29.1 29.1 0 0 0 1.48 12a29.1 29.1 0 0 0 .46 4.95 2.78 2.78 0 0 0 1.95 1.96c1.73.47 8.11.47 8.11.47s6.38 0 8.11-.47a2.78 2.78 0 0 0 1.95-1.96A29.1 29.1 0 0 0 22.52 12a29.1 29.1 0 0 0-.46-4.95z"
      fill="#FF0000"
    />
    <path d="M9.85 15.1V8.9L15.4 12l-5.55 3.1z" fill="#FFFFFF" />
  </svg>
);
