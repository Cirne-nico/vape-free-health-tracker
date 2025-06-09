
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, TrendingUp, AlertTriangle, Trophy, User, Info } from 'lucide-react';
import Logo from './Logo';

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
      {/* Header principal con imagen de fondo y sin márgenes exteriores */}
      <Card className="relative overflow-hidden text-white rounded-none -m-2 sm:-m-4">
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
        
        <CardContent className="relative p-3 sm:p-4 z-10">
          <div className="flex flex-col space-y-3 sm:space-y-4">
            {/* Logo y título de la app reorganizado */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Logo size="sm" className="text-white flex-shrink-0" />
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-none tracking-wide">
                  UMBRAL
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-green-100 leading-tight">
                acompaña tu proceso de abandono del vapeo
              </p>
            </div>

            {/* Título principal más elegante */}
            <div className="text-center space-y-1">
              <h2 className="text-base sm:text-xl font-bold text-white">
                Ya sin nicotina, el cuerpo escucha:
              </h2>
              <h3 className="text-sm sm:text-lg font-semibold text-green-100">
                hacia la sociabilidad mínima
              </h3>
            </div>

            {/* Tiempo transcurrido con mejor jerarquía */}
            <div className="text-center py-2">
              <h4 className="text-2xl sm:text-3xl font-bold mb-1">
                {time.days > 0 ? `${time.days} días` : `${time.hours}h ${time.minutes}m`}
              </h4>
              <p className="text-green-100 text-sm font-medium">sin vapear</p>
            </div>

            {/* Progreso visual */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Progreso hacia {progressInfo.targetLabel}</span>
                <span className="font-semibold">{Math.min(progressPercentage, 100).toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(progressPercentage, 100)} className="h-2" />
              {!progressInfo.isFirstPhase && (
                <div className="text-xs text-green-200 text-center">
                  ¡Ya superaste los 90 días! Ahora hacia la meta de 2 años
                </div>
              )}
            </div>

            {/* Estadísticas centrales */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="w-4 h-4 mr-1" />
                </div>
                <p className="text-lg sm:text-xl font-bold">{time.totalHours}</p>
                <p className="text-green-100 text-xs">horas totales</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <Trophy className="w-4 h-4 mr-1" />
                </div>
                <p className="text-lg sm:text-xl font-bold">{totalMedals}</p>
                <p className="text-green-100 text-xs">medallas</p>
              </div>
            </div>

            {/* Botón de recaída */}
            <div className="flex justify-center pt-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onRelapse}
                    variant="outline"
                    size="sm"
                    className="bg-red-500/20 border-red-300 text-white hover:bg-red-500/30 relative text-xs sm:text-sm"
                  >
                    <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Recaída
                    <Info className="w-2 h-2 sm:w-3 sm:h-3 ml-1 opacity-70" />
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
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default MainHeader;
