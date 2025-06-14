import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HealthTracker from './HealthTracker';
import AchievementsList from './AchievementsList';
import EpicQuestsManager from './EpicQuestsManager';
import HabitsManager from './HabitsManager';
import DonationSection from './DonationSection';
import SettingsPanel from './SettingsPanel';
import MedalsSection from './MedalsSection';
import GeneralTab from './tabs/GeneralTab';
import EmotivityTab from './tabs/EmotivityTab';
import { Clock, Trophy, Heart, Brain, Settings, Scroll, Zap, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MainTabsProps {
  startDate: Date | null;
  currentDay: number;
  totalSavings: number;
  unlockedAchievements: any[];
  unlockedHealthAchievements: any[];
}

const MainTabs = ({ 
  startDate, 
  currentDay, 
  totalSavings, 
  unlockedAchievements,
  unlockedHealthAchievements 
}: MainTabsProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <Tabs defaultValue="emotions" className="w-full">
        <TabsList className="grid w-full grid-cols-4 grid-rows-2 gap-1 bg-white shadow-sm h-auto p-2 sm:grid-cols-8 sm:grid-rows-1 sm:h-12">
          <TabsTrigger value="emotions">
            <Clock className="w-4 h-4" />
            <span>{t('tabs.general')}</span>
          </TabsTrigger>
          
          <TabsTrigger value="emotivity">
            <Brain className="w-4 h-4" />
            <span>{t('tabs.emotivity')}</span>
          </TabsTrigger>
          
          <TabsTrigger value="health">
            <Heart className="w-4 h-4" />
            <span>{t('tabs.health')}</span>
          </TabsTrigger>
          
          <TabsTrigger value="achievements">
            <Trophy className="w-4 h-4" />
            <span>{t('tabs.epopeya')}</span>
          </TabsTrigger>

          <TabsTrigger value="epic">
            <Scroll className="w-4 h-4" />
            <span>{t('tabs.gestas')}</span>
          </TabsTrigger>
          
          <TabsTrigger value="poderio">
            <Zap className="w-4 h-4" />
            <span>{t('tabs.poderio')}</span>
          </TabsTrigger>
          
          <TabsTrigger value="donate">
            <Gift className="w-4 h-4" />
            <span>{t('tabs.donate')}</span>
          </TabsTrigger>
          
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4" />
            <span>{t('tabs.settings')}</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 sm:mt-6">
          <MedalsSection 
            unlockedAchievements={unlockedAchievements}
            unlockedHealthAchievements={unlockedHealthAchievements}
            totalSavings={totalSavings}
          />
        </div>

        <TabsContent value="emotions" className="mt-4 sm:mt-6">
          <GeneralTab 
            startDate={startDate}
            currentDay={currentDay}
            totalSavings={totalSavings}
          />
        </TabsContent>

        <TabsContent value="emotivity" className="mt-4 sm:mt-6">
          <EmotivityTab 
            currentDay={currentDay}
            totalSavings={totalSavings}
            unlockedAchievements={unlockedAchievements}
          />
        </TabsContent>

        <TabsContent value="health" className="mt-4 sm:mt-6">
          <HealthTracker startDate={startDate} />
        </TabsContent>

        <TabsContent value="achievements" className="mt-4 sm:mt-6">
          <AchievementsList days={currentDay} savings={totalSavings} />
        </TabsContent>

        <TabsContent value="epic" className="mt-4 sm:mt-6">
          <EpicQuestsManager />
        </TabsContent>

        <TabsContent value="poderio" className="mt-4 sm:mt-6">
          <HabitsManager />
        </TabsContent>

        <TabsContent value="donate" className="mt-4 sm:mt-6">
          <DonationSection />
        </TabsContent>

        <TabsContent value="settings" className="mt-4 sm:mt-6">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainTabs;