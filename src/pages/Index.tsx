import { useState, useEffect } from 'react';
import SetupModal from '@/components/SetupModal';
import AchievementPopup from '@/components/AchievementPopup';
import FirstDayAlert from '@/components/FirstDayAlert';
import MainHeader from '@/components/MainHeader';
import MainTabs from '@/components/MainTabs';
import { useQuitProgress } from '@/hooks/useQuitProgress';
import { useAchievements } from '@/hooks/useAchievements';
import { useRelapseHandler } from '@/components/RelapseHandler';

const Index = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showSetup, setShowSetup] = useState(false);

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
    handleCloseAchievementPopup,
    getUnlockedAchievements,
    getUnlockedHealthAchievements,
    resetAchievements,
    adjustMedalsAfterRelapse
  } = useAchievements(startDate, currentTime);

  const { handleRelapse } = useRelapseHandler({
    startDate,
    setStartDate,
    currentTime,
    resetAchievements,
    adjustMedalsAfterRelapse
  });

  useEffect(() => {
    const savedStartDate = localStorage.getItem('vaping-quit-date');
    
    if (savedStartDate) {
      setStartDate(new Date(savedStartDate));
    } else {
      setShowSetup(true);
    }
  }, []);

  const handleSetupComplete = (date: Date) => {
    setStartDate(date);
    localStorage.setItem('vaping-quit-date', date.toISOString());
    setShowSetup(false);
  };

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
      {/* CONTENEDOR PRINCIPAL - PADDING CORREGIDO */}
      <div className="max-w-4xl mx-auto p-2 sm:p-4">
        <div className="space-y-4 sm:space-y-6">
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

          <MainTabs 
            startDate={startDate}
            currentDay={time.days}
            totalSavings={savings.total}
            unlockedAchievements={unlockedAchievements}
            unlockedHealthAchievements={unlockedHealthAchievements}
          />
        </div>
      </div>

      {/* ALERTAS Y POPUPS */}
      <FirstDayAlert startDate={startDate} />
      
      <AchievementPopup 
        achievement={newAchievement}
        savings={savings.total}
        onClose={handleCloseAchievementPopup}
      />
    </div>
  );
};

export default Index;