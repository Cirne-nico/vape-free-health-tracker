import { useMemo } from 'react';
import { healthRecoveryData, HealthRecoveryPoint } from '@/data/healthRecovery';
import { HealthCategoryKey } from '@/components/HealthCategories';

export const useHealthData = (daysSince: number) => {
  const getCurrentValue = (category: HealthCategoryKey) => {
    const data = healthRecoveryData[category];
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

  const getChartData = (category: HealthCategoryKey) => {
    return healthRecoveryData[category]
      .filter(point => point.day <= daysSince)
      .map(point => ({
        ...point,
        dayLabel: point.day === 0 ? 'Inicio' : `Día ${point.day}`
      }));
  };

  const getNextMilestone = (category: HealthCategoryKey) => {
    return healthRecoveryData[category].find(point => point.day > daysSince);
  };

  return useMemo(() => ({
    getCurrentValue,
    getChartData,
    getNextMilestone
  }), [daysSince]);
};