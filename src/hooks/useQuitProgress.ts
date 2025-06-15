import { useState, useEffect } from 'react';

export const useQuitProgress = (startDate: Date | null) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(timer);
  }, []);

  const calculateTimeSince = () => {
    if (!startDate) {
      return { days: 0, hours: 0, minutes: 0, totalHours: 0 };
    }

    const diffMs = currentTime.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    return {
      days: diffDays,
      hours: diffHours,
      minutes: diffMinutes,
      totalHours
    };
  };

  const calculateSavings = () => {
    if (!startDate) {
      return { total: 0, daily: 0 };
    }

    // Obtener configuración de costos del usuario
    const settings = JSON.parse(localStorage.getItem('app-settings') || '{}');
    const dailyCost = settings.dailyCost || ((20/7) + (4/10)); // Valor por defecto si no hay configuración

    const diffMs = currentTime.getTime() - startDate.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    
    const totalSavings = diffDays * dailyCost;

    return {
      total: totalSavings,
      daily: dailyCost
    };
  };

  const calculateProgressPercentage = () => {
    if (!startDate) return 0;
    
    const { days } = calculateTimeSince();
    
    // Fase 1: Primeros 90 días (objetivo inicial)
    if (days <= 90) {
      return (days / 90) * 100;
    }
    
    // Fase 2: De 90 días a 2 años (objetivo final)
    const daysAfter90 = days - 90;
    const daysTo2Years = 730 - 90; // 2 años - 90 días
    
    return 100 + ((daysAfter90 / daysTo2Years) * 100);
  };

  const getProgressInfo = () => {
    const { days } = calculateTimeSince();
    
    if (days <= 90) {
      return {
        target: 90,
        targetLabel: '90 días',
        isFirstPhase: true
      };
    }
    
    return {
      target: 730,
      targetLabel: '2 años',
      isFirstPhase: false
    };
  };

  const calculateBlurLevel = () => {
    if (!startDate) return 8;
    
    const { days, hours } = calculateTimeSince();
    const totalDays = days + (hours / 24); // Incluir las horas para una transición más suave
    
    // Reducir el blur gradualmente a medida que pasan los días
    // Llega a 0 al año (365 días)
    if (totalDays <= 90) {
      // De 8px a 4px en los primeros 90 días
      return 8 - ((totalDays / 90) * 4);
    } else if (totalDays <= 365) {
      // De 4px a 0px entre 90 días y 1 año
      const daysAfter90 = totalDays - 90;
      const daysTo1Year = 365 - 90;
      return Math.max(0, 4 - ((daysAfter90 / daysTo1Year) * 4)); // Asegurar que no sea negativo
    } else {
      // Después del año, mantener en 0 (completamente nítido)
      return 0;
    }
  };

  const calculateTextContrast = () => {
    if (!startDate) {
      return {
        primaryText: 'text-white',
        secondaryText: 'text-white/80',
        accentText: 'text-white/70',
        overlayIntensity: 'from-black/60 to-black/40'
      };
    }
    
    const { days } = calculateTimeSince();
    
    // Ajustar el contraste gradualmente
    if (days <= 30) {
      return {
        primaryText: 'text-white',
        secondaryText: 'text-white/80',
        accentText: 'text-white/70',
        overlayIntensity: 'from-black/60 to-black/40'
      };
    } else if (days <= 90) {
      return {
        primaryText: 'text-white',
        secondaryText: 'text-white/90',
        accentText: 'text-white/80',
        overlayIntensity: 'from-black/50 to-black/30'
      };
    } else if (days <= 180) {
      return {
        primaryText: 'text-white',
        secondaryText: 'text-white/90',
        accentText: 'text-white/80',
        overlayIntensity: 'from-black/40 to-black/20'
      };
    } else {
      return {
        primaryText: 'text-white',
        secondaryText: 'text-white',
        accentText: 'text-white/90',
        overlayIntensity: 'from-black/30 to-black/10'
      };
    }
  };

  return {
    currentTime,
    calculateTimeSince,
    calculateSavings,
    calculateProgressPercentage,
    getProgressInfo,
    calculateBlurLevel,
    calculateTextContrast
  };
};