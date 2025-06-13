import { useState, useEffect } from 'react';

interface RelapseHandlerProps {
  startDate: Date | null;
  setStartDate: (date: Date) => void;
  currentTime: Date;
  resetAchievements: () => void;
  adjustMedalsAfterRelapse: (currentDays: number, newDays: number) => void;
}

export const useRelapseHandler = ({
  startDate,
  setStartDate,
  currentTime,
  resetAchievements,
  adjustMedalsAfterRelapse
}: RelapseHandlerProps) => {
  const [relapseCount, setRelapseCount] = useState(0);

  useEffect(() => {
    const savedRelapseCount = localStorage.getItem('relapse-count');
    if (savedRelapseCount) {
      setRelapseCount(parseInt(savedRelapseCount));
    }
  }, []);

  const handleRelapse = () => {
    if (!startDate) return;
    
    const currentDays = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Si tiene menos de 7 días, reiniciar completamente
    if (currentDays < 7) {
      setStartDate(new Date());
      localStorage.setItem('vaping-quit-date', new Date().toISOString());
      resetAchievements();
      alert('Proceso reiniciado. ¡Vuelve a empezar con fuerza!');
      return;
    }
    
    let daysToSubtract = 0;
    let penaltyMessage = '';
    
    // Definir penalizaciones según el número de recaída
    switch (relapseCount) {
      case 0:
        daysToSubtract = 7; // 1 semana
        penaltyMessage = 'Primera recaída: se han restado 7 días de tu progreso.';
        break;
      case 1:
        daysToSubtract = 30; // 1 mes
        penaltyMessage = 'Segunda recaída: se ha restado 1 mes (30 días) de tu progreso.';
        break;
      case 2:
        daysToSubtract = 90; // 3 meses
        penaltyMessage = 'Tercera recaída: se han restado 3 meses (90 días) de tu progreso.';
        break;
      case 3:
        daysToSubtract = 270; // 9 meses
        penaltyMessage = 'Cuarta recaída: se han restado 9 meses (270 días) de tu progreso.';
        break;
      case 4:
      default:
        // Quinta recaída o más: reiniciar completamente
        setStartDate(new Date());
        setRelapseCount(0); // Reiniciar contador de recaídas también
        localStorage.setItem('vaping-quit-date', new Date().toISOString());
        localStorage.setItem('relapse-count', '0');
        resetAchievements();
        alert('Quinta recaída: se ha reiniciado todo el proceso completamente.');
        return;
    }
    
    // Calcular nueva fecha de inicio restando los días de penalización
    const millisecondsToSubtract = daysToSubtract * 24 * 60 * 60 * 1000;
    const newStartDate = new Date(startDate.getTime() + millisecondsToSubtract);
    
    // Si la penalización es mayor que el progreso actual, poner en día 0
    if (daysToSubtract >= currentDays) {
      setStartDate(new Date());
      localStorage.setItem('vaping-quit-date', new Date().toISOString());
      resetAchievements();
      penaltyMessage += ' Como la penalización supera tu progreso actual, el contador se ha puesto en cero.';
    } else {
      // Aplicar la penalización normal
      setStartDate(newStartDate);
      localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
      
      // Calcular nuevos días después de la penalización
      const newDays = Math.max(0, Math.floor((currentTime.getTime() - newStartDate.getTime()) / (1000 * 60 * 60 * 24)));
      
      // Ajustar medallas según los nuevos días
      adjustMedalsAfterRelapse(currentDays, newDays);
      
      penaltyMessage += ` Ahora tienes ${newDays} días de progreso.`;
    }
    
    // Incrementar contador de recaídas
    const newRelapseCount = relapseCount + 1;
    setRelapseCount(newRelapseCount);
    localStorage.setItem('relapse-count', newRelapseCount.toString());
    
    alert(penaltyMessage);
  };

  return { handleRelapse, relapseCount };
};