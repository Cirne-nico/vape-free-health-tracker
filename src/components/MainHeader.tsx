
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, AlertTriangle, Trophy, User } from 'lucide-react';
import MedalDisplay from './MedalDisplay';

interface MainHeaderProps {
  time: {
    days: number;
    hours: number;
    minutes: number;
    totalHours: number;
  };
  savings: {
    total: number;
    daily: number;
  };
  progressPercentage: number;
  blurLevel: number;
  unlockedAchievements: any[];
  onRelapse: () => void;
}

const MainHeader = ({ 
  time, 
  savings, 
  progressPercentage, 
  blurLevel, 
  unlockedAchievements, 
  onRelapse 
}: MainHeaderProps) => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const savedUserName = localStorage.getItem('user-name');
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  const getMotivationalMessage = () => {
    const messages = [
      `¡Excelente trabajo${userName ? `, ${userName}` : ''}! Cada minuto sin vapear es una victoria.`,
      `¡Sigue así${userName ? `, ${userName}` : ''}! Tu salud te lo agradece.`,
      `¡Increíble progreso${userName ? `, ${userName}` : ''}! Estás transformando tu vida.`,
      `¡Eres imparable${userName ? `, ${userName}` : ''}! Cada día es un nuevo logro.`,
      `¡Fantástico${userName ? `, ${userName}` : ''}! Tu determinación es inspiradora.`,
    ];
    
    if (time.days === 0) {
      return `¡Bienvenido${userName ? `, ${userName}` : ''}! Has dado el primer paso más importante.`;
    }
    
    const messageIndex = time.days % messages.length;
    return messages[messageIndex];
  };

  return (
    <div className="space-y-6">
      {/* Mensaje de bienvenida personalizado */}
      {userName && (
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold">¡Hola, {userName}!</h2>
                <p className="text-blue-100 text-sm">
                  {getMotivationalMessage()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header principal con estadísticas */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            {/* Tiempo transcurrido */}
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">
                {time.days > 0 ? `${time.days} días` : `${time.hours}h ${time.minutes}m`}
              </h1>
              <p className="text-green-100">sin vapear</p>
            </div>

            {/* Progreso visual */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso hacia los 30 días</span>
                <span>{Math.min(progressPercentage, 100).toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(progressPercentage, 100)} className="h-3" />
            </div>

            {/* Estadísticas en grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {/* Tiempo total */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="w-4 h-4 mr-1" />
                </div>
                <p className="text-2xl font-bold">{time.totalHours}</p>
                <p className="text-green-100 text-sm">horas totales</p>
              </div>

              {/* Ahorros */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                </div>
                <p className="text-2xl font-bold">{savings.total.toFixed(0)}€</p>
                <p className="text-green-100 text-sm">ahorrado</p>
              </div>

              {/* Logros */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Trophy className="w-4 h-4 mr-1" />
                </div>
                <p className="text-2xl font-bold">{unlockedAchievements.length}</p>
                <p className="text-green-100 text-sm">logros</p>
              </div>

              {/* Botón de recaída */}
              <div className="text-center">
                <Button
                  onClick={onRelapse}
                  variant="outline"
                  size="sm"
                  className="bg-red-500/20 border-red-300 text-white hover:bg-red-500/30 w-full"
                >
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Recaída
                </Button>
              </div>
            </div>

            {/* Medallas desbloqueadas */}
            {unlockedAchievements.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2 text-green-100">Últimos logros:</h3>
                <div className="flex gap-2 flex-wrap">
                  {unlockedAchievements.slice(-3).map((achievement, index) => (
                    <MedalDisplay
                      key={index}
                      medal={achievement.medal}
                      size="sm"
                      showTooltip={true}
                      tooltipContent={achievement.title}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainHeader;
