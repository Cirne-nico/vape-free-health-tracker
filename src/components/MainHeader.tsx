import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, TrendingUp, AlertTriangle, Trophy, User, Info, Zap } from 'lucide-react';
import Logo from './Logo';
import PanicButton from './PanicButton';

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
  textContrast: {
    primaryText: string;
    secondaryText: string;
    accentText: string;
    overlayIntensity: string;
  };
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
  textContrast, // ✅ NUEVA PROP PARA CONTRASTE ADAPTATIVO
  unlockedAchievements,
  unlockedHealthAchievements,
  onRelapse 
}: MainHeaderProps) => {
  const [userName, setUserName] = useState<string>('');
  const [showPanicButton, setShowPanicButton] = useState(false);

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
      {/* Header principal */}
      <Card className="relative overflow-hidden text-white rounded-lg">
        {/* Imagen de fondo con blur PROGRESIVO */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: `blur(${blurLevel}px)`, // ✅ BLUR PROGRESIVO: 8px → 0px en 365 días
          }}
        />
        
        {/* ✅ OVERLAY ADAPTATIVO: Se oscurece progresivamente para mantener contraste */}
        <div className={`absolute inset-0 bg-gradient-to-r ${textContrast.overlayIntensity}`} />
        
        <CardContent className="relative p-2 sm:p-3 z-10">
          <div className="flex flex-col space-y-1 sm:space-y-2">
            {/* Logo y título - ✅ CONTRASTE ADAPTATIVO */}
            <div className="text-center mb-1">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Logo size="sm" className="text-white flex-shrink-0" />
                <h1 className={`text-base sm:text-lg font-bold leading-none tracking-wide ${textContrast.primaryText}`}>
                  UMBRAL
                </h1>
              </div>
              <p className={`text-xs italic font-medium ${textContrast.accentText}`}>
                acompaña tu proceso de abandono del vapeo
              </p>
            </div>

            {/* Título principal - ✅ CONTRASTE ADAPTATIVO */}
            <div className="text-center">
              <h2 className={`text-sm sm:text-base font-bold ${textContrast.primaryText}`}>
                Ya sin nicotina, el cuerpo escucha:
              </h2>
              <h3 className={`text-xs sm:text-sm font-semibold ${textContrast.accentText}`}>
                hacia la sociabilidad mínima
              </h3>
            </div>

            {/* Tiempo transcurrido - ✅ CONTRASTE ADAPTATIVO */}
            <div className="text-center">
              <h4 className={`text-lg sm:text-xl font-bold ${textContrast.primaryText}`}>
                {time.days > 0 ? `${time.days} días sin vapear` : `${time.hours}h ${time.minutes}m sin vapear`}
              </h4>
            </div>

            {/* Progreso visual - ✅ CONTRASTE ADAPTATIVO */}
            <div className="space-y-1">
              <div className={`flex justify-between text-xs ${textContrast.secondaryText}`}>
                <span>Progreso hacia {progressInfo.targetLabel}</span>
                <span className="font-semibold">{Math.min(progressPercentage, 100).toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(progressPercentage, 100)} className="h-2" />
              {!progressInfo.isFirstPhase && (
                <div className={`text-xs text-center ${textContrast.accentText}`}>
                  ¡Ya superaste los 90 días! Ahora hacia la meta de 2 años
                </div>
              )}
            </div>

            {/* Estadísticas centrales - ✅ CONTRASTE ADAPTATIVO */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2">
                <div className="flex items-center justify-center gap-1">
                  <Clock className={`w-4 h-4 ${textContrast.accentText}`} />
                  <p className={`text-base sm:text-lg font-bold ${textContrast.primaryText}`}>{time.totalHours}</p>
                </div>
                <p className={`text-xs ${textContrast.accentText}`}>horas totales</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2">
                <div className="flex items-center justify-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-300" />
                  <p className={`text-base sm:text-lg font-bold ${textContrast.primaryText}`}>{totalMedals}</p>
                </div>
                <p className={`text-xs ${textContrast.accentText}`}>medallas</p>
              </div>
            </div>

            {/* Cita crítica - ✅ CONTRASTE ADAPTATIVO */}
            <div className="text-center">
              <p className={`text-xs italic font-light leading-relaxed ${textContrast.accentText}`}>
                {getCriticalQuote()}
              </p>
            </div>

            {/* Botones opacos */}
            <div className="flex justify-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setShowPanicButton(true)}
                    variant="outline"
                    className="bg-orange-500 border-orange-600 text-white hover:bg-orange-600 text-xs px-3 py-2 h-8 min-w-[80px]"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Pánico
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-3 text-sm">
                  <div className="space-y-1">
                    <p className="font-semibold">Protocolo Anti-Antojo</p>
                    <p>Pasos inmediatos para superar momentos de antojo intenso:</p>
                    <p>• Beber agua • Respirar 4-6 • Manipular objeto • Ejercicio rápido</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onRelapse}
                    variant="outline"
                    className="bg-red-500 border-red-600 text-white hover:bg-red-600 text-xs px-3 py-2 h-8 min-w-[80px]"
                  >
                    <AlertTriangle className="w-3 h-3 mr-1" />
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

      {/* Modal del botón de pánico */}
      <PanicButton 
        isOpen={showPanicButton}
        onClose={() => setShowPanicButton(false)}
      />
    </TooltipProvider>
  );
};

export default MainHeader;