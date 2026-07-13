import React from 'react';
import logoImg from '../../assets/victoria_logo_transparent.png';

export default function Logo({ className }) {
  return (
    <img
      src={logoImg}
      alt="Victoria-Alabaster International Women Ministry Logo"
      className={`w-auto object-contain ${className || 'h-14'}`}
    />
  );
}
