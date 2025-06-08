
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { MedalModal } from './medals/MedalModal';
import { getSpecialMedals } from './medals/medalUtils';
import { Achievement, HealthAchievement, Medal } from './medals/medalTypes';

interface MedalDisplayProps {
  unlockedAchievements: Achievement[];
  unlockedHealthAchievements: HealthAchievement[];
  totalSavings: number;
}

const MedalDisplay = ({ unlockedAchievements, unlockedHealthAchievements, totalSavings }: MedalDisplayProps) => {
  const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);

  // Obtener días actuales para calcular medallas especiales
  const currentDays = unlockedAchievements.length > 0 ? 
    Math.max(...unlockedAchievements.map(a => a.days)) : 0;
  
  const specialMedals = getSpecialMedals(currentDays);
  
  // Procesar medallas de Vigor (Dioniso)
  const processedAchievements = unlockedAchievements.map(achievement => ({
    ...achievement,
    icon: '/lovable-uploads/c2979263-14e3-4063-9c91-c4f503f6fa8d.png',
    type: 'vigor' as const
  }));

  // Procesar medallas de Salud (Higiea)
  const processedHealthAchievements = unlockedHealthAchievements.map(achievement => ({
    ...achievement,
    icon: '/lovable-uploads/11c876dc-a4da-4ee8-8fc3-a8f39cef49c7.png',
    type: 'health' as const
  }));
  
  const allMedals: Medal[] = [...processedAchievements, ...processedHealthAchievements, ...specialMedals];

  const handleMedalClick = (medal: Medal) => {
    setSelectedMedal(medal);
  };

  const handleCloseModal = () => {
    setSelectedMedal(null);
  };

  if (allMedals.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        {allMedals.map((medal) => (
          <Tooltip key={medal.id}>
            <TooltipTrigger>
              <button
                onClick={() => handleMedalClick(medal)}
                className={`hover:scale-110 transition-transform duration-200 rounded-full p-1 backdrop-blur-sm border relative ${
                  medal.type === 'victory' 
                    ? 'bg-yellow-100/80 border-yellow-300' 
                    : medal.type === 'health'
                    ? 'bg-green-100/80 border-green-300'
                    : 'bg-white/20 border-white/30'
                }`}
              >
                <img 
                  src={medal.icon} 
                  alt={medal.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                {/* Número grabado para medallas de Vigor (Dioniso) */}
                {medal.type === 'vigor' && 'days' in medal && medal.days && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-amber-100 font-black text-sm tracking-wider select-none pointer-events-none"
                      style={{
                        textShadow: `
                          0 1px 0 #8B4513,
                          0 2px 0 #654321,
                          0 3px 0 #543622,
                          0 4px 0 #432815,
                          0 5px 0 #321A08,
                          0 6px 1px rgba(0,0,0,.1),
                          0 0 5px rgba(0,0,0,.1),
                          0 1px 3px rgba(0,0,0,.3),
                          0 3px 5px rgba(0,0,0,.2),
                          0 5px 10px rgba(0,0,0,.25),
                          inset 0 1px 0 rgba(255,255,255,0.3),
                          inset 0 -1px 0 rgba(0,0,0,0.5)
                        `,
                        filter: 'drop-shadow(0 0 2px rgba(139, 69, 19, 0.8))',
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                        backgroundImage: 'linear-gradient(145deg, #F5E6A3 0%, #D4AF37 30%, #B8860B  60%, #8B6914 100%)',
                      }}
                    >
                      {medal.days}
                    </span>
                  </div>
                )}

                {/* Inscripción grabada para medallas de Salud (Higiea) */}
                {medal.type === 'health' && 'inscription' in medal && medal.inscription && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-green-100 font-black text-xs tracking-wider select-none pointer-events-none"
                      style={{
                        textShadow: `
                          0 1px 0 #0F5132,
                          0 2px 0 #0A3D26,
                          0 3px 0 #082B1A,
                          0 4px 0 #051A0E,
                          0 5px 0 #020802,
                          0 6px 1px rgba(0,0,0,.1),
                          0 0 5px rgba(0,0,0,.1),
                          0 1px 3px rgba(0,0,0,.3),
                          0 3px 5px rgba(0,0,0,.2),
                          0 5px 10px rgba(0,0,0,.25),
                          inset 0 1px 0 rgba(255,255,255,0.3),
                          inset 0 -1px 0 rgba(0,0,0,0.5)
                        `,
                        filter: 'drop-shadow(0 0 2px rgba(15, 81, 50, 0.8))',
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                        backgroundImage: 'linear-gradient(145deg, #A7F3D0 0%, #6EE7B7 30%, #34D399  60%, #10B981 100%)',
                      }}
                    >
                      {medal.inscription}
                    </span>
                  </div>
                )}

                {/* Ícono del órgano para medallas de Salud (Higiea) en la esquina */}
                {medal.type === 'health' && 'organIcon' in medal && medal.organIcon && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center border border-green-300 shadow-sm">
                    <span className="text-xs">{medal.organIcon}</span>
                  </div>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{medal.title}</p>
              <p className="text-xs text-muted-foreground">{medal.description}</p>
              {medal.type === 'victory' && (
                <p className="text-xs text-yellow-600 font-medium">Medalla de Victoria - Nike</p>
              )}
              {medal.type === 'health' && (
                <p className="text-xs text-green-600 font-medium">Medalla de Salud - Higiea</p>
              )}
              {medal.type === 'vigor' && (
                <p className="text-xs text-purple-600 font-medium">Medalla de Vigor - Dioniso</p>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <MedalModal 
        selectedMedal={selectedMedal}
        totalSavings={totalSavings}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default MedalDisplay;
