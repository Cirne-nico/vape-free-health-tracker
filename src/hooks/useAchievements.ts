
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

  // Función para ajustar medallas según los días actuales (eliminar las que ya no corresponden)
  const adjustMedalsForCurrentDays = (currentDays: number) => {
    // Filtrar logros regulares que ya no deberían estar desbloqueados
    const validAchievements = checkedAchievements.filter(achievementId => {
      const achievement = achievements.find(a => a.id === achievementId);
      return achievement && currentDays >= achievement.days;
    });

    // Filtrar logros de salud que ya no deberían estar desbloqueados
    const validHealthAchievements = checkedHealthAchievements.filter(achievementId => {
      const healthAchievement = healthAchievements.find(ha => ha.id === achievementId);
      return healthAchievement && currentDays >= healthAchievement.days;
    });

    // Solo actualizar si hay cambios
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
    
    // Primero ajustar las medallas según los días actuales (por si hubo retroceso)
    adjustMedalsForCurrentDays(currentDays);
    
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

  // Nueva función para forzar el ajuste de medallas tras una recaída
  const adjustMedalsAfterRelapse = (newDays: number) => {
    adjustMedalsForCurrentDays(newDays);
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
