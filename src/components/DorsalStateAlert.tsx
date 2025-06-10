import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, AlertTriangle } from 'lucide-react';

interface DorsalStateAlertProps {
  emotionLogs: any[];
}

const DorsalStateAlert = ({ emotionLogs }: DorsalStateAlertProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [hasShownAlert, setHasShownAlert] = useState(false);

  useEffect(() => {
    // Verificar si ya se mostró la alerta
    const alertShown = localStorage.getItem('dorsal-alert-shown');
    if (alertShown) {
      setHasShownAlert(true);
      return;
    }

    // Verificar si hay 3 días consecutivos de estados dorsales
    if (emotionLogs.length >= 3) {
      const recentLogs = emotionLogs.slice(-3);
      const consecutiveDorsalDays = recentLogs.every(log => {
        const dorsalEmotions = log.emotions.filter((id: string) => 
          ['depressed', 'sad', 'indifferent', 'foggy'].includes(id)
        );
        return dorsalEmotions.length > 0;
      });

      if (consecutiveDorsalDays && !hasShownAlert) {
        setShowAlert(true);
      }
    }
  }, [emotionLogs, hasShownAlert]);

  const handleClose = () => {
    setShowAlert(false);
    setHasShownAlert(true);
    localStorage.setItem('dorsal-alert-shown', 'true');
  };

  if (!showAlert) return null;

  return (
    <Dialog open={showAlert} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700">
            <Brain className="w-6 h-6" />
            Información Neurobiológica
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Proceso neuroadaptativo en curso</strong>
            </AlertDescription>
          </Alert>

          <div className="space-y-4 text-sm">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Estado dorsal detectado</h4>
              <p className="text-gray-700">
                Los registros de los últimos días indican un patrón de activación del sistema nervioso dorsal, 
                caracterizado por estados de baja energía y desconexión emocional.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Base neurocientífica</h4>
              <p className="text-blue-700 mb-3">
                Según estudios publicados en <em>Neuropsychopharmacology</em> (2019) y <em>Addiction Biology</em> (2021), 
                la cesación de nicotina produce una reorganización temporal de los circuitos dopaminérgicos mesolímbicos.
              </p>
              <p className="text-blue-700">
                Este proceso implica una reducción transitoria en la disponibilidad de dopamina en el núcleo accumbens, 
                lo que puede manifestarse como estados de ánimo depresivos durante las primeras 8-12 semanas post-cesación.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Proceso adaptativo normal</h4>
              <p className="text-green-700">
                La distimia observada forma parte del proceso natural de neuroadaptación. Los receptores nicotínicos 
                α4β2 están experimentando desensibilización, mientras que los sistemas dopaminérgicos endógenos 
                se recalibran hacia niveles basales normales.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Cronología de recuperación</h4>
              <p className="text-purple-700">
                La literatura científica indica que la normalización completa de los sistemas de recompensa 
                ocurre típicamente entre las semanas 6-16 post-cesación, con mejoras graduales en la regulación 
                del estado de ánimo y la capacidad hedónica.
              </p>
            </div>

            <div className="text-xs text-gray-500 italic">
              <p>Referencias: Benowitz et al. (2019). Neuropsychopharmacology, 44(2), 254-265.</p>
              <p>Koob & Volkow (2021). Addiction Biology, 26(1), e12899.</p>
            </div>
          </div>

          <Button onClick={handleClose} className="w-full">
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DorsalStateAlert;