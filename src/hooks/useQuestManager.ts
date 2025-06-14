import { useState, useEffect } from 'react';
import { EpicQuest, defaultEpicQuests, createEpicQuest } from '@/data/epicQuests';
import { toast } from 'sonner';

export const useQuestManager = () => {
  const [quests, setQuests] = useState<EpicQuest[]>([]);

  // Cargar gestas del localStorage
  useEffect(() => {
    const savedQuests = localStorage.getItem('epic-quests');
    if (savedQuests) {
      const loadedQuests = JSON.parse(savedQuests);
      setQuests(loadedQuests);
    } else {
      // Inicializar con gestas por defecto
      const initialQuests = defaultEpicQuests.map(createEpicQuest);
      setQuests(initialQuests);
      localStorage.setItem('epic-quests', JSON.stringify(initialQuests));
    }
  }, []);

  // Función para verificar si se debe desbloquear la medalla final MEJORADA
  const checkUltimateAchievement = (updatedQuests: EpicQuest[]) => {
    console.log('\n🏆 === CHECKING ULTIMATE ACHIEVEMENT ===');
    
    // Contar gestas completadas (excluyendo la medalla final)
    const completedQuests = updatedQuests.filter(q => 
      q.isCompleted && q.id !== 'ultimate_achievement'
    );
    
    console.log('Completed quests (excluding ultimate):', completedQuests.length);
    console.log('Completed quest IDs:', completedQuests.map(q => q.id));
    
    // Contar gestas con medalla (excluyendo la medalla final)
    const questsWithMedals = updatedQuests.filter(q => 
      q.medalIcon && q.id !== 'ultimate_achievement'
    );
    
    console.log('Quests with medals (excluding ultimate):', questsWithMedals.length);
    console.log('Quest with medals IDs:', questsWithMedals.map(q => q.id));
    
    // Verificar si todas las gestas con medalla están completadas
    const allMedalQuestsCompleted = questsWithMedals.every(q => q.isCompleted);
    console.log('All medal quests completed:', allMedalQuestsCompleted);
    
    // Obtener la gesta ultimate
    const ultimateQuest = updatedQuests.find(q => q.id === 'ultimate_achievement');
    console.log('Ultimate quest found:', !!ultimateQuest);
    console.log('Ultimate quest completed:', ultimateQuest?.isCompleted);
    
    // Condiciones para desbloquear la medalla final
    const shouldUnlock = ultimateQuest && 
                        !ultimateQuest.isCompleted && 
                        questsWithMedals.length > 0 && 
                        allMedalQuestsCompleted;
    
    console.log('Should unlock ultimate achievement:', shouldUnlock);
    
    if (shouldUnlock) {
      console.log('🎉 UNLOCKING ULTIMATE ACHIEVEMENT!');
      
      // Desbloquear automáticamente la medalla final
      const finalUpdatedQuests = updatedQuests.map(quest => {
        if (quest.id === 'ultimate_achievement') {
          return {
            ...quest,
            currentChecks: 1,
            isCompleted: true
          };
        }
        return quest;
      });
      
      toast.success('🎉 ¡CRACK! ¡Has desbloqueado la medalla de Maestría Total!', {
        description: 'Has completado todas las gestas épicas disponibles. Eres une verdadere maestre.',
        duration: 8000
      });
      
      console.log('🏆 === ULTIMATE ACHIEVEMENT UNLOCKED ===\n');
      return finalUpdatedQuests;
    }
    
    console.log('🏆 === ULTIMATE ACHIEVEMENT NOT UNLOCKED ===\n');
    return updatedQuests;
  };

  // Guardar gestas en localStorage
  const saveQuests = (updatedQuests: EpicQuest[]) => {
    // Verificar medalla final antes de guardar
    const finalQuests = checkUltimateAchievement(updatedQuests);
    
    setQuests(finalQuests);
    localStorage.setItem('epic-quests', JSON.stringify(finalQuests));
  };

  return {
    quests,
    saveQuests
  };
};