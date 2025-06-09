
import { useState, useEffect } from 'react';
import { emotions } from '@/data/emotionsData';

export const useEmotionAnalytics = () => {
  const [emotionLogs, setEmotionLogs] = useState<any[]>([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('emotion-logs') || '[]');
    setEmotionLogs(logs.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const getEmotionBalance = () => {
    const balance = emotionLogs.map(log => {
      const positiveCount = log.emotions.filter((id: string) => 
        emotions[id as keyof typeof emotions]?.type === 'positive'
      ).length;
      const negativeCount = log.emotions.filter((id: string) => 
        emotions[id as keyof typeof emotions]?.type === 'negative'
      ).length;
      
      const hasStrongPositive = log.emotions.some((id: string) => ['euphoric', 'happy'].includes(id));
      
      let dayScore = 0;
      if (hasStrongPositive) {
        dayScore = 1;
      } else if (positiveCount > negativeCount) {
        dayScore = 1;
      } else if (negativeCount > positiveCount) {
        dayScore = -1;
      }
      
      return {
        date: new Date(log.date).toLocaleDateString(),
        day: log.day,
        score: dayScore,
        positive: positiveCount,
        negative: negativeCount
      };
    }).reverse();

    return balance;
  };

  const getEmotionDistribution = () => {
    const distribution: { [key: string]: number } = {};
    
    emotionLogs.forEach(log => {
      log.emotions.forEach((emotionId: string) => {
        distribution[emotionId] = (distribution[emotionId] || 0) + 1;
      });
    });

    return Object.entries(distribution).map(([emotionId, count]) => ({
      name: emotions[emotionId as keyof typeof emotions]?.text || emotionId,
      value: count,
      color: emotions[emotionId as keyof typeof emotions]?.color || '#6B7280'
    }));
  };

  const getQuadrantData = () => {
    return emotionLogs.map(log => {
      let totalEnergy = 0;
      let totalValence = 0;
      let count = 0;

      log.emotions.forEach((emotionId: string) => {
        const emotion = emotions[emotionId as keyof typeof emotions];
        if (emotion && emotion.type !== 'neutral') {
          totalEnergy += emotion.energy;
          totalValence += emotion.valence;
          count++;
        }
      });

      if (count === 0) return null;

      return {
        day: log.day,
        date: new Date(log.date).toLocaleDateString(),
        energy: totalEnergy / count,
        valence: totalValence / count,
        emotions: log.emotions.map((id: string) => 
          emotions[id as keyof typeof emotions]?.text
        ).join(', ')
      };
    }).filter(Boolean).reverse();
  };

  const getWeeklyData = () => {
    const weeklyGroups: { [week: number]: any[] } = {};
    
    emotionLogs.forEach(log => {
      const week = Math.floor(log.day / 7) + 1;
      if (!weeklyGroups[week]) weeklyGroups[week] = [];
      weeklyGroups[week].push(log);
    });

    return Object.entries(weeklyGroups).map(([week, logs]) => {
      const positiveCount = logs.reduce((acc, log) => 
        acc + log.emotions.filter((id: string) => 
          emotions[id as keyof typeof emotions]?.type === 'positive'
        ).length, 0
      );
      const negativeCount = logs.reduce((acc, log) => 
        acc + log.emotions.filter((id: string) => 
          emotions[id as keyof typeof emotions]?.type === 'negative'
        ).length, 0
      );

      const total = positiveCount + negativeCount;
      const score = total > 0 ? (positiveCount - negativeCount) / total : 0;

      return {
        week: `Semana ${week}`,
        score: score,
        positive: positiveCount,
        negative: negativeCount
      };
    });
  };

  const exportData = () => {
    const dataStr = JSON.stringify(emotionLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'historial-emociones.json';
    link.click();
  };

  return {
    emotionLogs,
    getEmotionBalance,
    getEmotionDistribution,
    getQuadrantData,
    getWeeklyData,
    exportData
  };
};
