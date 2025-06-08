
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Círculo exterior sutil */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="currentColor"
          strokeWidth="1"
          className="text-slate-300"
          opacity="0.3"
        />
        
        {/* Líneas de transición - representan el umbral */}
        <g className="text-gradient-to-r from-blue-500 to-emerald-500">
          <path
            d="M12 24 L20 16 L28 24 L36 16"
            stroke="url(#gradient1)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M12 28 L20 20 L28 28 L36 20"
            stroke="url(#gradient2)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M12 32 L20 24 L28 32 L36 24"
            stroke="url(#gradient3)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.3"
          />
        </g>
        
        {/* Punto central - momento presente */}
        <circle
          cx="24"
          cy="24"
          r="2"
          fill="url(#centerGradient)"
          className="drop-shadow-sm"
        />
        
        {/* Gradientes */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="centerGradient">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#3b82f6" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
