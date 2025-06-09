import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmotionLogger from '@/components/EmotionLogger';
import HealthTracker from '@/components/HealthTracker';
import AchievementsList from '@/components/AchievementsList';
import HistoryView from '@/components/HistoryView';
import SettingsPanel from '@/components/SettingsPanel';
import SetupModal from '@/components/SetupModal';
import AchievementPopup from '@/components/AchievementPopup';
import MainHeader from '@/components/MainHeader';
import SocialStats from '@/components/SocialStats';
import VirtualRewards from '@/components/VirtualRewards';
import PredictiveAnalysis from '@/components/PredictiveAnalysis';
import MedalDisplay from '@/components/MedalDisplay';
import { useQuitProgress } from '@/hooks/useQuitProgress';
import { useAchievements } from '@/hooks/useAchievements';
import { Clock, Trophy, Heart, Brain, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [relapseCount, setRelapseCount] = useState(0);

  // Mover todos los hooks antes de cualquier posible retorno temprano
  const { 
    currentTime, 
    calculateTimeSince, 
    calculateSavings, 
    calculateBlurLevel, 
    calculateProgressPercentage,
    getProgressInfo
  } = useQuitProgress(startDate);

  const {
    newAchievement,
    checkedAchievements,
    checkedHealthAchievements,
    setCheckedAchievements,
    setCheckedHealthAchievements,
    handleCloseAchievementPopup,
    getUnlockedAchievements,
    getUnlockedHealthAchievements,
    resetAchievements,
    adjustMedalsAfterRelapse
  } = useAchievements(startDate, currentTime);

  // Verificar si existe fecha de inicio guardada
  useEffect(() => {
    const savedStartDate = localStorage.getItem('vaping-quit-date');
    const savedRelapseCount = localStorage.getItem('relapse-count');
    
    if (savedStartDate) {
      setStartDate(new Date(savedStartDate));
    } else {
      setShowSetup(true);
    }
    
    if (savedRelapseCount) {
      setRelapseCount(parseInt(savedRelapseCount));
    }
  }, []);

  const handleSetupComplete = (date: Date) => {
    setStartDate(date);
    localStorage.setItem('vaping-quit-date', date.toISOString());
    setShowSetup(false);
  };

  const handleRelapse = () => {
    if (!startDate) return;
    
    const currentDays = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (currentDays < 7) {
      setStartDate(new Date());
      localStorage.setItem('vaping-quit-date', new Date().toISOString());
      resetAchievements();
      return;
    }
    
    let newStartDate = new Date();
    let penaltyMessage = '';
    let daysLost = 0;
    
    switch (relapseCount) {
      case 0:
        daysLost = 7;
        // Verificar que no sea negativo
        if (currentDays >= daysLost) {
          newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
        } else {
          newStartDate = new Date();
        }
        penaltyMessage = 'Primera recaída: se ha restado una semana de tu progreso y las medallas correspondientes.';
        break;
      case 1:
        daysLost = 30;
        if (currentDays >= daysLost) {
          newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
        } else {
          newStartDate = new Date();
        }
        penaltyMessage = 'Segunda recaída: se ha restado un mes de tu progreso y las medallas correspondientes.';
        break;
      case 2:
        daysLost = 90;
        if (currentDays >= daysLost) {
          newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
        } else {
          newStartDate = new Date();
        }
        penaltyMessage = 'Tercera recaída: se han restado 3 meses de tu progreso y las medallas correspondientes.';
        break;
      case 3:
        daysLost = 270;
        if (currentDays >= daysLost) {
          newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
        } else {
          newStartDate = new Date();
        }
        penaltyMessage = 'Cuarta recaída: se han restado 9 meses de tu progreso y las medallas correspondientes.';
        break;
      case 4:
      default:
        newStartDate = new Date();
        penaltyMessage = 'Quinta recaída: se ha reiniciado todo el proceso.';
        setRelapseCount(-1);
        resetAchievements();
        break;
    }
    
    const newRelapseCount = relapseCount + 1;
    setStartDate(newStartDate);
    setRelapseCount(newRelapseCount);
    
    localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
    localStorage.setItem('relapse-count', newRelapseCount.toString());
    
    // Calcular los nuevos días tras la penalización
    const newDays = Math.max(0, Math.floor((currentTime.getTime() - newStartDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    // Si no es un reset completo, ajustar las medallas según los días perdidos
    if (relapseCount < 4) {
      adjustMedalsAfterRelapse(currentDays, newDays);
    }
    
    alert(penaltyMessage);
  };

  // Calcular valores después de todos los hooks
  const time = calculateTimeSince();
  const savings = calculateSavings();
  const progressPercentage = calculateProgressPercentage();
  const progressInfo = getProgressInfo();
  const blurLevel = calculateBlurLevel();
  const unlockedAchievements = getUnlockedAchievements(time.days);
  const unlockedHealthAchievements = getUnlockedHealthAchievements(time.days);

  if (showSetup) {
    return <SetupModal onComplete={handleSetupComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 sm:space-y-6">
          {/* Header sin márgenes exteriores */}
          <MainHeader 
            time={time}
            savings={savings}
            progressPercentage={progressPercentage}
            progressInfo={progressInfo}
            blurLevel={blurLevel}
            unlockedAchievements={unlockedAchievements}
            unlockedHealthAchievements={unlockedHealthAchievements}
            onRelapse={handleRelapse}
          />

          {/* Contenido principal con márgenes normales */}
          <div className="p-2 sm:p-4 space-y-4 sm:space-y-6">
            {/* Medallas acumulativas debajo del header */}
            {(unlockedAchievements.length > 0 || unlockedHealthAchievements.length > 0) && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Medallas Obtenidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-center">
                    <MedalDisplay 
                      unlockedAchievements={unlockedAchievements}
                      unlockedHealthAchievements={unlockedHealthAchievements}
                      totalSavings={savings.total}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pestañas principales con mejor responsive - ahora 5 pestañas */}
            <Tabs defaultValue="emotions" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm h-14 sm:h-12">
                <TabsTrigger value="emotions" className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 p-1 sm:p-2 text-xs sm:text-sm min-h-12" style={{ fontFamily: 'Arial Narrow, Arial, sans-serif' }}>
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="leading-tight">General</span>
                </TabsTrigger>
                <TabsTrigger value="emotivity" className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 p-1 sm:p-2 text-xs sm:text-sm min-h-12" style={{ fontFamily: 'Arial Narrow, Arial, sans-serif' }}>
                  <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="leading-tight">Emotividad</span>
                </TabsTrigger>
                <TabsTrigger value="health" className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 p-1 sm:p-2 text-xs sm:text-sm min-h-12" style={{ fontFamily: 'Arial Narrow, Arial, sans-serif' }}>
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="leading-tight">Salud</span>
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 p-1 sm:p-2 text-xs sm:text-sm min-h-12" style={{ fontFamily: 'Arial Narrow, Arial, sans-serif' }}>
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="leading-tight">Logros</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 p-1 sm:p-2 text-xs sm:text-sm min-h-12" style={{ fontFamily: 'Arial Narrow, Arial, sans-serif' }}>
                  <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="leading-tight">Ajustes</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="emotions" className="mt-4 sm:mt-6">
                <div className="space-y-4 sm:space-y-6">
                  <EmotionLogger startDate={startDate} />
                  
                  {/* Solo SocialStats en la pestaña General */}
                  <SocialStats 
                    currentDay={time.days}
                    totalSavings={savings.total}
                  />
                </div>
              </TabsContent>

              <TabsContent value="emotivity" className="mt-4 sm:mt-6">
                <div className="space-y-4 sm:space-y-6">
                  {/* Sistema de progreso emocional */}
                  <VirtualRewards 
                    currentDay={time.days}
                    totalSavings={savings.total}
                    unlockedAchievements={unlockedAchievements}
                  />
                  
                  {/* Análisis predictivo */}
                  <PredictiveAnalysis currentDay={time.days} />
                  
                  {/* Todo el contenido del historial emocional */}
                  <HistoryView />
                </div>
              </TabsContent>

              <TabsContent value="health" className="mt-4 sm:mt-6">
                <HealthTracker startDate={startDate} />
              </TabsContent>

              <TabsContent value="achievements" className="mt-4 sm:mt-6">
                <AchievementsList days={time.days} savings={savings.total} />
              </TabsContent>

              <TabsContent value="settings" className="mt-4 sm:mt-6">
                <SettingsPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Pop-up de nuevo logro */}
      <AchievementPopup 
        achievement={newAchievement}
        savings={savings.total}
        onClose={handleCloseAchievementPopup}
      />
    </div>
  );
};

export default Index;
