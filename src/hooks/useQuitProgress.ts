
import { useState, useEffect } from 'react';

export const useQuitProgress = (startDate: Date | null) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar tiempo cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const calculateTimeSince = () => {
    if (!startDate) return { days: 0, hours: 0, minutes: 0 };
    
    const diff = currentTime.getTime() - startDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  const calculateSavings = () => {
    if (!startDate) return 0;
    const days = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const settings = JSON.parse(localStorage.getItem('app-settings') || '{}');
    
    if (settings.costPerWeek && settings.coilCost && settings.coilDays) {
      const dailyLiquidCost = settings.costPerWeek / 7;
      const dailyCoilCost = settings.coilCost / settings.coilDays;
      const additionalDailyCost = settings.additionalDailyCost || 0;
      const totalDailyCost = dailyLiquidCost + dailyCoilCost + additionalDailyCost;
      
      return days * totalDailyCost;
    } else {
      const dailyCost = (20/7) + (4/10);
      return days * dailyCost;
    }
  };

  const calculateBlurLevel = () => {
    const time = calculateTimeSince();
    const maxBlur = 8;
    const blurReduction = (time.days / 90) * maxBlur;
    return Math.max(0, maxBlur - blurReduction);
  };

  const calculateProgressPercentage = () => {
    const time = calculateTimeSince();
    return Math.min((time.days / 90) * 100, 100);
  };

  return {
    currentTime,
    calculateTimeSince,
    calculateSavings,
    calculateBlurLevel,
    calculateProgressPercentage
  };
};
