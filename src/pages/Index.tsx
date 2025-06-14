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
      {/* LAYOUT PRINCIPAL CON SIDEBAR Y CONTENIDO */}
      <div className="flex h-screen">
        {/* SIDEBAR LATERAL IZQUIERDO FIJO - SOLO DESKTOP */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:bg-white lg:border-r lg:border-gray-200 lg:shadow-sm">
          <MainTabs 
            startDate={startDate}
            currentDay={time.days}
            totalSavings={savings.total}
            unlockedAchievements={unlockedAchievements}
            unlockedHealthAchievements={unlockedHealthAchievements}
            isSidebar={true}
          />
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-1 lg:pl-64 flex flex-col">
          {/* HEADER FIJO EN LA PARTE SUPERIOR */}
          <div className="flex-shrink-0">
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
          </div>

          {/* CONTENIDO SCROLLEABLE */}
          <div className="flex-1 overflow-y-auto">
            {/* TABS HORIZONTALES PARA MÓVIL */}
            <div className="lg:hidden">
              <MainTabs 
                startDate={startDate}
                currentDay={time.days}
                totalSavings={savings.total}
                unlockedAchievements={unlockedAchievements}
                unlockedHealthAchievements={unlockedHealthAchievements}
                isSidebar={false}
              />
            </div>

            {/* CONTENIDO PARA DESKTOP (cuando hay sidebar) */}
            <div className="hidden lg:block">
              <MainTabs 
                startDate={startDate}
                currentDay={time.days}
                totalSavings={savings.total}
                unlockedAchievements={unlockedAchievements}
                unlockedHealthAchievements={unlockedHealthAchievements}
                isSidebar={false}
                showContentOnly={true}
              />
            </div>
          </div>
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