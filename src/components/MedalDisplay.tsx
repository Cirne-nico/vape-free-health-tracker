import { useState } from 'react';
import MedalModal from './medals/MedalModal';
import { MedalIcon } from './medals/MedalIcon';
import { MedalTooltip } from './medals/MedalTooltip';
import { getSpecialMedals, getEpicQuestMedals, getHabitMedals } from './medals/medalUtils';
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
  
  // Obtener todas las medallas
  const specialMedals = getSpecialMedals(currentDays);
  const epicQuestMedals = getEpicQuestMedals();
  const habitMedals = getHabitMedals();
  
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
  
  // Combinar todas las medallas y agrupar por tipo
  const allMedals: Medal[] = [
    ...processedAchievements, 
    ...processedHealthAchievements, 
    ...specialMedals,
    ...epicQuestMedals,
    ...habitMedals
  ];

  // Agrupar medallas por tipo
  const groupedMedals = {
    vigor: allMedals.filter(m => m.type === 'vigor'),
    health: allMedals.filter(m => m.type === 'health'),
    special: allMedals.filter(m => ['victory', 'athena', 'chronos'].includes(m.type)),
    epic: allMedals.filter(m => m.type === 'epic'),
    habit: allMedals.filter(m => m.type === 'habit')
  };

  const handleMedalClick = (medal: Medal) => {
    setSelectedMedal(medal);
  };

  const handleCloseModal = () => {
    setSelectedMedal(null);
  };

  if (allMedals.length === 0) {
    return null;
  }

  const MedalGroup = ({ title, medals, icon }: { title: string; medals: Medal[]; icon: string }) => {
    if (medals.length === 0) return null;
    
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span>{icon}</span>
          {title} ({medals.length})
        </h4>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {medals.map((medal) => (
            <MedalTooltip key={medal.id} medal={medal}>
              <MedalIcon medal={medal} onClick={handleMedalClick} />
            </MedalTooltip>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="space-y-6">
        <MedalGroup 
          title="Vigor y Perseverancia" 
          medals={groupedMedals.vigor} 
          icon="💪" 
        />
        
        <MedalGroup 
          title="Recuperación de Salud" 
          medals={groupedMedals.health} 
          icon="🏥" 
        />
        
        <MedalGroup 
          title="Hitos Especiales" 
          medals={groupedMedals.special} 
          icon="🏛️" 
        />
        
        <MedalGroup 
          title="Gestas Épicas" 
          medals={groupedMedals.epic} 
          icon="⚔️" 
        />
        
        <MedalGroup 
          title="Hábitos Científicos" 
          medals={groupedMedals.habit} 
          icon="⚡" 
        />
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