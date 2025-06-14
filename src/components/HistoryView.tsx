import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { TooltipHelper } from '@/components/ui/tooltip-helper';
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

  const positiveDays = emotionBalance.filter(b => b.score > 0).length;
  const negativeDays = emotionBalance.filter(b => b.score < 0).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Título principal con información */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-center text-blue-700 flex items-center justify-center gap-2">
            📊 Análisis de tu Historial Emocional
            <TooltipHelper
              content={
                <div className="space-y-2">
                  <p className="font-semibold">¿Qué es esto?</p>
                  <p className="text-sm">Análisis completo de tus registros emocionales para identificar patrones y tendencias durante tu proceso de abandono del vapeo.</p>
                  <p className="font-semibold">Sentido del análisis:</p>
                  <p className="text-sm">Proporcionar insights sobre tu evolución emocional y ayudarte a identificar factores que influyen en tu bienestar.</p>
                  <p className="font-semibold">Base científica:</p>
                  <p className="text-sm">Basado en la Teoría Polivagal (TPV) de Stephen Porges, que estudia cómo el sistema nervioso autónomo regula las respuestas emocionales y de seguridad.</p>
                </div>
              }
            />
          </CardTitle>
        </CardHeader>
      </Card>

      <HistoryStats 
        totalLogs={emotionLogs.length}
        positiveDays={positiveDays}
        negativeDays={negativeDays}
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