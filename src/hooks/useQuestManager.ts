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

  // Función para verificar si se debe desbloquear la medalla final
  const checkUltimateAchievement = (updatedQuests: EpicQuest[]) => {
    // Contar gestas con medalla (excluyendo la medalla final)
    const questsWithMedals = updatedQuests.filter(q => 
      q.medalIcon && q.id !== 'ultimate_achievement'
    );
    
    // Verificar si todas las gestas con medalla están completadas
    const allMedalQuestsCompleted = questsWithMedals.length > 0 && 
                                   questsWithMedals.every(q => q.isCompleted);
    
    // Obtener la gesta ultimate
    const ultimateQuest = updatedQuests.find(q => q.id === 'ultimate_achievement');
    
    // Condiciones para desbloquear la medalla final
    const shouldUnlock = ultimateQuest && 
                        !ultimateQuest.isCompleted && 
                        allMedalQuestsCompleted;
    
    // Condiciones para desactivar la medalla final
    const shouldDeactivate = ultimateQuest && 
                            ultimateQuest.isCompleted && 
                            !allMedalQuestsCompleted;
    
    if (shouldUnlock) {
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
      
      return finalUpdatedQuests;
    }
    
    if (shouldDeactivate) {
      // Desactivar la medalla final si ya no se cumplen las condiciones
      const finalUpdatedQuests = updatedQuests.map(quest => {
        if (quest.id === 'ultimate_achievement') {
          return {
            ...quest,
            currentChecks: 0,
            isCompleted: false
          };
        }
        return quest;
      });
      
      return finalUpdatedQuests;
    }
    
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