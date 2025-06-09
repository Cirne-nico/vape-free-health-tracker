
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
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Fondo semi-transparente para mejorar contraste */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"></div>
      
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        {/* Círculo exterior más visible */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.8"
        />
        
        {/* Líneas de transición con mejor contraste */}
        <g>
          <path
            d="M12 24 L20 16 L28 24 L36 16"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M12 28 L20 20 L28 28 L36 20"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M12 32 L20 24 L28 32 L36 24"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.5"
          />
        </g>
        
        {/* Punto central más destacado */}
        <circle
          cx="24"
          cy="24"
          r="2.5"
          fill="white"
          className="drop-shadow-sm"
        />
        
        {/* Sombra interna del punto central para más profundidad */}
        <circle
          cx="24"
          cy="24"
          r="1"
          fill="rgba(59, 130, 246, 0.6)"
        />
      </svg>
    </div>
  );
};

export default Logo;
