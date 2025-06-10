import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmotionLogger from './EmotionLogger';
import HealthTracker from './HealthTracker';
import AchievementsList from './AchievementsList';
import HistoryView from './HistoryView';
import SettingsPanel from './SettingsPanel';
import SocialStats from './SocialStats';
import VirtualRewards from './VirtualRewards';
import PredictiveAnalysis from './PredictiveAnalysis';
import { Clock, Trophy, Heart, Brain, Settings } from 'lucide-react';

interface MainTabsProps {
  startDate: Date | null;
  currentDay: number;
  totalSavings: number;
  unlockedAchievements: any[];
}

const MainTabs = ({ startDate, currentDay, totalSavings, unlockedAchievements }: MainTabsProps) => {
  return (
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
          <span className="leading-tight">Hitos</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 p-1 sm:p-2 text-xs sm:text-sm min-h-12" style={{ fontFamily: 'Arial Narrow, Arial, sans-serif' }}>
          <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="leading-tight">Ajustes</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="emotions" className="mt-4 sm:mt-6">
        <div className="space-y-4 sm:space-y-6">
          <EmotionLogger startDate={startDate} />
          <SocialStats 
            currentDay={currentDay}
            totalSavings={totalSavings}
          />
        </div>
      </TabsContent>

      <TabsContent value="emotivity" className="mt-4 sm:mt-6">
        <div className="space-y-4 sm:space-y-6">
          <VirtualRewards 
            currentDay={currentDay}
            totalSavings={totalSavings}
            unlockedAchievements={unlockedAchievements}
          />
          <PredictiveAnalysis currentDay={currentDay} />
          <HistoryView />
        </div>
      </TabsContent>

      <TabsContent value="health" className="mt-4 sm:mt-6">
        <HealthTracker startDate={startDate} />
      </TabsContent>

      <TabsContent value="achievements" className="mt-4 sm:mt-6">
        <AchievementsList days={currentDay} savings={totalSavings} />
      </TabsContent>

      <TabsContent value="settings" className="mt-4 sm:mt-6">
        <SettingsPanel />
      </TabsContent>
    </Tabs>
  );
};

export default MainTabs;