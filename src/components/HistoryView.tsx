
import HistoryStats from './HistoryStats';
import HistoryTabs from './HistoryTabs';
import RecentLogs from './RecentLogs';
import { useEmotionAnalytics } from '@/hooks/useEmotionAnalytics';

const HistoryView = () => {
  const {
    emotionLogs,
    getEmotionBalance,
    getEmotionDistribution,
    getQuadrantData,
    getWeeklyData,
    exportData
  } = useEmotionAnalytics();

  const emotionBalance = getEmotionBalance();
  const emotionDistribution = getEmotionDistribution();
  const quadrantData = getQuadrantData();
  const weeklyData = getWeeklyData();

  return (
    <div className="space-y-4 sm:space-y-6">
      <HistoryStats 
        totalLogs={emotionLogs.length}
        positiveDays={emotionBalance.filter(b => b.score > 0).length}
        maxDay={emotionLogs.length > 0 ? Math.max(...emotionLogs.map(l => l.day)) : 0}
        onExport={exportData}
      />

      <HistoryTabs
        emotionBalance={emotionBalance}
        quadrantData={quadrantData}
        weeklyData={weeklyData}
        emotionDistribution={emotionDistribution}
      />

      <RecentLogs logs={emotionLogs} />
    </div>
  );
};

export default HistoryView;
