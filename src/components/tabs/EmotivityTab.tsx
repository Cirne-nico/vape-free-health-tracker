import VirtualRewards from '../VirtualRewards';
import PredictiveAnalysis from '../PredictiveAnalysis';
import HistoryView from '../HistoryView';

interface EmotivityTabProps {
  currentDay: number;
  totalSavings: number;
  unlockedAchievements: any[];
}

const EmotivityTab = ({ currentDay, totalSavings, unlockedAchievements }: EmotivityTabProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <VirtualRewards 
        currentDay={currentDay}
        totalSavings={totalSavings}
        unlockedAchievements={unlockedAchievements}
      />
      <PredictiveAnalysis currentDay={currentDay} />
      <HistoryView />
    </div>
  );
};

export default EmotivityTab;