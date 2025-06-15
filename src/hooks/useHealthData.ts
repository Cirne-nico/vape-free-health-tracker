import { useMemo } from 'react';
import { healthRecoveryData, HealthRecoveryPoint } from '@/data/healthRecovery';
import { HealthCategoryKey } from '@/components/HealthCategories';

export const useHealthData = (daysSince: number) => {
  // Función para obtener el valor actual de recuperación para una categoría
  const getCurrentValue = (category: HealthCategoryKey) => {
    const data = healthRecoveryData[category];
    
    // Si es el primer día (o menos), mostrar el primer punto de datos
    // Esto es crucial para mostrar avances desde los primeros minutos
    if (daysSince < 1) {
      // Buscar el punto de datos para el día 0 o el primer punto disponible
      const initialPoint = data.find(point => point.day === 0) || data[0];
      
      // Calcular un valor proporcional para las primeras 24 horas
      // Esto permite mostrar avances incluso en las primeras horas
      const hoursProgress = (daysSince * 24); // Convertir a horas
      const initialValue = initialPoint.value;
      const day1Point = data.find(point => point.day === 1);
      
      if (day1Point && hoursProgress > 0) {
        // Interpolar entre el día 0 y el día 1 basado en las horas transcurridas
        const valueRange = day1Point.value - initialValue;
        const interpolatedValue = initialValue + (valueRange * (hoursProgress / 24));
        
        return {
          value: Math.round(interpolatedValue),
          description: initialPoint.description,
          medicalBasis: initialPoint.medicalBasis,
          timeline: `Primeras ${Math.round(hoursProgress)} horas`
        };
      }
      
      return initialPoint;
    }
    
    // Para más de un día, usar el método original de interpolación
    const currentPoint = data.reduce((prev, curr) => 
      curr.day <= daysSince ? curr : prev
    , data[0]);
    
    const nextPoint = data.find(point => point.day > daysSince);
    if (nextPoint && currentPoint) {
      const daysSincePoint = daysSince - currentPoint.day;
      const daysBetweenPoints = nextPoint.day - currentPoint.day;
      const interpolationFactor = daysSincePoint / daysBetweenPoints;
      const interpolatedValue = currentPoint.value + 
        (nextPoint.value - currentPoint.value) * interpolationFactor;
      
      return {
        value: Math.round(interpolatedValue),
        description: currentPoint.description,
        medicalBasis: currentPoint.medicalBasis,
        timeline: currentPoint.timeline
      };
    }
    
    return currentPoint;
  };

  // Función para obtener datos para el gráfico
  const getChartData = (category: HealthCategoryKey) => {
    // Incluir datos para las primeras horas si estamos en el primer día
    if (daysSince < 1) {
      const hoursProgress = (daysSince * 24);
      const initialData = healthRecoveryData[category].filter(point => point.day === 0);
      
      // Añadir puntos para las primeras horas
      if (hoursProgress > 0) {
        const day1Point = healthRecoveryData[category].find(point => point.day === 1);
        const initialPoint = initialData[0] || healthRecoveryData[category][0];
        
        if (day1Point) {
          const valueRange = day1Point.value - initialPoint.value;
          const hourlyPoints = [];
          
          // Crear puntos para cada 6 horas
          for (let hour = 6; hour <= Math.min(24, hoursProgress); hour += 6) {
            const hourValue = initialPoint.value + (valueRange * (hour / 24));
            hourlyPoints.push({
              day: hour / 24,
              value: Math.round(hourValue),
              description: `Primeras ${hour} horas`,
              dayLabel: `${hour}h`
            });
          }
          
          // Añadir el punto actual si no coincide con los intervalos de 6 horas
          if (hoursProgress % 6 !== 0 && hoursProgress < 24) {
            const currentHourValue = initialPoint.value + (valueRange * (hoursProgress / 24));
            hourlyPoints.push({
              day: hoursProgress / 24,
              value: Math.round(currentHourValue),
              description: `Hora ${Math.round(hoursProgress)}`,
              dayLabel: `${Math.round(hoursProgress)}h`
            });
          }
          
          // Combinar con el punto inicial
          return [
            {
              ...initialPoint,
              dayLabel: 'Inicio'
            },
            ...hourlyPoints
          ];
        }
      }
    }
    
    // Para más de un día, usar el método original
    return healthRecoveryData[category]
      .filter(point => point.day <= daysSince)
      .map(point => ({
        ...point,
        dayLabel: point.day === 0 ? 'Inicio' : `Día ${point.day}`
      }));
  };

  // Función para obtener el próximo hito
  const getNextMilestone = (category: HealthCategoryKey) => {
    return healthRecoveryData[category].find(point => point.day > daysSince);
  };

  return useMemo(() => ({
    getCurrentValue,
    getChartData,
    getNextMilestone
  }), [daysSince]);
};