import { EmotionalProgressCriteria } from './types';
import { analyzeLogEmotions, hasConsecutiveDaysWithCriteria, getRecentLogs, countDaysInPeriodWithCriteria } from './analyzer';

export const emotionalProgressBadges: EmotionalProgressCriteria[] = [
  {
    id: 'umbral_1',
    name: 'Umbral I',
    level: 'I',
    description: 'Primer movimiento: algo se despierta del letargo',
    icon: '🌫️',
    minDaysRequired: 1,
    category: 'lethargy_overcome',
    checkCriteria: (logs: any[]) => {
      return logs.some(log => {
        const analysis = analyzeLogEmotions(log);
        const deepLethargy = log.emotions.filter((id: string) => ['depressed', 'sad', 'foggy', 'indifferent'].includes(id)).length;
        return deepLethargy < (log.emotions.length * 0.7);
      });
    }
  },
  {
    id: 'umbral_2',
    name: 'Umbral II',
    level: 'II',
    description: 'Constancia emergente: 3 días consecutivos con menos letargo',
    icon: '🌫️',
    minDaysRequired: 3,
    category: 'lethargy_overcome',
    checkCriteria: (logs: any[]) => {
      return hasConsecutiveDaysWithCriteria(logs, 3, (log) => {
        const deepLethargy = log.emotions.filter((id: string) => ['depressed', 'sad', 'indifferent'].includes(id)).length;
        return deepLethargy < (log.emotions.length * 0.5);
      });
    }
  },
  {
    id: 'goteo_1',
    name: 'Goteo I',
    level: 'I',
    description: 'La agitación se calma: primera semana sin emociones de alta tensión',
    icon: '💧',
    minDaysRequired: 7,
    category: 'tension_reduction',
    checkCriteria: (logs: any[]) => {
      return hasConsecutiveDaysWithCriteria(logs, 7, (log) => {
        const highTension = log.emotions.filter((id: string) => ['overwhelmed', 'restless', 'anxious'].includes(id)).length;
        return highTension < (log.emotions.length * 0.3);
      });
    }
  },
  {
    id: 'goteo_2',
    name: 'Goteo II',
    level: 'II',
    description: 'Regulación inicial: dos semanas de menor reactividad',
    icon: '💧',
    minDaysRequired: 14,
    category: 'tension_reduction',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 14);
      const calmDays = countDaysInPeriodWithCriteria(recentLogs, 14, (log) => {
        const analysis = analyzeLogEmotions(log);
        return analysis.percentages.tension < 40;
      });
      return calmDays >= 10;
    }
  },
  {
    id: 'vibracion_1',
    name: 'Vibración I',
    level: 'I',
    description: 'Primeros compases de serenidad sostenida',
    icon: '🌿',
    minDaysRequired: 10,
    category: 'serenity',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 10);
      const serenityDays = countDaysInPeriodWithCriteria(recentLogs, 10, (log) => {
        const analysis = analyzeLogEmotions(log);
        return analysis.percentages.serenity > 25;
      });
      return serenityDays >= 6;
    }
  },
  {
    id: 'vibracion_2',
    name: 'Vibración II',
    level: 'II',
    description: 'Serenidad como base: tres semanas de calma predominante',
    icon: '🌿',
    minDaysRequired: 21,
    category: 'serenity',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 21);
      const serenityDays = countDaysInPeriodWithCriteria(recentLogs, 21, (log) => {
        const analysis = analyzeLogEmotions(log);
        return analysis.percentages.serenity > 40;
      });
      return serenityDays >= 15;
    }
  },
  {
    id: 'sintonia_1',
    name: 'Sintonía I',
    level: 'I',
    description: 'Danza entre calma y vitalidad: una semana de equilibrio ventral',
    icon: '🌀',
    minDaysRequired: 7,
    category: 'positive_activation',
    checkCriteria: (logs: any[]) => {
      return hasConsecutiveDaysWithCriteria(logs, 7, (log) => {
        const analysis = analyzeLogEmotions(log);
        const ventral = analysis.percentages.serenity > 30 && analysis.percentages.positive_activation > 20;
        const regulated = (analysis.percentages.tension + analysis.percentages.lethargy) < 30;
        return ventral && regulated;
      });
    }
  },
  {
    id: 'sintonia_2',
    name: 'Sintonía II',
    level: 'II',
    description: 'Regulación ventral sostenida: un mes de conexión emocional',
    icon: '🌀',
    minDaysRequired: 30,
    category: 'stability',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 30);
      const ventralDays = countDaysInPeriodWithCriteria(recentLogs, 30, (log) => {
        const analysis = analyzeLogEmotions(log);
        const ventral = (analysis.percentages.serenity + analysis.percentages.positive_moderate) > 50;
        const regulated = analysis.percentages.tension < 25 && analysis.percentages.lethargy < 20;
        return ventral && regulated;
      });
      return ventralDays >= 20;
    }
  },
  {
    id: 'corriente_1',
    name: 'Corriente I',
    level: 'I',
    description: 'Fluidez emocional: navegación natural entre estados positivos',
    icon: '🌬️',
    minDaysRequired: 14,
    category: 'positive_activation',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 14);
      const fluidDays = countDaysInPeriodWithCriteria(recentLogs, 14, (log) => {
        const analysis = analyzeLogEmotions(log);
        const hasSerenity = analysis.percentages.serenity > 20;
        const hasActivation = analysis.percentages.positive_activation > 20;
        const hasModerate = analysis.percentages.positive_moderate > 20;
        const lowNegative = (analysis.percentages.tension + analysis.percentages.lethargy) < 25;
        return ((hasSerenity && hasActivation) || (hasSerenity && hasModerate) || (hasActivation && hasModerate)) && lowNegative;
      });
      return fluidDays >= 10;
    }
  },
  {
    id: 'corriente_2',
    name: 'Corriente II',
    level: 'II',
    description: 'Maestría adaptativa: seis semanas de flexibilidad emocional',
    icon: '🌬️',
    minDaysRequired: 42,
    category: 'stability',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 42);
      const adaptableDays = countDaysInPeriodWithCriteria(recentLogs, 42, (log) => {
        const analysis = analyzeLogEmotions(log);
        const positive = analysis.percentages.serenity + analysis.percentages.positive_activation + analysis.percentages.positive_moderate;
        const hasVariety = Object.values(analysis.percentages).filter(p => p > 15).length >= 2;
        const resilient = analysis.percentages.tension < 20 && analysis.percentages.lethargy < 15;
        return positive > 65 && hasVariety && resilient;
      });
      return adaptableDays >= 30;
    }
  },
  {
    id: 'presencia_minima_1',
    name: 'Presencia mínima I',
    level: 'I',
    description: 'Umbral de la presencia total: estado ventral emergente',
    icon: '🧿',
    minDaysRequired: 21,
    category: 'ventral',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 21);
      const ventralDays = countDaysInPeriodWithCriteria(recentLogs, 21, (log) => {
        const analysis = analyzeLogEmotions(log);
        const serenity = analysis.percentages.serenity >= 35;
        const gentleJoy = analysis.percentages.positive_moderate >= 15;
        const minimal = (analysis.percentages.tension + analysis.percentages.lethargy) < 20;
        return serenity && gentleJoy && minimal;
      });
      return ventralDays >= 15;
    }
  },
  {
    id: 'presencia_minima_2',
    name: 'Presencia mínima II',
    level: 'II',
    description: 'Estado ventral pleno: la calma radiante que abraza la alegría',
    icon: '🪶',
    minDaysRequired: 45,
    category: 'ventral',
    checkCriteria: (logs: any[]) => {
      const recentLogs = getRecentLogs(logs, 45);
      const ventralDays = countDaysInPeriodWithCriteria(recentLogs, 45, (log) => {
        const analysis = analyzeLogEmotions(log);
        const serenity = analysis.percentages.serenity >= 40 && analysis.percentages.serenity <= 65;
        const joyfulActivation = analysis.percentages.positive_moderate >= 20 && analysis.percentages.positive_moderate <= 40;
        const minimalNegative = (analysis.percentages.tension + analysis.percentages.lethargy + analysis.percentages.negative_moderate) < 15;
        const noExtreme = analysis.percentages.positive_activation < 20;
        
        return serenity && joyfulActivation && minimalNegative && noExtreme;
      });
      return ventralDays >= 32;
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