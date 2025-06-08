
import { useState, useEffect } from 'react';
import { achievements, Achievement } from '@/data/achievementsData';

export const useAchievements = (startDate: Date | null, currentTime: Date) => {
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [checkedAchievements, setCheckedAchievements] = useState<string[]>([]);
  const [lastKnownDay, setLastKnownDay] = useState(0);

  // Cargar logros verificados del localStorage
  useEffect(() => {
    const savedCheckedAchievements = localStorage.getItem('checked-achievements');
    const savedLastKnownDay = localStorage.getItem('last-known-day');
    
    if (savedCheckedAchievements) {
      setCheckedAchievements(JSON.parse(savedCheckedAchievements));
    }
    
    if (savedLastKnownDay) {
      setLastKnownDay(parseInt(savedLastKnownDay));
    }
  }, []);

  // Verificar nuevos logros y pérdidas por recaída
  useEffect(() => {
    if (!startDate) return;

    const currentDays = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Detectar recaída (retroceso en días)
    if (currentDays < lastKnownDay) {
      // Remover logros que ya no se han alcanzado debido a la recaída
      const validAchievements = checkedAchievements.filter(achievementId => {
        const achievement = achievements.find(a => a.id === achievementId);
        return achievement && currentDays >= achievement.days;
      });
      
      if (validAchievements.length !== checkedAchievements.length) {
        setCheckedAchievements(validAchievements);
        localStorage.setItem('checked-achievements', JSON.stringify(validAchievements));
        console.log('Medallas perdidas por recaída:', checkedAchievements.length - validAchievements.length);
      }
    }
    
    // Verificar nuevos logros
    for (const achievement of achievements) {
      if (currentDays >= achievement.days && !checkedAchievements.includes(achievement.id)) {
        setNewAchievement(achievement);
        const newChecked = [...checkedAchievements, achievement.id];
        setCheckedAchievements(newChecked);
        localStorage.setItem('checked-achievements', JSON.stringify(newChecked));
        break;
      }
    }
    
    // Actualizar el último día conocido
    if (currentDays > lastKnownDay) {
      setLastKnownDay(currentDays);
      localStorage.setItem('last-known-day', currentDays.toString());
    }
  }, [currentTime, startDate, checkedAchievements, lastKnownDay]);

  const handleCloseAchievementPopup = () => {
    setNewAchievement(null);
  };

  const getUnlockedAchievements = (days: number) => {
    return achievements.filter(achievement => days >= achievement.days);
  };

  const resetAchievements = () => {
    setCheckedAchievements([]);
    setLastKnownDay(0);
    localStorage.setItem('checked-achievements', JSON.stringify([]));
    localStorage.setItem('last-known-day', '0');
  };

  return {
    newAchievement,
    checkedAchievements,
    setCheckedAchievements,
    handleCloseAchievementPopup,
    getUnlockedAchievements,
    resetAchievements,
    achievements
  };
};
