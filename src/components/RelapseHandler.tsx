
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
    
    if (currentDays < 7) {
      setStartDate(new Date());
      localStorage.setItem('vaping-quit-date', new Date().toISOString());
      resetAchievements();
      return;
    }
    
    let newStartDate = new Date();
    let penaltyMessage = '';
    let daysLost = 0;
    
    switch (relapseCount) {
      case 0:
        daysLost = 7;
        if (currentDays >= daysLost) {
          newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
        } else {
          newStartDate = new Date();
        }
        penaltyMessage = 'Primera recaída: se ha restado una semana de tu progreso y las medallas correspondientes.';
        break;
      case 1:
        daysLost = 30;
        if (currentDays >= daysLost) {
          newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
        } else {
          newStartDate = new Date();
        }
        penaltyMessage = 'Segunda recaída: se ha restado un mes de tu progreso y las medallas correspondientes.';
        break;
      case 2:
        daysLost = 90;
        if (currentDays >= daysLost) {
          newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
        } else {
          newStartDate = new Date();
        }
        penaltyMessage = 'Tercera recaída: se han restado 3 meses de tu progreso y las medallas correspondientes.';
        break;
      case 3:
        daysLost = 270;
        if (currentDays >= daysLost) {
          newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
        } else {
          newStartDate = new Date();
        }
        penaltyMessage = 'Cuarta recaída: se han restado 9 meses de tu progreso y las medallas correspondientes.';
        break;
      case 4:
      default:
        newStartDate = new Date();
        penaltyMessage = 'Quinta recaída: se ha reiniciado todo el proceso.';
        setRelapseCount(-1);
        resetAchievements();
        break;
    }
    
    const newRelapseCount = relapseCount + 1;
    setStartDate(newStartDate);
    setRelapseCount(newRelapseCount);
    
    localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
    localStorage.setItem('relapse-count', newRelapseCount.toString());
    
    const newDays = Math.max(0, Math.floor((currentTime.getTime() - newStartDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    if (relapseCount < 4) {
      adjustMedalsAfterRelapse(currentDays, newDays);
    }
    
    alert(penaltyMessage);
  };

  return { handleRelapse, relapseCount };
};
