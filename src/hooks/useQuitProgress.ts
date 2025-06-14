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
    if (!startDate) return { days: 0, hours: 0, minutes: 0, totalHours: 0 };
    
    const diff = currentTime.getTime() - startDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    
    return { days, hours, minutes, totalHours };
  };

  const calculateSavings = () => {
    if (!startDate) return { total: 0, daily: 0 };
    const days = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const settings = JSON.parse(localStorage.getItem('app-settings') || '{}');
    
    if (settings.costPerWeek && settings.coilCost && settings.coilDays) {
      const dailyLiquidCost = settings.costPerWeek / 7;
      const dailyCoilCost = settings.coilCost / settings.coilDays;
      const additionalDailyCost = settings.additionalDailyCost || 0;
      const totalDailyCost = dailyLiquidCost + dailyCoilCost + additionalDailyCost;
      
      return {
        total: days * totalDailyCost,
        daily: totalDailyCost
      };
    } else {
      const dailyCost = (20/7) + (4/10);
      return {
        total: days * dailyCost,
        daily: dailyCost
      };
    }
  };

  // ✅ FUNCIÓN CORREGIDA: Blur se elimina completamente a los 365 días
  const calculateBlurLevel = () => {
    const time = calculateTimeSince();
    const maxBlur = 8;
    
    // A los 365 días, blur = 0 (completamente nítido)
    if (time.days >= 365) {
      return 0;
    }
    
    // Reducción progresiva del blur hasta los 365 días
    const blurReduction = (time.days / 365) * maxBlur;
    return Math.max(0, maxBlur - blurReduction);
  };

  // ✅ NUEVA FUNCIÓN: Calcular contraste del texto según la nitidez de la imagen
  const calculateTextContrast = () => {
    const time = calculateTimeSince();
    
    // A medida que la imagen se vuelve más nítida, necesitamos más contraste
    if (time.days >= 365) {
      // Imagen completamente nítida = máximo contraste
      return {
        primaryText: 'text-white drop-shadow-lg',
        secondaryText: 'text-white drop-shadow-md',
        accentText: 'text-purple-100 drop-shadow-md',
        overlayIntensity: 'from-purple-800/90 to-indigo-800/90' // Overlay más oscuro
      };
    } else if (time.days >= 270) {
      // 75% del camino - aumentar contraste significativamente
      return {
        primaryText: 'text-white drop-shadow-md',
        secondaryText: 'text-white drop-shadow-sm',
        accentText: 'text-purple-100 drop-shadow-sm',
        overlayIntensity: 'from-purple-700/85 to-indigo-700/85'
      };
    } else if (time.days >= 180) {
      // 50% del camino - contraste moderado
      return {
        primaryText: 'text-white drop-shadow-sm',
        secondaryText: 'text-white',
        accentText: 'text-purple-100',
        overlayIntensity: 'from-purple-600/80 to-indigo-600/80'
      };
    } else if (time.days >= 90) {
      // 25% del camino - ligero aumento de contraste
      return {
        primaryText: 'text-white',
        secondaryText: 'text-white',
        accentText: 'text-purple-100',
        overlayIntensity: 'from-purple-600/80 to-indigo-600/80'
      };
    } else {
      // Primeros días - contraste normal
      return {
        primaryText: 'text-white',
        secondaryText: 'text-white',
        accentText: 'text-purple-100',
        overlayIntensity: 'from-purple-600/80 to-indigo-600/80'
      };
    }
  };

  const calculateProgressPercentage = () => {
    const time = calculateTimeSince();
    
    // Si aún no ha llegado a los 90 días, mostrar progreso hacia 90 días
    if (time.days < 90) {
      return Math.min((time.days / 90) * 100, 100);
    }
    
    // Si ya pasó los 90 días, mostrar progreso hacia 2 años (730 días)
    // El progreso va desde los 90 días hasta los 730 días
    const progressFrom90To730 = ((time.days - 90) / (730 - 90)) * 100;
    return Math.min(progressFrom90To730, 100);
  };

  const getProgressInfo = () => {
    const time = calculateTimeSince();
    
    if (time.days < 90) {
      return {
        target: 90,
        targetLabel: "90 días",
        isFirstPhase: true
      };
    }
    
    return {
      target: 730,
      targetLabel: "2 años",
      isFirstPhase: false
    };
  };

  return {
    currentTime,
    calculateTimeSince,
    calculateSavings,
    calculateBlurLevel,
    calculateTextContrast, // ✅ NUEVA FUNCIÓN EXPORTADA
    calculateProgressPercentage,
    getProgressInfo
  };
};