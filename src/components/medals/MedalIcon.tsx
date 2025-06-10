import { Medal } from './medalTypes';

interface MedalIconProps {
  medal: Medal;
  onClick: (medal: Medal) => void;
  isEnlarged?: boolean;
}

export const MedalIcon = ({ medal, onClick, isEnlarged = false }: MedalIconProps) => {
  console.log('Rendering medal icon for:', medal.title, 'type:', medal.type);
  
  const getBackgroundStyle = () => {
    switch (medal.type) {
      case 'victory':
        return 'bg-yellow-100/80 border-yellow-300';
      case 'athena':
        return 'bg-amber-100/80 border-amber-300';
      case 'chronos':
        return 'bg-orange-100/80 border-orange-300';
      case 'health':
        return 'bg-green-100/80 border-green-300';
      case 'vigor':
        return 'bg-blue-100/80 border-blue-300';
      default:
        return 'bg-white/20 border-white/30';
    }
  };

  const getEngravedTextStyle = (type: string) => {
    const baseStyle = {
      textShadow: `
        0 1px 0 #8B4513,
        0 2px 0 #654321,
        0 3px 0 #543622,
        0 4px 0 #432815,
        0 5px 0 #321A08,
        0 6px 1px rgba(0,0,0,.15),
        0 0 5px rgba(0,0,0,.15),
        0 1px 3px rgba(0,0,0,.4),
        0 3px 5px rgba(0,0,0,.3),
        0 5px 10px rgba(0,0,0,.35),
        inset 0 1px 0 rgba(255,255,255,0.4),
        inset 0 -1px 0 rgba(0,0,0,0.6)
      `,
      filter: 'drop-shadow(0 0 3px rgba(139, 69, 19, 0.9))',
      background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
      fontWeight: '900',
      letterSpacing: '0.05em'
    };

    switch (type) {
      case 'athena':
        return {
          ...baseStyle,
          backgroundImage: 'linear-gradient(145deg, #FEF3C7 0%, #F59E0B 30%, #D97706  60%, #92400E 100%)',
        };
      case 'chronos':
        return {
          ...baseStyle,
          backgroundImage: 'linear-gradient(145deg, #FED7AA 0%, #FB923C 30%, #EA580C  60%, #C2410C 100%)',
        };
      case 'health':
        return {
          ...baseStyle,
          backgroundImage: 'linear-gradient(145deg, #A7F3D0 0%, #6EE7B7 30%, #34D399  60%, #10B981 100%)',
        };
      case 'vigor':
        return {
          ...baseStyle,
          // Cambiar a negro para las medallas de Dioniso
          backgroundImage: 'linear-gradient(145deg, #374151 0%, #1F2937 30%, #111827  60%, #000000 100%)',
        };
      default:
        return {
          ...baseStyle,
          backgroundImage: 'linear-gradient(145deg, #F5E6A3 0%, #D4AF37 30%, #B8860B  60%, #8B6914 100%)',
        };
    }
  };

  return (
    <button
      onClick={() => onClick(medal)}
      className={`hover:scale-110 transition-transform duration-200 rounded-full p-1 backdrop-blur-sm border relative ${getBackgroundStyle()}`}
    >
      <img 
        src={medal.icon} 
        alt={medal.title}
        className="w-12 h-12 rounded-full object-cover object-center"
        style={{ 
          aspectRatio: '1/1',
          minWidth: '48px',
          minHeight: '48px',
          maxWidth: '48px',
          maxHeight: '48px'
        }}
      />
      
      {/* Solo mostrar elementos grabados si NO está ampliado */}
      {!isEnlarged && (
        <>
          {/* Número grabado para medallas de Vigor (Dioniso) - ahora en negro */}
          {medal.type === 'vigor' && 'days' in medal && medal.days && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className="text-gray-100 select-none pointer-events-none text-sm"
                style={getEngravedTextStyle('vigor')}
              >
                {medal.days}
              </span>
            </div>
          )}

          {/* NO mostrar número grabado para medalla de Atenea - ya está en la imagen */}

          {/* Número 2 grabado para medalla de Cronos */}
          {medal.type === 'chronos' && 'days' in medal && medal.days && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                className="text-orange-200 select-none pointer-events-none text-lg"
                style={getEngravedTextStyle('chronos')}
              >
                2
              </span>
            </div>
          )}

          {/* Ícono del órgano para medallas de Salud (Higiea) - solo en vista normal */}
          {medal.type === 'health' && 'organIcon' in medal && medal.organIcon && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center border border-green-300 shadow-sm">
              <span className="text-xs">{medal.organIcon}</span>
            </div>
          )}

          {/* Ícono temporal para medallas especiales (Atenea, Nike, Afrodita) */}
          {(medal.type === 'athena' || medal.type === 'victory' || medal.type === 'chronos') && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center border border-amber-300 shadow-sm">
              <span className="text-xs">⏳</span>
            </div>
          )}
        </>
      )}
    </button>
  );
};