
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
        {/* Nariz con forma de banda de Möbius */}
        <g transform="translate(24,24) scale(0.8)">
          {/* Parte superior izquierda de la banda */}
          <path
            d="M-12,-8 Q-16,-12 -8,-16 Q0,-20 8,-16 Q12,-14 8,-8 Q4,-4 0,-6 Q-4,-8 -8,-6 Q-12,-4 -12,-8 Z"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          
          {/* Parte inferior derecha de la banda */}
          <path
            d="M12,8 Q16,12 8,16 Q0,20 -8,16 Q-12,14 -8,8 Q-4,4 0,6 Q4,8 8,6 Q12,4 12,8 Z"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          
          {/* Conexión central que crea el efecto Möbius */}
          <path
            d="M-8,-6 Q-4,0 0,0 Q4,0 8,6"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          
          <path
            d="M8,-6 Q4,0 0,0 Q-4,0 -8,6"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          
          {/* Orificios nasales */}
          <ellipse
            cx="-4"
            cy="0"
            rx="2"
            ry="4"
            fill="white"
            opacity="0.7"
          />
          
          <ellipse
            cx="4"
            cy="0"
            rx="2"
            ry="4"
            fill="white"
            opacity="0.7"
          />
          
          {/* Detalles adicionales para dar profundidad */}
          <path
            d="M-6,-2 Q0,-1 6,-2"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          <path
            d="M-6,2 Q0,1 6,2"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
        
        {/* Círculo exterior sutil para enmarcar */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="white"
          strokeWidth="1"
          opacity="0.4"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default Logo;
