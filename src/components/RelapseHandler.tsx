import { useState, useEffect } from 'react';
import { toast } from 'sonner';

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
      const newStartDate = new Date();
      setStartDate(newStartDate);
      localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
      resetAchievements();
      toast.success('Proceso reiniciado. ¡Vuelve a empezar con fuerza!');
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
        const newStartDate = new Date();
        setStartDate(newStartDate);
        setRelapseCount(0); // Reiniciar contador de recaídas también
        localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
        localStorage.setItem('relapse-count', '0');
        resetAchievements();
        toast.success('Quinta recaída: se ha reiniciado todo el proceso completamente.');
        return;
    }
    
    // CORRECCIÓN: Verificar si la penalización es mayor que el progreso actual
    if (daysToSubtract >= currentDays) {
      // Si la penalización supera el progreso, reiniciar a hoy
      const newStartDate = new Date();
      setStartDate(newStartDate);
      localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
      resetAchievements();
      
      toast.success(`${penaltyMessage} Como la penalización supera tu progreso actual, el contador se ha puesto en cero.`);
    } else {
      // Calcular nueva fecha de inicio sumando los días de penalización
      // CORRECCIÓN: Sumar días en lugar de restar para mover la fecha hacia adelante
      const millisecondsToAdd = daysToSubtract * 24 * 60 * 60 * 1000;
      const newStartDate = new Date(startDate.getTime() + millisecondsToAdd);
      
      setStartDate(newStartDate);
      localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
      
      // Calcular nuevos días después de la penalización
      const newDays = Math.max(0, Math.floor((currentTime.getTime() - newStartDate.getTime()) / (1000 * 60 * 60 * 24)));
      
      // Ajustar medallas según los nuevos días
      adjustMedalsAfterRelapse(currentDays, newDays);
      
      toast.success(`${penaltyMessage} Ahora tienes ${newDays} días de progreso.`);
    }
    
    // Incrementar contador de recaídas
    const newRelapseCount = relapseCount + 1;
    setRelapseCount(newRelapseCount);
    localStorage.setItem('relapse-count', newRelapseCount.toString());
  };

  return { handleRelapse, relapseCount };
};