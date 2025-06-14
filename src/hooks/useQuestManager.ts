import { useState, useEffect } from 'react';
import { EpicQuest, defaultEpicQuests, createEpicQuest } from '@/data/epicQuests';
import { toast } from 'sonner';

export const useQuestManager = () => {
  const [quests, setQuests] = useState<EpicQuest[]>([]);

  useEffect(() => {
    const savedQuests = localStorage.getItem('epic-quests');
    if (savedQuests) {
      const loadedQuests = JSON.parse(savedQuests);
      setQuests(loadedQuests);
    } else {
      const initialQuests = defaultEpicQuests.map(createEpicQuest);
      setQuests(initialQuests);
      localStorage.setItem('epic-quests', JSON.stringify(initialQuests));
    }
  }, []);

  const checkUltimateAchievement = (updatedQuests: EpicQuest[]) => {
    const completedQuests = updatedQuests.filter(q => 
      q.isCompleted && q.id !== 'ultimate_achievement'
    );
    
    const questsWithMedals = updatedQuests.filter(q => 
      q.medalIcon && q.id !== 'ultimate_achievement'
    );
    
    const allMedalQuestsCompleted = questsWithMedals.every(q => q.isCompleted);
    const ultimateQuest = updatedQuests.find(q => q.id === 'ultimate_achievement');
    
    const shouldUnlock = ultimateQuest && 
                        !ultimateQuest.isCompleted && 
                        questsWithMedals.length > 0 && 
                        allMedalQuestsCompleted;
    
    const shouldDeactivate = ultimateQuest && 
                            ultimateQuest.isCompleted && 
                            !allMedalQuestsCompleted;
    
    if (shouldUnlock) {
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
      
      toast.info('La medalla de Maestría Total se ha desactivado', {
        description: 'Completa todas las gestas épicas para volver a desbloquearla.',
        duration: 5000
      });
      
      return finalUpdatedQuests;
    }
    
    return updatedQuests;
  };

  const saveQuests = (updatedQuests: EpicQuest[]) => {
    const finalQuests = checkUltimateAchievement(updatedQuests);
    setQuests(finalQuests);
    localStorage.setItem('epic-quests', JSON.stringify(finalQuests));
  };

  return {
    quests,
    saveQuests
  };
};