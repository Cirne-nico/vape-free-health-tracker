import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Zap, Droplets, Dumbbell } from 'lucide-react';

interface PanicButtonProps {
  isOpen: boolean;
  onClose: () => void;
}

const PanicButton = ({ isOpen, onClose }: PanicButtonProps) => {
  const { t } = useTranslation();
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const panicActions = [
    {
      id: 'water',
      title: t('panicButton.actions.water.title'),
      description: t('panicButton.actions.water.description'),
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      time: t('panicButton.actions.water.time')
    },
    {
      id: 'breathing',
      title: t('panicButton.actions.breathing.title'),
      description: t('panicButton.actions.breathing.description'),
      icon: <Zap className="w-6 h-6 text-green-500" />,
      time: t('panicButton.actions.breathing.time')
    },
    {
      id: 'exercise',
      title: t('panicButton.actions.exercise.title'),
      description: t('panicButton.actions.exercise.description'),
      icon: <Dumbbell className="w-6 h-6 text-red-500" />,
      time: t('panicButton.actions.exercise.time')
    },
    {
      id: 'manipulate',
      title: t('panicButton.actions.manipulate.title'),
      description: t('panicButton.actions.manipulate.description'),
      icon: <span className="text-2xl">✋</span>,
      time: t('panicButton.actions.manipulate.time')
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
            {t('panicButton.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              {t('panicButton.instructions')}
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
                <h4 className="font-bold text-green-800 mb-2">{t('panicButton.completed.title')}</h4>
                <p className="text-sm text-green-700">
                  {t('panicButton.completed.message')}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2">
            <Button onClick={handleClose} className="flex-1">
              {allCompleted ? t('panicButton.continueButton') : t('panicButton.closeButton')}
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            {t('panicButton.reminder')}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PanicButton;