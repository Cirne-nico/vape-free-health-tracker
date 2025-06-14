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

  const getCriticalQuote = () => {
    const quotes = [
      // Foucault - sobre el control y la disciplina
      "El poder no es algo que se posea, sino algo que actúa. — M. Foucault",
      
      // Judith Butler - sobre la performatividad y la repetición
      "La repetición nunca es meramente mecánica. — J. Butler",
      
      // Angela Davis - sobre la libertad y la resistencia
      "La libertad es una lucha constante. — A. Davis",
      
      // Audre Lorde - sobre el autocuidado como acto político
      "Cuidar de mí misma no es autocomplacencia, es autopreservación. — A. Lorde",
      
      // Silvia Federici - sobre el cuerpo como territorio de lucha
      "El cuerpo es el primer territorio que debemos recuperar. — S. Federici",
      
      // Donna Haraway - sobre la agencia y la responsabilidad
      "La respuesta-habilidad requiere cultivar la capacidad de responder. — D. Haraway",
      
      // Byung-Chul Han - sobre la autoexplotación
      "El sujeto neoliberal se explota a sí mismo más eficazmente que cualquier poder externo. — B-C. Han",
      
      // Hannah Arendt - sobre la acción y la libertad
      "El poder corresponde a la capacidad humana de actuar concertadamente. — H. Arendt",
      
      // Virginie Despentes - sobre la autonomía corporal
      "Mi cuerpo me pertenece. Esta frase tan simple es revolucionaria. — V. Despentes",
      
      // Rita Segato - sobre la colonialidad del poder
      "La descolonización es también una descolonización del deseo. — R. Segato",
      
      // Luce Irigaray - sobre la relación con uno mismo
      "Cultivar una relación consigo mismo es el primer gesto ético. — L. Irigaray",
      
      // Patricia Hill Collins - sobre el conocimiento situado
      "El conocimiento surge de la experiencia vivida. — P. Hill Collins",
      
      // Ochy Curiel - sobre la autonomía
      "La autonomía no es aislamiento, es autodeterminación. — O. Curiel",
      
      // Vandana Shiva - sobre la libertad y la dependencia
      "La libertad real incluye la libertad de las dependencias destructivas. — V. Shiva",
      
      // María Lugones - sobre la resistencia
      "Resistir es crear mundos alternativos. — M. Lugones"
    ];
    
    // Usar el día para seleccionar la cita, pero con cierta rotación
    const index = (time.days + Math.floor(time.hours / 6)) % quotes.length;
    return quotes[index];
  };

  return (
    <TooltipProvider>
      {/* Header principal con imagen de fondo y optimizado para Android */}
      <Card className="relative overflow-hidden text-white rounded-none mx-0">
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
        
        <CardContent className="relative p-4 sm:p-6 z-10">
          <div className="flex flex-col space-y-4">
            {/* Logo y título de la app centrado para Android */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Logo size="sm" className="text-white flex-shrink-0" />
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-none tracking-wide">
                  UMBRAL
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-black italic font-medium">
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
                {time.days > 0 ? `${time.days} días sin vapear` : `${time.hours}h ${time.minutes}m sin vapear`}
              </h4>
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

            {/* Cita crítica en lugar de mensaje motivacional */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-green-100 italic font-light leading-relaxed">
                {getCriticalQuote()}
              </p>
            </div>

            {/* Botón de recaída reducido 30% */}
            <div className="flex justify-center pt-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onRelapse}
                    variant="outline"
                    className="bg-red-500/20 border-red-300 text-white hover:bg-red-500/30 relative text-xs px-2 py-1 h-7"
                  >
                    <AlertTriangle className="w-2.5 h-2.5 mr-1" />
                    Recaída
                    <Info className="w-2 h-2 ml-1 opacity-70" />
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