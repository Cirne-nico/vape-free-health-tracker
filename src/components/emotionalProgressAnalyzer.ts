
import { emotions } from '@/data/emotionsData';

export interface EmotionalProgressCriteria {
  id: string;
  name: string;
  level: 'I' | 'II';
  description: string;
  icon: string;
  checkCriteria: (logs: any[]) => boolean;
  minDaysRequired: number;
  category: 'serenity' | 'positive_activation' | 'tension_reduction' | 'lethargy_overcome' | 'stability' | 'ventral';
}

// Funciones auxiliares para análisis emocional
export const categorizeEmotion = (emotionId: string) => {
  const emotion = emotions[emotionId as keyof typeof emotions];
  if (!emotion) return 'unknown';
  
  const { energy, valence, type } = emotion;
  
  if (type === 'positive') {
    if (energy <= -0.5) return 'serenity'; // Baja energía + positivo
    if (energy >= 0.5) return 'positive_activation'; // Alta energía + positivo
    return 'positive_moderate'; // Energía moderada + positivo
  }
  
  if (type === 'negative') {
    if (energy >= 0.5) return 'tension'; // Alta energía + negativo
    if (energy <= -0.5) return 'lethargy'; // Baja energía + negativo
    return 'negative_moderate'; // Energía moderada + negativo
  }
  
  return 'neutral';
};

export const analyzeLogEmotions = (log: any) => {
  const categories = {
    serenity: 0,
    positive_activation: 0,
    positive_moderate: 0,
    tension: 0,
    lethargy: 0,
    negative_moderate: 0,
    neutral: 0
  };
  
  log.emotions.forEach((emotionId: string) => {
    const category = categorizeEmotion(emotionId);
    if (category in categories) {
      categories[category as keyof typeof categories]++;
    }
  });
  
  const total = log.emotions.length;
  const percentages = Object.fromEntries(
    Object.entries(categories).map(([key, count]) => [key, total > 0 ? (count / total) * 100 : 0])
  );
  
  return { counts: categories, percentages, total };
};

export const getRecentLogs = (logs: any[], days: number) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return logs
    .filter(log => new Date(log.date) >= cutoffDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const hasConsecutiveDaysWithCriteria = (logs: any[], days: number, criteria: (log: any) => boolean) => {
  if (logs.length < days) return false;
  
  const recentLogs = logs.slice(-days);
  return recentLogs.every(criteria);
};

export const countDaysInPeriodWithCriteria = (logs: any[], periodDays: number, criteria: (log: any) => boolean) => {
  const recentLogs = getRecentLogs(logs, periodDays);
  return recentLogs.filter(criteria).length;
};

// Definición de las 12 insignias con criterios específicos
export const emotionalProgressBadges: EmotionalProgressCriteria[] = [
  {
    id: 'umbral_1',
    name: 'Umbral I',
    level: 'I',
    description: 'Primer día con emociones positivas predominantes',
    icon: '🌫️',
    minDaysRequired: 1,
    category: 'positive_activation',
    checkCriteria: (logs: any[]) => {
      return logs.some(log => {
        const analysis = analyzeLogEmotions(log);
        return (analysis.percentages.serenity + analysis.percentages.positive_activation + analysis.percentages.positive_moderate) > 50;
      });
    }
  },
  {
    id: 'umbral_2',
    name: 'Umbral II',
    level: 'II',
    description: '3 días consecutivos con balance emocional positivo',
    icon: '🌫️',
    minDaysRequired: 3,
    category: 'stability',
    checkCriteria: (logs: any[]) => {
      return hasConsecutiveDaysWithCriteria(logs, 3, (log) => {
        const analysis = analyzeLogEmotions(log);
        return (analysis.percentages.serenity + analysis.percentages.positive_activation + analysis.percentages.positive_moderate) > 50;
      });
    }
  },
  {
    id: 'goteo_1',
    name: 'Goteo I',
    level: 'I',
    description: 'Primera semana sin emociones de letargo profundo',
    icon: '💧',
    minDaysRequired: 7,
    category: 'lethargy_overcome',
    checkCriteria: (logs: any[]) => {
      return hasConsecutiveDaysWithCriteria(logs, 7, (log) => {
        const hasLethargy = log.emotions.some((id: string) => ['depressed', 'sad'].includes(id));
        return !hasLethargy;
      });
    }
  },
  {
    id: 'goteo_2',
    name: 'Goteo II',
    level: 'II',
    description: 'Dos semanas de estabilidad emocional sostenida',
    icon: '💧',
    minDaysRequired: 14,
    category: 'stability',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 14);
      const stableDays = countDaysInPeriodWithCriteria(recentLogs, 14, (log) => {
        const analysis = analyzeLogEmotions(log);
        return (analysis.percentages.serenity + analysis.percentages.positive_activation) > 50;
      });
      return stableDays >= 10; // 10 de 14 días
    }
  },
  {
    id: 'vibracion_1',
    name: 'Vibración I',
    level: 'I',
    description: 'Reducción significativa de emociones de tensión',
    icon: '🌿',
    minDaysRequired: 10,
    category: 'tension_reduction',
    checkCriteria: (logs: any[]) => {
      if (logs.length < 10) return false;
      const firstWeek = logs.slice(0, 7);
      const lastWeek = logs.slice(-7);
      
      const firstWeekTension = firstWeek.reduce((acc, log) => {
        const analysis = analyzeLogEmotions(log);
        return acc + analysis.percentages.tension;
      }, 0) / firstWeek.length;
      
      const lastWeekTension = lastWeek.reduce((acc, log) => {
        const analysis = analyzeLogEmotions(log);
        return acc + analysis.percentages.tension;
      }, 0) / lastWeek.length;
      
      return firstWeekTension > 40 && lastWeekTension < 25; // Reducción significativa
    }
  },
  {
    id: 'vibracion_2',
    name: 'Vibración II',
    level: 'II',
    description: 'Tres semanas manteniendo emociones de serenidad',
    icon: '🌿',
    minDaysRequired: 21,
    category: 'serenity',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 21);
      const serenityDays = countDaysInPeriodWithCriteria(recentLogs, 21, (log) => {
        const analysis = analyzeLogEmotions(log);
        return analysis.percentages.serenity > 40;
      });
      return serenityDays >= 15; // 15 de 21 días
    }
  },
  {
    id: 'sintonia_1',
    name: 'Sintonía I',
    level: 'I',
    description: 'Equilibrio entre calma y motivación durante una semana',
    icon: '🌀',
    minDaysRequired: 7,
    category: 'stability',
    checkCriteria: (logs: any[]) => {
      return hasConsecutiveDaysWithCriteria(logs, 7, (log) => {
        const analysis = analyzeLogEmotions(log);
        const calmAndMotivated = analysis.percentages.serenity > 30 && analysis.percentages.positive_activation > 20;
        const lowNegative = (analysis.percentages.tension + analysis.percentages.lethargy) < 30;
        return calmAndMotivated && lowNegative;
      });
    }
  },
  {
    id: 'sintonia_2',
    name: 'Sintonía II',
    level: 'II',
    description: 'Un mes de regulación emocional constante',
    icon: '🌀',
    minDaysRequired: 30,
    category: 'stability',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 30);
      const regulatedDays = countDaysInPeriodWithCriteria(recentLogs, 30, (log) => {
        const analysis = analyzeLogEmotions(log);
        const balanced = (analysis.percentages.serenity + analysis.percentages.positive_moderate) > 50;
        const lowExtreme = analysis.percentages.tension < 20 && analysis.percentages.lethargy < 20;
        return balanced && lowExtreme;
      });
      return regulatedDays >= 20; // 20 de 30 días
    }
  },
  {
    id: 'corriente_1',
    name: 'Corriente I',
    level: 'I',
    description: 'Flujo natural entre diferentes estados positivos',
    icon: '🌬️',
    minDaysRequired: 14,
    category: 'positive_activation',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 14);
      const diverseDays = countDaysInPeriodWithCriteria(recentLogs, 14, (log) => {
        const analysis = analyzeLogEmotions(log);
        const hasSerenity = analysis.percentages.serenity > 20;
        const hasActivation = analysis.percentages.positive_activation > 20;
        const hasModerate = analysis.percentages.positive_moderate > 20;
        return (hasSerenity && hasActivation) || (hasSerenity && hasModerate) || (hasActivation && hasModerate);
      });
      return diverseDays >= 10; // 10 de 14 días con diversidad positiva
    }
  },
  {
    id: 'corriente_2',
    name: 'Corriente II',
    level: 'II',
    description: 'Seis semanas de adaptabilidad emocional',
    icon: '🌬️',
    minDaysRequired: 42,
    category: 'stability',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 42);
      const adaptableDays = countDaysInPeriodWithCriteria(recentLogs, 42, (log) => {
        const analysis = analyzeLogEmotions(log);
        const positive = analysis.percentages.serenity + analysis.percentages.positive_activation + analysis.percentages.positive_moderate;
        const hasVariety = Object.values(analysis.percentages).filter(p => p > 15).length >= 2;
        return positive > 60 && hasVariety;
      });
      return adaptableDays >= 30; // 30 de 42 días
    }
  },
  {
    id: 'presencia_minima_1',
    name: 'Presencia mínima I',
    level: 'I',
    description: 'Primeros atisbos del estado ventral',
    icon: '🧿',
    minDaysRequired: 21,
    category: 'ventral',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 21);
      const ventralDays = countDaysInPeriodWithCriteria(recentLogs, 21, (log) => {
        const analysis = analyzeLogEmotions(log);
        const calmJoy = analysis.percentages.serenity >= 40 && analysis.percentages.positive_moderate >= 20;
        const minimal = (analysis.percentages.tension + analysis.percentages.lethargy) < 15;
        return calmJoy && minimal;
      });
      return ventralDays >= 12; // 12 de 21 días
    }
  },
  {
    id: 'presencia_minima_2',
    name: 'Presencia mínima II',
    level: 'II',
    description: 'Estado ventral sostenido - Maestría emocional',
    icon: '🪶',
    minDaysRequired: 45,
    category: 'ventral',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 45);
      const ventralDays = countDaysInPeriodWithCriteria(recentLogs, 45, (log) => {
        const analysis = analyzeLogEmotions(log);
        // Estado ventral: 40-60% serenidad + 20-40% activación positiva suave + <10% negativas
        const serenity = analysis.percentages.serenity;
        const gentleActivation = analysis.percentages.positive_moderate;
        const negative = analysis.percentages.tension + analysis.percentages.lethargy + analysis.percentages.negative_moderate;
        
        const ventralBalance = serenity >= 40 && serenity <= 60 && 
                              gentleActivation >= 20 && gentleActivation <= 40 && 
                              negative < 10;
        return ventralBalance;
      });
      return ventralDays >= 30; // 30 de 45 días - El estado más elevado
    }
  }
];

export const checkUnlockedBadges = (emotionLogs: any[]): string[] => {
  const unlockedBadges: string[] = [];
  
  for (const badge of emotionalProgressBadges) {
    if (emotionLogs.length >= badge.minDaysRequired && badge.checkCriteria(emotionLogs)) {
      unlockedBadges.push(badge.id);
    }
  }
  
  return unlockedBadges;
};

export const getNextBadgeToUnlock = (emotionLogs: any[], unlockedBadges: string[]): EmotionalProgressCriteria | null => {
  for (const badge of emotionalProgressBadges) {
    if (!unlockedBadges.includes(badge.id)) {
      return badge;
    }
  }
  return null;
};
