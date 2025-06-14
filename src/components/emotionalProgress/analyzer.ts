import { emotions } from '@/data/emotionsData';
import { EmotionalProgressCriteria } from './types';

export const categorizeEmotion = (emotionId: string) => {
  const emotion = emotions[emotionId as keyof typeof emotions];
  if (!emotion) return 'unknown';
  
  const { energy, valence, type } = emotion;
  
  if (type === 'positive') {
    if (energy <= -0.5) return 'serenity';
    if (energy >= 0.5) return 'positive_activation';
    return 'positive_moderate';
  }
  
  if (type === 'negative') {
    if (energy >= 0.5) return 'tension';
    if (energy <= -0.5) return 'lethargy';
    return 'negative_moderate';
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