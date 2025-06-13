import { useState } from 'react';
import MedalModal from './MedalModal';
import { MedalIcon } from './MedalIcon';
import { MedalTooltip } from './MedalTooltip';
import { getSpecialMedals, getEpicQuestMedals } from './medalUtils';
import { Achievement, HealthAchievement, Medal } from './medalTypes';

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
  
  // Obtener todas las medallas
  const specialMedals = getSpecialMedals(currentDays);
  const epicQuestMedals = getEpicQuestMedals();
  
  // Procesar medallas con tipos específicos
  const processedAchievements = unlockedAchievements.map(achievement => ({
    ...achievement,
    icon: '/lovable-uploads/c2979263-14e3-4063-9c91-c4f503f6fa8d.png',
    type: 'vigor' as const
  }));

  const processedHealthAchievements = unlockedHealthAchievements.map(achievement => ({
    ...achievement,
    type: 'health' as const
  }));
  
  // Combinar todas las medallas
  const allMedals: Medal[] = [
    ...processedAchievements, 
    ...processedHealthAchievements, 
    ...specialMedals,
    ...epicQuestMedals
  ];

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