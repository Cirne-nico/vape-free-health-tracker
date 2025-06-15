import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TooltipHelper } from '@/components/ui/tooltip-helper';
import { Clock, TrendingUp, AlertTriangle, Trophy, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import PanicButton from './PanicButton';
import LanguageSwitcher from './LanguageSwitcher';

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
  textContrast,
  unlockedAchievements,
  unlockedHealthAchievements,
  onRelapse 
}: MainHeaderProps) => {
  const { t, i18n } = useTranslation();
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
    // Definir citas en español e inglés
    const quotes = {
      es: [
        "El poder no es algo que se posee, sino algo que se ejerce. — M. Foucault",
        "La repetición nunca es meramente mecánica. — J. Butler",
        "La libertad es una lucha constante. — A. Davis",
        "Cuidar de mí misma no es autocomplacencia, es autopreservación. — A. Lorde",
        "El cuerpo es el primer territorio que debemos recuperar. — S. Federici",
        "La respuesta-habilidad requiere cultivar la capacidad de responder. — D. Haraway",
        "El sujeto neoliberal se explota a sí mismo más eficazmente que cualquier poder externo. — B-C. Han",
        "El poder corresponde a la capacidad humana de actuar concertadamente. — H. Arendt",
        "Mi cuerpo me pertenece. Esta frase tan simple es revolucionaria. — V. Despentes",
        "La descolonización es también una descolonización del deseo. — R. Segato",
        "Cultivar una relación consigo mismo es el primer gesto ético. — L. Irigaray",
        "El conocimiento surge de la experiencia vivida. — P. Hill Collins",
        "La autonomía no es aislamiento, es autodeterminación. — O. Curiel",
        "La libertad real incluye la libertad de las dependencias destructivas. — V. Shiva",
        "Resistir es crear mundos alternativos. — M. Lugones",
        // Citas de Lola Flores
        "Si me queréis, irse. — Lola Flores",
        "Yo no me he ido nunca, ni me iré. Yo me quedo siempre. — Lola Flores",
        "Que me quiten lo bailao. — Lola Flores",
        // Citas de Mariem Hassan
        "La música es el arma más poderosa que tenemos para resistir. — Mariem Hassan",
        "Cantar es mi forma de luchar por la libertad. — Mariem Hassan",
        // Citas de Las Reguetoneras Rurales
        "Somos las que somos, no las que quieren que seamos. — Las Reguetoneras Rurales",
        "El campo también es nuestro territorio de resistencia. — Las Reguetoneras Rurales",
        // Citas de La Niña de los Peines
        "El cante no se aprende, se lleva dentro. — La Niña de los Peines",
        "Cuando canto, no soy yo, es mi alma la que habla. — La Niña de los Peines",
        // Citas de Rocío Jurado
        "Lo importante no es llegar, sino mantenerse. — Rocío Jurado",
        "Yo no me rindo ante nada ni ante nadie. — Rocío Jurado",
        // Citas de Carmen Amaya
        "Bailo como si me fuera la vida en ello, porque así es. — Carmen Amaya",
        "El arte es libertad, y la libertad no tiene precio. — Carmen Amaya",
        // Citas de La Argentinita
        "El baile es la expresión más sincera del alma. — La Argentinita",
        "Cada paso es una declaración de independencia. — La Argentinita"
      ],
      en: [
        "Power is not something that is possessed, but something that is exercised. — M. Foucault",
        "Repetition is never merely mechanical. — J. Butler",
        "Freedom is a constant struggle. — A. Davis",
        "Caring for myself is not self-indulgence, it is self-preservation. — A. Lorde",
        "The body is the first territory we must reclaim. — S. Federici",
        "Response-ability requires cultivating the capacity to respond. — D. Haraway",
        "The neoliberal subject exploits itself more efficiently than any external power. — B-C. Han",
        "Power corresponds to the human ability to act in concert. — H. Arendt",
        "My body belongs to me. This simple phrase is revolutionary. — V. Despentes",
        "Decolonization is also a decolonization of desire. — R. Segato",
        "Cultivating a relationship with oneself is the first ethical gesture. — L. Irigaray",
        "Knowledge emerges from lived experience. — P. Hill Collins",
        "Autonomy is not isolation, it is self-determination. — O. Curiel",
        "Real freedom includes freedom from destructive dependencies. — V. Shiva",
        "To resist is to create alternative worlds. — M. Lugones",
        // Lola Flores quotes
        "If you love me, leave. — Lola Flores",
        "I have never left, nor will I leave. I always stay. — Lola Flores",
        "No one can take away what I've danced. — Lola Flores",
        // Mariem Hassan quotes
        "Music is the most powerful weapon we have to resist. — Mariem Hassan",
        "Singing is my way of fighting for freedom. — Mariem Hassan",
        // Las Reguetoneras Rurales quotes
        "We are who we are, not who they want us to be. — Las Reguetoneras Rurales",
        "The countryside is also our territory of resistance. — Las Reguetoneras Rurales",
        // La Niña de los Peines quotes
        "Singing is not learned, it's carried within. — La Niña de los Peines",
        "When I sing, it's not me, it's my soul that speaks. — La Niña de los Peines",
        // Rocío Jurado quotes
        "What matters is not to arrive, but to stay. — Rocío Jurado",
        "I don't surrender to anything or anyone. — Rocío Jurado",
        // Carmen Amaya quotes
        "I dance as if my life depended on it, because it does. — Carmen Amaya",
        "Art is freedom, and freedom has no price. — Carmen Amaya",
        // La Argentinita quotes
        "Dance is the most sincere expression of the soul. — La Argentinita",
        "Each step is a declaration of independence. — La Argentinita"
      ]
    };
    
    // Obtener el idioma actual de la aplicación
    const currentLanguage = i18n.language;
    
    // Seleccionar las citas según el idioma actual
    const quotesForLanguage = currentLanguage === 'es' ? quotes.es : quotes.en;
    
    // Usar el día para seleccionar la cita, pero con cierta rotación
    const index = (time.days + Math.floor(time.hours / 6)) % quotesForLanguage.length;
    return quotesForLanguage[index];
  };

  return (
    <Card className="relative overflow-hidden text-white rounded-lg">
      {/* Imagen de fondo con blur PROGRESIVO */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: `blur(${blurLevel}px)`,
        }}
      />
      
      <div className={`absolute inset-0 bg-gradient-to-r ${textContrast.overlayIntensity}`} />
      
      <CardContent className="relative p-2 sm:p-3 z-10">
        <div className="flex flex-col space-y-1 sm:space-y-2">
          {/* Language switcher in top right corner */}
          <div className="absolute top-2 right-2 z-20">
            <LanguageSwitcher />
          </div>
          
          {/* Logo y título */}
          <div className="text-center mb-1">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Logo size="sm" className="text-white flex-shrink-0" />
              <h1 className={`text-base sm:text-lg font-bold leading-none tracking-wide ${textContrast.primaryText}`}>
                {t('app.name')}
              </h1>
            </div>
            <p className={`text-xs italic font-medium ${textContrast.accentText}`}>
              {t('app.tagline')}
            </p>
          </div>

          {/* Título principal */}
          <div className="text-center">
            <h2 className={`text-sm sm:text-base font-bold ${textContrast.primaryText}`}>
              {t('app.header.title')}
            </h2>
            <h3 className={`text-xs sm:text-sm font-semibold ${textContrast.accentText}`}>
              {t('app.header.subtitle')}
            </h3>
          </div>

          {/* Tiempo transcurrido */}
          <div className="text-center">
            <h4 className={`text-lg sm:text-xl font-bold ${textContrast.primaryText}`}>
              {time.days > 0 
                ? t('app.header.days', { count: time.days }) 
                : t('app.header.hours', { hours: time.hours, minutes: time.minutes })}
            </h4>
          </div>

          {/* Progreso visual */}
          <div className="space-y-1">
            <div className={`flex justify-between text-xs ${textContrast.secondaryText}`}>
              <span>{t('app.header.progress', { target: progressInfo.targetLabel })}</span>
              <span className="font-semibold">{Math.min(progressPercentage, 100).toFixed(1)}%</span>
            </div>
            <Progress value={Math.min(progressPercentage, 100)} className="h-2" />
            {!progressInfo.isFirstPhase && (
              <div className={`text-xs text-center ${textContrast.accentText}`}>
                {t('app.header.phase2')}
              </div>
            )}
          </div>

          {/* Estadísticas centrales */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2">
              <div className="flex items-center justify-center gap-1">
                <Clock className={`w-4 h-4 ${textContrast.accentText}`} />
                <p className={`text-base sm:text-lg font-bold ${textContrast.primaryText}`}>{time.totalHours}</p>
              </div>
              <p className={`text-xs ${textContrast.accentText}`}>{t('app.header.totalHours')}</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-300" />
                <p className={`text-base sm:text-lg font-bold ${textContrast.primaryText}`}>{totalMedals}</p>
              </div>
              <p className={`text-xs ${textContrast.accentText}`}>{t('app.header.medals')}</p>
            </div>
          </div>

          {/* Cita crítica */}
          <div className="text-center">
            <p className={`text-xs italic font-light leading-relaxed ${textContrast.accentText}`}>
              {getCriticalQuote()}
            </p>
          </div>

          {/* Botones opacos */}
          <div className="flex justify-center gap-3">
            <TooltipHelper
              content={
                <div className="space-y-1">
                  <p className="font-semibold">{t('app.tooltips.panic.title')}</p>
                  <p>{t('app.tooltips.panic.description')}</p>
                  <p>{t('app.tooltips.panic.steps')}</p>
                </div>
              }
            >
              <Button
                onClick={() => setShowPanicButton(true)}
                variant="outline"
                className="bg-orange-500 border-orange-600 text-white hover:bg-orange-600 text-xs px-3 py-2 h-8 min-w-[80px]"
              >
                <Zap className="w-3 h-3 mr-1" />
                {t('app.header.panic')}
              </Button>
            </TooltipHelper>

            <TooltipHelper
              content={
                <div className="space-y-1">
                  <p className="font-semibold">{t('app.tooltips.relapse.title')}</p>
                  <p>{t('app.tooltips.relapse.first')}</p>
                  <p>{t('app.tooltips.relapse.second')}</p>
                  <p>{t('app.tooltips.relapse.third')}</p>
                  <p>{t('app.tooltips.relapse.fourth')}</p>
                  <p>{t('app.tooltips.relapse.fifth')}</p>
                  <p className="text-muted-foreground text-xs mt-2">
                    {t('app.tooltips.relapse.note')}
                  </p>
                </div>
              }
            >
              <Button
                onClick={onRelapse}
                variant="outline"
                className="bg-red-500 border-red-600 text-white hover:bg-red-600 text-xs px-3 py-2 h-8 min-w-[80px]"
              >
                <AlertTriangle className="w-3 h-3 mr-1" />
                {t('app.header.relapse')}
              </Button>
            </TooltipHelper>
          </div>
        </div>
      </CardContent>

      {/* Modal del botón de pánico */}
      <PanicButton 
        isOpen={showPanicButton}
        onClose={() => setShowPanicButton(false)}
      />
    </Card>
  );
};

export default MainHeader;