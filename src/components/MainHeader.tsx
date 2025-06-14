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
    const quotes = {
      es: [
        "El poder no es algo que se posea, sino algo que actúa. — M. Foucault",
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
        "Resistir es crear mundos alternativos. — M. Lugones"
      ],
      en: [
        "Power is not something that is possessed, but something that acts. — M. Foucault",
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
        "To resist is to create alternative worlds. — M. Lugones"
      ],
      ca: [
        "El poder no és una cosa que es posseeix, sinó una cosa que actua. — M. Foucault",
        "La repetició mai és merament mecànica. — J. Butler",
        "La llibertat és una lluita constant. — A. Davis",
        "Cuidar de mi mateixa no és autocomplaença, és autopreservació. — A. Lorde",
        "El cos és el primer territori que hem de recuperar. — S. Federici",
        "La resposta-habilitat requereix cultivar la capacitat de respondre. — D. Haraway",
        "El subjecte neoliberal s'explota a si mateix més eficaçment que qualsevol poder extern. — B-C. Han",
        "El poder correspon a la capacitat humana d'actuar concertadament. — H. Arendt",
        "El meu cos em pertany. Aquesta frase tan simple és revolucionària. — V. Despentes",
        "La descolonització és també una descolonització del desig. — R. Segato",
        "Cultivar una relació amb un mateix és el primer gest ètic. — L. Irigaray",
        "El coneixement sorgeix de l'experiència viscuda. — P. Hill Collins",
        "L'autonomia no és aïllament, és autodeterminació. — O. Curiel",
        "La llibertat real inclou la llibertat de les dependències destructives. — V. Shiva",
        "Resistir és crear mons alternatius. — M. Lugones"
      ],
      el: [
        "Η εξουσία δεν είναι κάτι που κατέχεται, αλλά κάτι που δρα. — M. Foucault",
        "Η επανάληψη δεν είναι ποτέ απλώς μηχανική. — J. Butler",
        "Η ελευθερία είναι ένας συνεχής αγώνας. — A. Davis",
        "Η φροντίδα του εαυτού μου δεν είναι αυτοϊκανοποίηση, είναι αυτοσυντήρηση. — A. Lorde",
        "Το σώμα είναι το πρώτο έδαφος που πρέπει να ανακτήσουμε. — S. Federici",
        "Η ικανότητα απόκρισης απαιτεί την καλλιέργεια της ικανότητας να ανταποκρινόμαστε. — D. Haraway",
        "Το νεοφιλελεύθερο υποκείμενο εκμεταλλεύεται τον εαυτό του πιο αποτελεσματικά από οποιαδήποτε εξωτερική δύναμη. — B-C. Han",
        "Η εξουσία αντιστοιχεί στην ανθρώπινη ικανότητα να δρα συντονισμένα. — H. Arendt",
        "Το σώμα μου μου ανήκει. Αυτή η απλή φράση είναι επαναστατική. — V. Despentes",
        "Η αποαποικιοποίηση είναι επίσης αποαποικιοποίηση της επιθυμίας. — R. Segato",
        "Η καλλιέργεια μιας σχέσης με τον εαυτό είναι η πρώτη ηθική χειρονομία. — L. Irigaray",
        "Η γνώση προκύπτει από τη βιωμένη εμπειρία. — P. Hill Collins",
        "Η αυτονομία δεν είναι απομόνωση, είναι αυτοπροσδιορισμός. — O. Curiel",
        "Η πραγματική ελευθερία περιλαμβάνει την ελευθερία από τις καταστροφικές εξαρτήσεις. — V. Shiva",
        "Το να αντιστέκεσαι είναι να δημιουργείς εναλλακτικούς κόσμους. — M. Lugones"
      ]
    };
    
    const currentLanguage = i18n.language as keyof typeof quotes;
    const quotesForLanguage = quotes[currentLanguage] || quotes.en;
    
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