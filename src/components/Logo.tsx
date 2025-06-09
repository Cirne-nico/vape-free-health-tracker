
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
        {/* Nariz con forma de banda de Möbius - copiando exactamente la imagen */}
        <g transform="translate(24,24) scale(0.85)">
          {/* Contorno exterior principal de la nariz */}
          <path
            d="M-12,-8 Q-16,-12 -8,-16 Q0,-18 8,-16 Q16,-12 12,-8 Q8,-4 4,-6 Q0,-8 -4,-6 Q-8,-4 -12,-8 Z"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Contorno interior de la banda de Möbius */}
          <path
            d="M-8,-4 Q-4,-2 0,-4 Q4,-6 8,-4 Q12,0 8,4 Q4,6 0,4 Q-4,2 -8,4 Q-12,0 -8,-4 Z"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Línea central que crea el efecto Möbius */}
          <path
            d="M-8,-4 Q0,0 8,-4 M8,-4 Q0,0 -8,4 M-8,4 Q0,0 8,4"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Orificios nasales - dos elipses */}
          <ellipse
            cx="-3"
            cy="2"
            rx="2"
            ry="4"
            fill="white"
            transform="rotate(-20)"
          />
          
          <ellipse
            cx="3"
            cy="2"
            rx="2"
            ry="4"
            fill="white"
            transform="rotate(20)"
          />
          
          {/* Detalles adicionales para dar profundidad */}
          <path
            d="M-6,-2 Q0,-1 6,-2"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          
          <path
            d="M-6,6 Q0,5 6,6"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
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
