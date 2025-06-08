
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, TrendingUp, AlertTriangle, Trophy, User, Info } from 'lucide-react';
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
  progressInfo: {
    target: number;
    targetLabel: string;
    isFirstPhase: boolean;
  };
  blurLevel: number;
  unlockedAchievements: any[];
  unlockedHealthAchievements: any[];
  onRelapse: () => void;
}

const MainHeader = ({ 
  time, 
  savings, 
  progressPercentage, 
  progressInfo,
  blurLevel, 
  unlockedAchievements,
  unlockedHealthAchievements,
  onRelapse 
}: MainHeaderProps) => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const savedUserName = localStorage.getItem('user-name');
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  const totalMedals = unlockedAchievements.length + unlockedHealthAchievements.length;

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
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header principal con imagen de fondo y efecto blur */}
        <Card className="relative overflow-hidden text-white">
          {/* Imagen de fondo con blur */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: `blur(${blurLevel}px)`,
            }}
          />
          
          {/* Overlay para mejorar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-blue-600/80" />
          
          <CardContent className="relative p-6 z-10">
            <div className="flex flex-col space-y-4">
              {/* Título principal fijo */}
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Ya sin nicotina, el cuerpo escucha:
                </h1>
                <h2 className="text-xl font-semibold text-green-100">
                  comienza la sociabilidad mínima
                </h2>
              </div>

              {/* Tiempo transcurrido */}
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">
                  {time.days > 0 ? `${time.days} días` : `${time.hours}h ${time.minutes}m`}
                </h3>
                <p className="text-green-100">sin vapear</p>
              </div>

              {/* Progreso visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso hacia {progressInfo.targetLabel}</span>
                  <span>{Math.min(progressPercentage, 100).toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(progressPercentage, 100)} className="h-3" />
                {!progressInfo.isFirstPhase && (
                  <div className="text-xs text-green-200 text-center">
                    ¡Ya superaste los 90 días! Ahora hacia la meta de 2 años
                  </div>
                )}
              </div>

              {/* Estadísticas centrales */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="bg-black/20 backdrop-blur-sm rounded p-3">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 mr-1" />
                  </div>
                  <p className="text-2xl font-bold">{time.totalHours}</p>
                  <p className="text-green-100 text-sm">horas totales</p>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded p-3">
                  <div className="flex items-center justify-center mb-1">
                    <Trophy className="w-4 h-4 mr-1" />
                  </div>
                  <p className="text-2xl font-bold">{totalMedals}</p>
                  <p className="text-green-100 text-sm">medallas</p>
                </div>
              </div>

              {/* Margen inferior: medallas de izquierda a derecha + botón recaída a la derecha */}
              <div className="mt-6 flex items-center justify-between">
                {/* Medallas acumulándose de izquierda a derecha */}
                <div className="flex-1">
                  {totalMedals > 0 ? (
                    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/20 inline-block">
                      <MedalDisplay
                        unlockedAchievements={unlockedAchievements}
                        unlockedHealthAchievements={unlockedHealthAchievements}
                        totalSavings={savings.total}
                      />
                    </div>
                  ) : (
                    <div className="text-green-100/60 text-sm">
                      Las medallas aparecerán aquí conforme consigas logros
                    </div>
                  )}
                </div>

                {/* Botón de recaída en el margen derecho */}
                <div className="ml-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={onRelapse}
                        variant="outline"
                        size="sm"
                        className="bg-red-500/20 border-red-300 text-white hover:bg-red-500/30 relative"
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Recaída
                        <Info className="w-3 h-3 ml-1 opacity-70" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs p-3 text-sm">
                      <div className="space-y-1">
                        <p className="font-semibold">Penalizaciones por recaída:</p>
                        <p>• 1ª recaída: -1 semana</p>
                        <p>• 2ª recaída: -1 mes</p>
                        <p>• 3ª recaída: -3 meses</p>
                        <p>• 4ª recaída: -9 meses</p>
                        <p>• 5ª recaída: reinicia el proceso</p>
                        <p className="text-muted-foreground text-xs mt-2">
                          Si el retroceso supera los días acumulados, el contador se pondrá en cero.
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default MainHeader;
