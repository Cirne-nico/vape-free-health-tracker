
import { useState, useEffect } from 'react';
import { achievements, Achievement } from '@/data/achievementsData';
import { healthAchievements, HealthAchievement } from '@/data/healthAchievements';

export const useAchievements = (startDate: Date | null, currentTime: Date) => {
  const [newAchievement, setNewAchievement] = useState<Achievement | HealthAchievement | null>(null);
  const [checkedAchievements, setCheckedAchievements] = useState<string[]>([]);
  const [checkedHealthAchievements, setCheckedHealthAchievements] = useState<string[]>([]);

  // Cargar logros verificados del localStorage
  useEffect(() => {
    const savedCheckedAchievements = localStorage.getItem('checked-achievements');
    const savedCheckedHealthAchievements = localStorage.getItem('checked-health-achievements');
    
    if (savedCheckedAchievements) {
      setCheckedAchievements(JSON.parse(savedCheckedAchievements));
    }
    if (savedCheckedHealthAchievements) {
      setCheckedHealthAchievements(JSON.parse(savedCheckedHealthAchievements));
    }
  }, []);

  // Función para ajustar medallas según los días actuales tras una recaída
  const adjustMedalsAfterRelapse = (previousDays: number, newDays: number) => {
    // Filtrar logros regulares que estén en el rango perdido (entre newDays y previousDays)
    const validAchievements = checkedAchievements.filter(achievementId => {
      const achievement = achievements.find(a => a.id === achievementId);
      // Mantener solo las medallas que corresponden a newDays o menos
      return achievement && achievement.days <= newDays;
    });

    // Filtrar logros de salud que estén en el rango perdido
    const validHealthAchievements = checkedHealthAchievements.filter(achievementId => {
      const healthAchievement = healthAchievements.find(ha => ha.id === achievementId);
      // Mantener solo las medallas que corresponden a newDays o menos
      return healthAchievement && healthAchievement.days <= newDays;
    });

    // Actualizar solo si hay cambios
    if (validAchievements.length !== checkedAchievements.length) {
      setCheckedAchievements(validAchievements);
      localStorage.setItem('checked-achievements', JSON.stringify(validAchievements));
    }

    if (validHealthAchievements.length !== checkedHealthAchievements.length) {
      setCheckedHealthAchievements(validHealthAchievements);
      localStorage.setItem('checked-health-achievements', JSON.stringify(validHealthAchievements));
    }
  };

  // Verificar nuevos logros cuando cambie el tiempo
  useEffect(() => {
    if (!startDate) return;

    const currentDays = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Verificar logros regulares
    for (const achievement of achievements) {
      if (currentDays >= achievement.days && !checkedAchievements.includes(achievement.id)) {
        setNewAchievement(achievement);
        const newChecked = [...checkedAchievements, achievement.id];
        setCheckedAchievements(newChecked);
        localStorage.setItem('checked-achievements', JSON.stringify(newChecked));
        return; // Solo mostrar un logro a la vez
      }
    }

    // Verificar logros de salud
    for (const healthAchievement of healthAchievements) {
      if (currentDays >= healthAchievement.days && !checkedHealthAchievements.includes(healthAchievement.id)) {
        setNewAchievement(healthAchievement);
        const newChecked = [...checkedHealthAchievements, healthAchievement.id];
        setCheckedHealthAchievements(newChecked);
        localStorage.setItem('checked-health-achievements', JSON.stringify(newChecked));
        return; // Solo mostrar un logro a la vez
      }
    }
  }, [currentTime, startDate, checkedAchievements, checkedHealthAchievements]);

  const handleCloseAchievementPopup = () => {
    setNewAchievement(null);
  };

  const getUnlockedAchievements = (days: number) => {
    return achievements.filter(achievement => days >= achievement.days);
  };

  const getUnlockedHealthAchievements = (days: number) => {
    return healthAchievements.filter(achievement => days >= achievement.days);
  };

  const resetAchievements = () => {
    setCheckedAchievements([]);
    setCheckedHealthAchievements([]);
    localStorage.setItem('checked-achievements', JSON.stringify([]));
    localStorage.setItem('checked-health-achievements', JSON.stringify([]));
  };

  return {
    newAchievement,
    checkedAchievements,
    checkedHealthAchievements,
    setCheckedAchievements,
    setCheckedHealthAchievements,
    handleCloseAchievementPopup,
    getUnlockedAchievements,
    getUnlockedHealthAchievements,
    resetAchievements,
    adjustMedalsAfterRelapse,
    achievements,
    healthAchievements
  };
};
