import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import EmotionLogger from '@/components/EmotionLogger';
import HealthTracker from '@/components/HealthTracker';
import AchievementsList from '@/components/AchievementsList';
import HistoryView from '@/components/HistoryView';
import SettingsPanel from '@/components/SettingsPanel';
import SetupModal from '@/components/SetupModal';
import AchievementPopup from '@/components/AchievementPopup';
import MedalDisplay from '@/components/MedalDisplay';
import { Clock, Trophy, Heart, Calendar, Settings, Info } from 'lucide-react';

const Index = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [relapseCount, setRelapseCount] = useState(0);
  const [newAchievement, setNewAchievement] = useState<any>(null);
  const [checkedAchievements, setCheckedAchievements] = useState<string[]>([]);

  // Definir logros disponibles
  const achievements = [
    {
      id: 'first_48h',
      title: 'Primeras 48 Horas',
      description: 'Superaste el período crítico inicial',
      days: 2,
      icon: '⚡',
      reward: 'Sentidos del gusto y olfato mejorando'
    },
    {
      id: 'first_week',
      title: 'Una Semana Completa',
      description: 'Completaste 7 días consecutivos',
      days: 7,
      icon: '🏆',
      reward: 'Respiración notablemente mejorada'
    },
    {
      id: 'one_month',
      title: 'Un Mes de Libertad',
      description: 'Alcanzaste el primer mes completo',
      days: 30,
      icon: '🎉',
      reward: 'Función pulmonar significativamente mejorada'
    },
    {
      id: 'three_months',
      title: 'Trimestre Completo',
      description: '¡Alcanzaste la meta de 90 días!',
      days: 90,
      icon: '👑',
      reward: 'Recuperación casi completa del sistema respiratorio'
    },
    {
      id: 'half_year',
      title: 'Medio Año',
      description: 'Seis meses de vida libre de vapeo',
      days: 180,
      icon: '🎯',
      reward: 'Salud cardiovascular normalizada'
    },
    {
      id: 'one_year',
      title: 'Un Año Completo',
      description: '¡Un año entero de libertad!',
      days: 365,
      icon: '🏅',
      reward: 'Riesgo de enfermedades equiparado a no fumadores'
    }
  ];

  // Verificar si existe fecha de inicio guardada
  useEffect(() => {
    const savedStartDate = localStorage.getItem('vaping-quit-date');
    const savedRelapseCount = localStorage.getItem('relapse-count');
    const savedCheckedAchievements = localStorage.getItem('checked-achievements');
    
    if (savedStartDate) {
      setStartDate(new Date(savedStartDate));
    } else {
      setShowSetup(true);
    }
    
    if (savedRelapseCount) {
      setRelapseCount(parseInt(savedRelapseCount));
    }

    if (savedCheckedAchievements) {
      setCheckedAchievements(JSON.parse(savedCheckedAchievements));
    }
  }, []);

  // Actualizar tiempo cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Verificar nuevos logros cuando cambie el tiempo
  useEffect(() => {
    if (!startDate) return;

    const currentDays = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    for (const achievement of achievements) {
      if (currentDays >= achievement.days && !checkedAchievements.includes(achievement.id)) {
        setNewAchievement(achievement);
        const newChecked = [...checkedAchievements, achievement.id];
        setCheckedAchievements(newChecked);
        localStorage.setItem('checked-achievements', JSON.stringify(newChecked));
        break;
      }
    }
  }, [currentTime, startDate, checkedAchievements, achievements]);

  const handleSetupComplete = (date: Date) => {
    setStartDate(date);
    localStorage.setItem('vaping-quit-date', date.toISOString());
    setShowSetup(false);
  };

  const calculateTimeSince = () => {
    if (!startDate) return { days: 0, hours: 0, minutes: 0 };
    
    const diff = currentTime.getTime() - startDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  const calculateSavings = () => {
    if (!startDate) return 0;
    const days = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const settings = JSON.parse(localStorage.getItem('app-settings') || '{}');
    
    if (settings.costPerWeek && settings.coilCost && settings.coilDays) {
      const dailyLiquidCost = settings.costPerWeek / 7;
      const dailyCoilCost = settings.coilCost / settings.coilDays;
      const additionalDailyCost = settings.additionalDailyCost || 0;
      const totalDailyCost = dailyLiquidCost + dailyCoilCost + additionalDailyCost;
      
      return days * totalDailyCost;
    } else {
      const dailyCost = (20/7) + (4/10);
      return days * dailyCost;
    }
  };

  const handleRelapse = () => {
    if (!startDate) return;
    
    const currentDays = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (currentDays < 7) {
      setStartDate(new Date());
      localStorage.setItem('vaping-quit-date', new Date().toISOString());
      // Resetear logros conseguidos
      setCheckedAchievements([]);
      localStorage.setItem('checked-achievements', JSON.stringify([]));
      return;
    }
    
    let newStartDate = new Date();
    let penaltyMessage = '';
    
    switch (relapseCount) {
      case 0:
        newStartDate = new Date(currentTime.getTime() - (7 * 24 * 60 * 60 * 1000));
        penaltyMessage = 'Primera recaída: se ha restado una semana de tu progreso.';
        break;
      case 1:
        newStartDate = new Date(currentTime.getTime() - (30 * 24 * 60 * 60 * 1000));
        penaltyMessage = 'Segunda recaída: se ha restado un mes de tu progreso.';
        break;
      case 2:
        newStartDate = new Date(currentTime.getTime() - (365 * 24 * 60 * 60 * 1000));
        penaltyMessage = 'Tercera recaída: se ha restado un año de tu progreso.';
        break;
      case 3:
      default:
        newStartDate = new Date();
        penaltyMessage = 'Cuarta recaída: se ha reiniciado todo el proceso.';
        setRelapseCount(-1);
        setCheckedAchievements([]);
        localStorage.setItem('checked-achievements', JSON.stringify([]));
        break;
    }
    
    const newRelapseCount = relapseCount + 1;
    setStartDate(newStartDate);
    setRelapseCount(newRelapseCount);
    
    localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
    localStorage.setItem('relapse-count', newRelapseCount.toString());
    
    alert(penaltyMessage);
  };

  const handleCloseAchievementPopup = () => {
    setNewAchievement(null);
  };

  const time = calculateTimeSince();
  const savings = calculateSavings();
  const progressPercentage = Math.min((time.days / 90) * 100, 100);

  // Calcular el nivel de blur basado en los días transcurridos
  const calculateBlurLevel = () => {
    const maxBlur = 8; // Blur máximo al inicio
    const blurReduction = (time.days / 90) * maxBlur;
    return Math.max(0, maxBlur - blurReduction);
  };

  const blurLevel = calculateBlurLevel();

  const unlockedAchievements = achievements.filter(achievement => 
    time.days >= achievement.days
  );

  if (showSetup) {
    return <SetupModal onComplete={handleSetupComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header con estadísticas principales - diseño mejorado */}
        <Card className="relative overflow-hidden border-0 shadow-xl">
          {/* Imagen de fondo de playa griega */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
              filter: `blur(${blurLevel}px)`,
              transition: 'filter 0.5s ease-in-out'
            }}
          />
          
          {/* Overlay con gradiente para legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-teal-800/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          {/* Patrón geométrico sutil */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="geometric" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="1.5" fill="white" opacity="0.3"/>
                  <circle cx="0" cy="0" r="1" fill="white" opacity="0.2"/>
                  <circle cx="60" cy="60" r="1" fill="white" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#geometric)"/>
            </svg>
          </div>

          <div className="relative text-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-emerald-200">Proceso activo</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-light leading-relaxed tracking-wide">
                  Ya sin nicotina, el cuerpo escucha:<br/>
                  <span className="font-semibold text-emerald-200">comienza la sociabilidad mínima</span>
                </h1>
                {blurLevel > 0 && (
                  <p className="text-sm text-blue-200 mt-2 opacity-80">
                    La claridad llega con cada día... ({(90 - time.days)} días para la imagen completa)
                  </p>
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl md:text-5xl font-light mb-2 tracking-wider">
                    {time.days} días {time.hours}h {time.minutes}m
                  </div>
                  <div className="text-lg md:text-xl font-medium text-blue-100">
                    Ahorro estimado: <span className="text-emerald-300">{savings.toFixed(2)}€</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-blue-100">
                  <span>Progreso hacia 90 días de recuperación completa</span>
                  <span className="font-medium">{progressPercentage.toFixed(1)}%</span>
                </div>
                <div className="relative">
                  <Progress 
                    value={progressPercentage} 
                    className="h-3 bg-white/20 border border-white/30" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full"></div>
                </div>
              </div>

              {/* Medallas y botón de recaída */}
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <MedalDisplay 
                    unlockedAchievements={unlockedAchievements}
                    totalSavings={savings}
                  />
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={handleRelapse}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm transition-all duration-200"
                  >
                    Recaída
                  </Button>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-white/60 hover:text-white/80 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="text-sm space-y-1">
                        <p><strong>Sistema de penalizaciones:</strong></p>
                        <p>• 1ª recaída: -1 semana</p>
                        <p>• 2ª recaída: -1 mes</p>
                        <p>• 3ª recaída: -1 año</p>
                        <p>• 4ª recaída: reinicio completo</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Si no has llegado a 1 semana, vuelve a 0.
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Navegación principal */}
        <Tabs defaultValue="emotions" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="emotions" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Salud
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Logros
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Historial
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Ajustes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emotions">
            <EmotionLogger startDate={startDate} />
          </TabsContent>

          <TabsContent value="health">
            <HealthTracker startDate={startDate} />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsList days={time.days} savings={savings} />
          </TabsContent>

          <TabsContent value="history">
            <HistoryView />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>

      {/* Pop-up de nuevo logro */}
      <AchievementPopup 
        achievement={newAchievement}
        savings={savings}
        onClose={handleCloseAchievementPopup}
      />
    </div>
  );
};

export default Index;
