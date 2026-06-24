import React from 'react';
import logoImg from '../../assets/logo.png';

export default function Logo({ className }) {
  return (
    <img
      src={logoImg}
      alt="Victoria Alabaster International Women Ministry Logo"
      className={`h-12 sm:h-14 w-auto object-contain ${className || ''}`}
    />
  );
}
