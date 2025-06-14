import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Zap, Droplets, Dumbbell } from 'lucide-react';

interface PanicButtonProps {
  isOpen: boolean;
  onClose: () => void;
}

const PanicButton = ({ isOpen, onClose }: PanicButtonProps) => {
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const panicActions = [
    {
      id: 'water',
      title: 'Bebe Agua',
      description: 'Toma un vaso de agua completo',
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      time: '30 segundos'
    },
    {
      id: 'breathing',
      title: 'Respira 4-6',
      description: 'Inhala 4s → Aguanta 2s → Exhala 6s (5 veces)',
      icon: <Zap className="w-6 h-6 text-green-500" />,
      time: '1 minuto'
    },
    {
      id: 'exercise',
      title: 'Ejercicio Rápido',
      description: '10 sentadillas o flexiones',
      icon: <Dumbbell className="w-6 h-6 text-red-500" />,
      time: '2 minutos'
    },
    {
      id: 'manipulate',
      title: 'Manipula Objeto',
      description: 'Usa bolígrafo, moneda o cualquier objeto en tus manos',
      icon: <span className="text-2xl">✋</span>,
      time: '2 minutos'
    }
  ];

  const handleActionComplete = (actionId: string) => {
    if (!completedActions.includes(actionId)) {
      setCompletedActions([...completedActions, actionId]);
    }
  };

  const handleClose = () => {
    setCompletedActions([]);
    onClose();
  };

  const allCompleted = completedActions.length === panicActions.length;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-red-600 flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Protocolo Anti-Antojo
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Sigue estos pasos en orden. Cada uno te ayudará a superar el antojo:
            </p>
          </div>

          <div className="space-y-3">
            {panicActions.map((action, index) => (
              <Card 
                key={action.id} 
                className={`${
                  completedActions.includes(action.id) 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{action.title}</h4>
                        <p className="text-xs text-gray-600">{action.description}</p>
                        <p className="text-xs text-blue-600 mt-1">⏱️ {action.time}</p>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant={completedActions.includes(action.id) ? "default" : "outline"}
                      onClick={() => handleActionComplete(action.id)}
                      disabled={completedActions.includes(action.id)}
                      className="ml-2"
                    >
                      {completedActions.includes(action.id) ? '✓' : `${index + 1}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {allCompleted && (
            <Card className="bg-green-100 border-green-300">
              <CardContent className="p-4 text-center">
                <h4 className="font-bold text-green-800 mb-2">🎉 ¡Protocolo Completado!</h4>
                <p className="text-sm text-green-700">
                  Has superado el antojo. Tu fuerza de voluntad se ha fortalecido.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2">
            <Button onClick={handleClose} className="flex-1">
              {allCompleted ? 'Continuar Fuerte' : 'Cerrar'}
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            💡 Recuerda: Los antojos duran máximo 5 minutos. Ya estás más cerca de superarlo.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PanicButton;