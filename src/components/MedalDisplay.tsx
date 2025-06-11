import { useState } from 'react';
import MedalModal from './medals/MedalModal';
import { MedalIcon } from './medals/MedalIcon';
import { MedalTooltip } from './medals/MedalTooltip';
import { getSpecialMedals, getEpicQuestMedals, debugEpicMedals } from './medals/medalUtils';
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
  
  // LLAMADA MEJORADA para obtener medallas épicas con debug adicional
  console.log('\n🚀 MEDAL DISPLAY: Calling getEpicQuestMedals...');
  let epicQuestMedals = getEpicQuestMedals();
  
  // Si no hay medallas épicas, intentar debug
  if (epicQuestMedals.length === 0) {
    console.log('⚠️ No epic medals found, trying debug function...');
    epicQuestMedals = debugEpicMedals();
  }
  
  console.log('🚀 MEDAL DISPLAY: Received epic quest medals:', epicQuestMedals);
  console.log('🚀 MEDAL DISPLAY: Epic medals count:', epicQuestMedals.length);
  
  console.log('\n=== 📊 MEDAL DISPLAY DEBUG ===');
  console.log('Current days:', currentDays);
  console.log('Special medals:', specialMedals);
  console.log('Epic quest medals:', epicQuestMedals);
  console.log('Unlocked achievements:', unlockedAchievements);
  console.log('Unlocked health achievements:', unlockedHealthAchievements);
  
  // Procesar medallas de Vigor (Dioniso) - TODAS las medallas de logros regulares
  // SOLO cambiar el icono y añadir el tipo, NO tocar nada más
  const processedAchievements = unlockedAchievements.map(achievement => ({
    ...achievement,
    icon: '/lovable-uploads/c2979263-14e3-4063-9c91-c4f503f6fa8d.png', // Icono de Dioniso
    type: 'vigor' as const
  }));

  // Procesar medallas de Salud (Higiea) - TODAS las medallas de salud
  // NO tocar NADA, mantener todo exactamente como está
  const processedHealthAchievements = unlockedHealthAchievements.map(achievement => ({
    ...achievement,
    type: 'health' as const
    // NO cambiar el icon - mantener el original de cada medalla de salud
  }));
  
  // Combinar TODAS las medallas incluyendo las épicas - ORDEN IMPORTANTE
  const allMedals: Medal[] = [
    ...processedAchievements, 
    ...processedHealthAchievements, 
    ...specialMedals,
    ...epicQuestMedals  // Las medallas épicas van al final
  ];

  console.log('Processed achievements (Vigor):', processedAchievements);
  console.log('Processed health achievements (Higiea):', processedHealthAchievements);
  console.log('Epic quest medals:', epicQuestMedals);
  console.log('All medals final:', allMedals);
  console.log('Total medals count:', allMedals.length);
  console.log('=== 📊 END DEBUG ===\n');

  const handleMedalClick = (medal: Medal) => {
    setSelectedMedal(medal);
  };

  const handleCloseModal = () => {
    setSelectedMedal(null);
  };

  if (allMedals.length === 0) {
    console.log('❌ No medals to display');
    return null;
  }

  console.log(`✅ Displaying ${allMedals.length} medals`);

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