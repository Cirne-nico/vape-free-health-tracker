
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
import { useQuitProgress } from '@/hooks/useQuitProgress';
import { useAchievements } from '@/hooks/useAchievements';
import { Clock, Trophy, Heart, Calendar, Settings } from 'lucide-react';

const Index = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [relapseCount, setRelapseCount] = useState(0);

  const { 
    currentTime, 
    calculateTimeSince, 
    calculateSavings, 
    calculateBlurLevel, 
    calculateProgressPercentage 
  } = useQuitProgress(startDate);

  const {
    newAchievement,
    checkedAchievements,
    setCheckedAchievements,
    handleCloseAchievementPopup,
    getUnlockedAchievements,
    resetAchievements
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
        resetAchievements();
        break;
    }
    
    const newRelapseCount = relapseCount + 1;
    setStartDate(newStartDate);
    setRelapseCount(newRelapseCount);
    
    localStorage.setItem('vaping-quit-date', newStartDate.toISOString());
    localStorage.setItem('relapse-count', newRelapseCount.toString());
    
    alert(penaltyMessage);
  };

  const time = calculateTimeSince();
  const savings = calculateSavings();
  const progressPercentage = calculateProgressPercentage();
  const blurLevel = calculateBlurLevel();
  const unlockedAchievements = getUnlockedAchievements(time.days);

  if (showSetup) {
    return <SetupModal onComplete={handleSetupComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header con estadísticas principales */}
        <MainHeader 
          time={time}
          savings={savings}
          progressPercentage={progressPercentage}
          blurLevel={blurLevel}
          unlockedAchievements={unlockedAchievements}
          onRelapse={handleRelapse}
        />

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
