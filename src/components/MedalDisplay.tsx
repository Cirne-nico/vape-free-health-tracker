
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
  
  // Obtener medallas especiales (Atenea día 90, Victoria día 365, Cronos día 730)
  const specialMedals = getSpecialMedals(currentDays);
  
  console.log('Current days:', currentDays);
  console.log('Special medals:', specialMedals);
  console.log('Unlocked achievements:', unlockedAchievements);
  console.log('Unlocked health achievements:', unlockedHealthAchievements);
  
  // Procesar medallas de Vigor (Dioniso) - TODAS las medallas de logros regulares
  const processedAchievements = unlockedAchievements.map(achievement => ({
    ...achievement,
    icon: '/lovable-uploads/c2979263-14e3-4063-9c91-c4f503f6fa8d.png',
    type: 'vigor' as const
  }));

  // Procesar medallas de Salud (Higiea) - TODAS las medallas de salud
  // NO filtrar ninguna, ya que pueden coexistir con medallas especiales
  const processedHealthAchievements = unlockedHealthAchievements.map(achievement => ({
    ...achievement,
    type: 'health' as const
    // Mantener el icon original de cada achievement sin sobreescribirlo
  }));
  
  // Combinar TODAS las medallas sin filtrar nada
  const allMedals: Medal[] = [...processedAchievements, ...processedHealthAchievements, ...specialMedals];

  console.log('All medals after processing:', allMedals);

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
