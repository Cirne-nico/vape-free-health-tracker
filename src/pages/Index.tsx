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
import { Clock, Trophy, Heart, Calendar, Settings } from 'lucide-react';

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
        newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
        penaltyMessage = 'Primera recaída: se ha restado una semana de tu progreso y las medallas correspondientes.';
        break;
      case 1:
        daysLost = 30;
        newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
        penaltyMessage = 'Segunda recaída: se ha restado un mes de tu progreso y las medallas correspondientes.';
        break;
      case 2:
        daysLost = 90;
        newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
        penaltyMessage = 'Tercera recaída: se han restado 3 meses de tu progreso y las medallas correspondientes.';
        break;
      case 3:
        daysLost = 270;
        newStartDate = new Date(currentTime.getTime() - (daysLost * 24 * 60 * 60 * 1000));
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
    const newDays = Math.floor((currentTime.getTime() - newStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Header con estadísticas principales */}
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

          {/* Layout principal con dos columnas: contenido principal y medallas */}
          <div className="flex gap-6">
            {/* Columna principal con pestañas */}
            <div className="flex-1">
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
                  <div className="space-y-6">
                    <EmotionLogger startDate={startDate} />
                    
                    {/* Nuevas funcionalidades en la pestaña General */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <SocialStats 
                        currentDay={time.days}
                        totalSavings={savings.total}
                      />
                      <VirtualRewards 
                        currentDay={time.days}
                        totalSavings={savings.total}
                        unlockedAchievements={unlockedAchievements}
                      />
                    </div>
                    
                    <PredictiveAnalysis currentDay={time.days} />
                  </div>
                </TabsContent>

                <TabsContent value="health">
                  <HealthTracker startDate={startDate} />
                </TabsContent>

                <TabsContent value="achievements">
                  <AchievementsList days={time.days} savings={savings.total} />
                </TabsContent>

                <TabsContent value="history">
                  <HistoryView />
                </TabsContent>

                <TabsContent value="settings">
                  <SettingsPanel />
                </TabsContent>
              </Tabs>
            </div>

            {/* Columna de medallas */}
            <div className="w-48 flex-shrink-0">
              <div className="bg-white rounded-lg p-4 shadow-sm border sticky top-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">Medallas Obtenidas</h3>
                <div className="flex flex-col gap-3">
                  <MedalDisplay 
                    unlockedAchievements={unlockedAchievements}
                    unlockedHealthAchievements={unlockedHealthAchievements}
                    totalSavings={savings.total}
                  />
                </div>
              </div>
            </div>
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
