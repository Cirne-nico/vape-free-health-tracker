
import { useState, useEffect } from 'react';
import { achievements, Achievement } from '@/data/achievementsData';

export const useAchievements = (startDate: Date | null, currentTime: Date) => {
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [checkedAchievements, setCheckedAchievements] = useState<string[]>([]);

  // Cargar logros verificados del localStorage
  useEffect(() => {
    const savedCheckedAchievements = localStorage.getItem('checked-achievements');
    if (savedCheckedAchievements) {
      setCheckedAchievements(JSON.parse(savedCheckedAchievements));
    }
  }, []);

  // Verificar nuevos logros cuando cambie el tiempo
  useEffect(() => {
    if (!startDate) return;

    const currentDays = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    for (const achievement of achievements) {
      if (currentDays >= achievement.days && !checkedAchievements.includes(achievement.id)) {
        setNewAchievement(achievement);
        const newChecked = [...checkedAchievements, achievement.id];
        setCheckedAchievements(newChecked);
        localStorage.setItem('checked-achievements', JSON.stringify(newChecked));
        break;
      }
    }
  }, [currentTime, startDate, checkedAchievements]);

  const handleCloseAchievementPopup = () => {
    setNewAchievement(null);
  };

  const getUnlockedAchievements = (days: number) => {
    return achievements.filter(achievement => days >= achievement.days);
  };

  const resetAchievements = () => {
    setCheckedAchievements([]);
    localStorage.setItem('checked-achievements', JSON.stringify([]));
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
