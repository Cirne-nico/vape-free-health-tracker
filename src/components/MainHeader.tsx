import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Clock, Euro, Trophy, Zap } from 'lucide-react';
import MedalDisplay from './MedalDisplay';

interface Achievement {
  id: string;
  title: string;
  description: string;
  days: number;
  icon: string;
  reward: string;
}

interface MainHeaderProps {
  time: {
    days: number;
    hours: number;
    minutes: number;
    totalHours: number;
  };
  savings: {
    total: number;
    daily: any;
  };
  progressPercentage: number;
  blurLevel: number;
  unlockedAchievements: Achievement[];
  currentDay: number;
  onRelapse: () => void;
}

const MainHeader = ({ 
  time, 
  savings, 
  progressPercentage, 
  blurLevel, 
  unlockedAchievements,
  currentDay,
  onRelapse 
}: MainHeaderProps) => {
  const [showRelapseDialog, setShowRelapseDialog] = useState(false);

  const calculateQuote = () => {
    const quotes = [
      "Cada día sin vapear es una victoria.",
      "El cambio comienza con una decisión.",
      "Tu salud es tu mayor riqueza.",
      "Respira profundo y sigue adelante.",
      "El futuro es libre de humo."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const handleRelapseClick = () => {
    setShowRelapseDialog(true);
  };

  const handleConfirmRelapse = () => {
    onRelapse();
    setShowRelapseDialog(false);
  };

  const handleCancelRelapse = () => {
    setShowRelapseDialog(false);
  };

  const quote = calculateQuote();

  return (
    <div className="relative">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-lg">
        <CardContent className="p-6">
          {/* Header principal */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                🌟 Tu Progreso Sin Vapear
              </h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="bg-white/60 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{time.days}</div>
                  <div className="text-sm text-gray-600">días</div>
                </div>
                <div className="bg-white/60 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{time.hours}</div>
                  <div className="text-sm text-gray-600">horas</div>
                </div>
                <div className="bg-white/60 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{time.minutes}</div>
                  <div className="text-sm text-gray-600">minutos</div>
                </div>
                <div className="bg-white/60 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{savings.total.toFixed(2)}€</div>
                  <div className="text-sm text-gray-600">ahorrados</div>
                </div>
              </div>
            </div>
            
            {/* Medallas */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                Medallas conseguidas
              </div>
              <MedalDisplay 
                unlockedAchievements={unlockedAchievements}
                totalSavings={savings.total}
                currentDay={time.days}
              />
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 flex items-center gap-1 mb-1">
              <Zap className="w-4 h-4" />
              Progreso total
            </div>
            <Progress value={progressPercentage} className="h-4" style={{ filter: `blur(${blurLevel}px)` }} />
            <div className="text-xs text-gray-600 mt-1 text-right">{progressPercentage}%</div>
          </div>

          {/* Frase motivacional */}
          <div className="mb-4 p-4 bg-white/60 rounded-lg italic text-gray-700">
            {quote}
          </div>

          {/* Botón de recaída */}
          <Button 
            variant="destructive"
            onClick={handleRelapseClick}
            className="w-full flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            He tenido una recaída
          </Button>
        </CardContent>
      </Card>

      {/* Diálogo de confirmación de recaída */}
      {showRelapseDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              ¿Confirmas que has tenido una recaída?
            </h2>
            <p className="text-gray-700 mb-4">
              Al confirmar, se ajustará tu progreso.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={handleCancelRelapse}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleConfirmRelapse}>
                Confirmar Recaída
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainHeader;
