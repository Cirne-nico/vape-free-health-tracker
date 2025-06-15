import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [relapseCount, setRelapseCount] = useState(0);
  const [showRelapseDialog, setShowRelapseDialog] = useState(false);
  const [relapseCompleted, setRelapseCompleted] = useState(false);

  useEffect(() => {
    const savedRelapseCount = localStorage.getItem('relapse-count');
    if (savedRelapseCount) {
      setRelapseCount(parseInt(savedRelapseCount));
    }
  }, []);

  const processRelapse = () => {
    if (!startDate) return;
    
    const currentDays = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Si tiene menos de 7 días, reiniciar completamente
    if (currentDays < 7) {
      const newStartDate = new Date();
      setStartDate(newStartDate);
      localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
      resetAchievements();
      toast.success(t('relapseHandler.restartMessage') || 'Proceso reiniciado. ¡Vuelve a empezar con fuerza!');
      setRelapseCompleted(true);
      return;
    }
    
    let daysToSubtract = 0;
    let penaltyMessage = '';
    
    // Definir penalizaciones según el número de recaída
    switch (relapseCount) {
      case 0:
        daysToSubtract = 7; // 1 semana
        penaltyMessage = t('relapseHandler.firstRelapse') || 'Primera recaída: se han restado 7 días de tu progreso.';
        break;
      case 1:
        daysToSubtract = 30; // 1 mes
        penaltyMessage = t('relapseHandler.secondRelapse') || 'Segunda recaída: se ha restado 1 mes (30 días) de tu progreso.';
        break;
      case 2:
        daysToSubtract = 90; // 3 meses
        penaltyMessage = t('relapseHandler.thirdRelapse') || 'Tercera recaída: se han restado 3 meses (90 días) de tu progreso.';
        break;
      case 3:
        daysToSubtract = 270; // 9 meses
        penaltyMessage = t('relapseHandler.fourthRelapse') || 'Cuarta recaída: se han restado 9 meses (270 días) de tu progreso.';
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
        toast.success(t('relapseHandler.fifthRelapse') || 'Quinta recaída: se ha reiniciado todo el proceso completamente.');
        setRelapseCompleted(true);
        return;
    }
    
    // Verificar si la penalización es mayor que el progreso actual
    if (daysToSubtract >= currentDays) {
      // Si la penalización supera el progreso, reiniciar a hoy
      const newStartDate = new Date();
      setStartDate(newStartDate);
      localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
      resetAchievements();
      
      toast.success(penaltyMessage + (t('relapseHandler.penaltyExceedsProgress') || ' Como la penalización supera tu progreso actual, el contador se ha puesto en cero.'));
    } else {
      // Calcular nueva fecha de inicio sumando los días de penalización
      const millisecondsToAdd = daysToSubtract * 24 * 60 * 60 * 1000;
      const newStartDate = new Date(startDate.getTime() + millisecondsToAdd);
      
      setStartDate(newStartDate);
      localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
      
      // Calcular nuevos días después de la penalización
      const newDays = Math.max(0, Math.floor((currentTime.getTime() - newStartDate.getTime()) / (1000 * 60 * 60 * 24)));
      
      // Ajustar medallas según los nuevos días
      adjustMedalsAfterRelapse(currentDays, newDays);
      
      toast.success(`${penaltyMessage} ${t('relapseHandler.newProgress', {days: newDays}) || `Ahora tienes ${newDays} días de progreso.`}`);
    }
    
    // Incrementar contador de recaídas
    const newRelapseCount = relapseCount + 1;
    setRelapseCount(newRelapseCount);
    localStorage.setItem('relapse-count', newRelapseCount.toString());
    setRelapseCompleted(true);
  };

  const handleRelapse = () => {
    setShowRelapseDialog(true);
  };

  const closeRelapseDialog = () => {
    setShowRelapseDialog(false);
    setRelapseCompleted(false);
  };

  const RelapseDialog = () => {
    if (!showRelapseDialog) return null;

    return (
      <Dialog open={showRelapseDialog} onOpenChange={closeRelapseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-red-600">
              {relapseCompleted ? 
                (t('relapseHandler.relapseProcessed') || "Recaída procesada") : 
                (t('relapseHandler.confirmRelapse') || "¿Confirmar recaída?")}
            </DialogTitle>
          </DialogHeader>
          
          {!relapseCompleted ? (
            <div className="space-y-4">
              <p className="text-center text-gray-700">
                {t('relapseHandler.confirmMessage') || "¿Estás seguro de que quieres registrar una recaída? Esto afectará tu progreso actual."}
              </p>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-700">
                  {t('relapseHandler.penaltyWarning') || "Dependiendo del número de recaídas previas, la penalización puede ser de 7 días a un reinicio completo."}
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={closeRelapseDialog}
                >
                  {t('relapseHandler.cancel') || "Cancelar"}
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={processRelapse}
                >
                  {t('relapseHandler.confirm') || "Confirmar recaída"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-center text-green-700">
                  {t('relapseHandler.processed') || "Tu recaída ha sido procesada. Recuerda que cada tropiezo es una oportunidad para aprender."}
                </p>
              </div>
              
              <Button 
                className="w-full"
                onClick={closeRelapseDialog}
              >
                {t('relapseHandler.continue') || "Continuar"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  return { 
    handleRelapse, 
    relapseCount,
    RelapseDialog
  };
};