import { useState, useEffect } from 'react';

export interface HabitMedal {
  id: string;
  habitId: string;
  habitName: string;
  dateObtained: string;
  type: 'exercise' | 'sleep' | 'social' | 'general';
}

export const useHabitMedals = () => {
  const [habitMedals, setHabitMedals] = useState<HabitMedal[]>([]);

  useEffect(() => {
    const savedMedals = localStorage.getItem('habit-medals');
    if (savedMedals) {
      setHabitMedals(JSON.parse(savedMedals));
    }
  }, []);

  const getHabitMedalIcon = (type: string) => {
    switch (type) {
      case 'exercise':
        return '/lovable-uploads/Ejercicio.png';
      case 'sleep':
        return '/lovable-uploads/Sueño.png';
      case 'social':
        return '/lovable-uploads/social.png';
      default:
        return '/lovable-uploads/Ejercicio.png'; // Fallback
    }
  };

  const getHabitMedalTitle = (type: string, habitName: string) => {
    switch (type) {
      case 'exercise':
        return 'Maestría del Ejercicio';
      case 'sleep':
        return 'Maestría del Sueño';
      case 'social':
        return 'Maestría Social';
      default:
        return `Maestría de ${habitName}`;
    }
  };

  const getHabitMedalDescription = (type: string) => {
    switch (type) {
      case 'exercise':
        return 'Has consolidado el hábito del ejercicio diario como herramienta anti-antojo';
      case 'sleep':
        return 'Has consolidado un horario estricto de sueño para mejor control de impulsos';
      case 'social':
        return 'Has consolidado el compromiso social semanal como red de apoyo';
      default:
        return 'Has consolidado este hábito científico';
    }
  };

  const processedHabitMedals = habitMedals.map(medal => ({
    id: medal.id,
    type: 'habit' as const,
    title: getHabitMedalTitle(medal.type, medal.habitName),
    icon: getHabitMedalIcon(medal.type),
    description: getHabitMedalDescription(medal.type),
    reward: `Hábito "${medal.habitName}" consolidado permanentemente`,
    habitType: medal.type,
    dateObtained: medal.dateObtained
  }));

  return {
    habitMedals: processedHabitMedals,
    rawHabitMedals: habitMedals
  };
};