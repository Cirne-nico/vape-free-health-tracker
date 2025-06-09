
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
        {/* Nariz con forma de banda de Möbius mejorada */}
        <g transform="translate(24,24) scale(0.9)">
          {/* Contorno principal de la nariz - lado izquierdo */}
          <path
            d="M-14,-6 Q-18,-10 -12,-14 Q-6,-18 0,-16 Q6,-14 10,-12 Q14,-8 12,-4 Q8,0 4,-2 Q0,-4 -4,-2 Q-8,0 -12,-4 Q-14,-5 -14,-6 Z"
            stroke="white"
            strokeWidth="3"
            fill="rgba(255,255,255,0.1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
          
          {/* Contorno principal de la nariz - lado derecho */}
          <path
            d="M14,6 Q18,10 12,14 Q6,18 0,16 Q-6,14 -10,12 Q-14,8 -12,4 Q-8,0 -4,2 Q0,4 4,2 Q8,0 12,4 Q14,5 14,6 Z"
            stroke="white"
            strokeWidth="3"
            fill="rgba(255,255,255,0.1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
          
          {/* Puente nasal central - efecto Möbius */}
          <path
            d="M-10,-4 Q-6,-1 0,0 Q6,1 10,4"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          
          <path
            d="M10,-4 Q6,-1 0,0 Q-6,1 -10,4"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          
          {/* Orificios nasales más anatómicos */}
          <ellipse
            cx="-5"
            cy="1"
            rx="2.5"
            ry="5"
            fill="white"
            opacity="0.8"
            transform="rotate(-15)"
          />
          
          <ellipse
            cx="5"
            cy="1"
            rx="2.5"
            ry="5"
            fill="white"
            opacity="0.8"
            transform="rotate(15)"
          />
          
          {/* Sombras internas de los orificios */}
          <ellipse
            cx="-5"
            cy="1"
            rx="1.5"
            ry="3"
            fill="rgba(255,255,255,0.4)"
            transform="rotate(-15)"
          />
          
          <ellipse
            cx="5"
            cy="1"
            rx="1.5"
            ry="3"
            fill="rgba(255,255,255,0.4)"
            transform="rotate(15)"
          />
          
          {/* Detalles del tabique nasal */}
          <path
            d="M-3,-1 Q0,0 3,-1"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          <path
            d="M-3,3 Q0,2 3,3"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          {/* Líneas de profundidad adicionales */}
          <path
            d="M-8,-2 Q-4,-0.5 0,0 Q4,-0.5 8,-2"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          <path
            d="M-8,4 Q-4,2.5 0,2 Q4,2.5 8,4"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          {/* Aletas nasales */}
          <path
            d="M-12,-2 Q-14,0 -12,2 Q-10,4 -8,2"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          <path
            d="M12,-2 Q14,0 12,2 Q10,4 8,2"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
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
