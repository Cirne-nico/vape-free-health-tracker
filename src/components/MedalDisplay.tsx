
import { useState } from 'react';
import MedalModal from './medals/MedalModal';
import { MedalIcon } from './medals/MedalIcon';
import { MedalTooltip } from './medals/MedalTooltip';
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
  
  // Procesar medallas de Vigor (Dioniso) - mantener imagen genérica
  // EXCLUIR la del día 90 que es de Atenea, no de Dioniso
  const processedAchievements = unlockedAchievements
    .filter(achievement => achievement.days !== 90) // Excluir día 90 (Atenea)
    .map(achievement => ({
      ...achievement,
      icon: '/lovable-uploads/c2979263-14e3-4063-9c91-c4f503f6fa8d.png',
      type: 'vigor' as const
    }));

  // Procesar medallas de Salud (Higiea) - usar sus iconos específicos
  // EXCLUIR las que coincidan con días de medallas especiales (90, 365, 730)
  const processedHealthAchievements = unlockedHealthAchievements
    .filter(achievement => 
      achievement.days !== 90 && // Día 90 es Atenea
      achievement.days !== 365 && // Día 365 es Victoria  
      achievement.days !== 730 // Día 730 es Cronos
    )
    .map(achievement => ({
      ...achievement,
      type: 'health' as const
      // Mantener el icon original de cada achievement sin sobreescribirlo
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
          <MedalTooltip key={medal.id} medal={medal}>
            <MedalIcon medal={medal} onClick={handleMedalClick} />
          </MedalTooltip>
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
