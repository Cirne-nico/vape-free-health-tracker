import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DorsalStateContent from './DorsalStateContent';

interface DorsalStateAlertProps {
  emotionLogs: any[];
}

const DorsalStateAlert = ({ emotionLogs }: DorsalStateAlertProps) => {
  const { t, i18n } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [consecutiveDorsalDays, setConsecutiveDorsalDays] = useState(0);

  useEffect(() => {
    // Verificar cuántas veces se ha mostrado la alerta
    const alertCountStored = parseInt(localStorage.getItem('dorsal-alert-count') || '0');
    setAlertCount(alertCountStored);

    // Contar días consecutivos con estados dorsales
    if (emotionLogs.length > 0) {
      let count = 0;
      // Recorrer los logs desde el más reciente
      for (let i = emotionLogs.length - 1; i >= 0; i--) {
        const log = emotionLogs[i];
        const hasDorsalEmotions = log.emotions.some((id: string) => 
          ['depressed', 'sad', 'indifferent', 'foggy'].includes(id)
        );
        
        if (hasDorsalEmotions) {
          count++;
        } else {
          // Si encontramos un día sin emociones dorsales, rompemos la secuencia
          break;
        }
      }
      
      setConsecutiveDorsalDays(count);
      
      // Verificar si hay suficientes días consecutivos de estados dorsales (5+)
      if (count >= 5) {
        // Verificar si han pasado al menos 7 días desde la última alerta
        const lastAlertDate = localStorage.getItem('last-dorsal-alert-date');
        const today = new Date().toDateString();
        
        if (!lastAlertDate || 
            (new Date(today).getTime() - new Date(lastAlertDate).getTime()) >= 7 * 24 * 60 * 60 * 1000) {
          setShowAlert(true);
        }
      }
    }
  }, [emotionLogs]);

  const handleClose = () => {
    setShowAlert(false);
    const newCount = alertCount + 1;
    setAlertCount(newCount);
    localStorage.setItem('dorsal-alert-count', newCount.toString());
    localStorage.setItem('last-dorsal-alert-date', new Date().toDateString());
    
    // Resetear el contador de días dorsalizados cuando el usuario reconoce la alerta
    localStorage.setItem('consecutive-dorsal-days', '0');
  };

  if (!showAlert) return null;

  // Seleccionar el contenido basado en el contador de alertas
  const contentIndex = alertCount % 8; // Usamos 8 contenidos diferentes (4 originales + 4 nuevos)

  return (
    <Dialog open={showAlert} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700">
            <Brain className="w-6 h-6" />
            {i18n.language === 'en' ? "Neurobiological Information" : "Información Neurobiológica"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>
                {consecutiveDorsalDays >= 5 ? 
                  (i18n.language === 'en' ? 
                    `${consecutiveDorsalDays} consecutive days in dorsal state detected` : 
                    `${consecutiveDorsalDays} días consecutivos en estado dorsal detectados`) : 
                  (i18n.language === 'en' ? 
                    "Dorsal state pattern detected" : 
                    "Patrón de estado dorsal detectado")
                }
              </strong>
            </AlertDescription>
          </Alert>

          <DorsalStateContent contentIndex={contentIndex} />

          <Button onClick={handleClose} className="w-full">
            {i18n.language === 'en' ? "Understood" : "Entendido"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DorsalStateAlert;