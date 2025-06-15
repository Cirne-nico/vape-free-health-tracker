import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Lock, Users, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FirstDayAlertProps {
  startDate: Date | null;
}

const FirstDayAlert = ({ startDate }: FirstDayAlertProps) => {
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (startDate) {
      const hoursSince = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60));
      
      // Mostrar alerta solo en las primeras 24 horas y solo una vez
      if (hoursSince <= 24) {
        const hasShownFirstDayAlert = localStorage.getItem('first-day-alert-shown');
        if (!hasShownFirstDayAlert) {
          setShowAlert(true);
        }
      }
    }
  }, [startDate]);

  const handleClose = () => {
    setShowAlert(false);
    localStorage.setItem('first-day-alert-shown', 'true');
  };

  if (!showAlert) return null;

  const tips = [
    {
      icon: <Lock className="w-6 h-6 text-red-500" />,
      title: 'Barrera Física',
      description: 'Limpia y guarda el vapeador en un lugar con barrera física (armario con llave, dársela a una amiga, que alguien te la esconda).',
      priority: 'CRÍTICO'
    },
    {
      icon: <Eye className="w-6 h-6 text-orange-500" />,
      title: 'Fuera de Vista',
      description: 'Retira todos los elementos relacionados: cargadores, líquidos, resistencias. Si no los ves, no los recuerdas.',
      priority: 'IMPORTANTE'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: 'Avisa a tu Red',
      description: 'Informa a 2-3 personas cercanas que has comenzado el proceso. Pídeles que te apoyen y no te ofrezcan vapear.',
      priority: 'RECOMENDADO'
    }
  ];

  return (
    <Dialog open={showAlert} onOpenChange={setShowAlert}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-red-600 flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            🚨 PROTOCOLO DÍA 1 - URGENCIAS MÉDICAS
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
            <h3 className="font-bold text-red-800 text-center mb-2">
              ⚠️ PRIMERAS 24 HORAS CRÍTICAS
            </h3>
            <p className="text-sm text-red-700 text-center">
              Las próximas horas son las más difíciles. Estos tips están basados en protocolos médicos para cesación de nicotina.
            </p>
          </div>

          <div className="space-y-3">
            {tips.map((tip, index) => (
              <Card key={index} className="border-l-4 border-l-red-400">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {tip.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-sm">{tip.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          tip.priority === 'CRÍTICO' ? 'bg-red-100 text-red-700' :
                          tip.priority === 'IMPORTANTE' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {tip.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">💪 Recuerda:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Los primeros 3 días son los más duros</li>
              <li>• Cada hora que pasa, tu cuerpo se recupera</li>
              <li>• Tienes un botón de pánico disponible en la app</li>
              <li>• Miles de personas han pasado por esto y lo han logrado</li>
            </ul>
          </div>

          <Button onClick={handleClose} className="w-full bg-red-600 hover:bg-red-700">
            Entendido - Comenzar el Proceso
          </Button>

          <div className="text-xs text-gray-500 text-center">
            💡 Esta alerta solo aparece una vez. Puedes acceder a estos tips desde la sección "Poderío".
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FirstDayAlert;