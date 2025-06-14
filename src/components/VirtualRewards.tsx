import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TooltipHelper } from '@/components/ui/tooltip-helper';
import { Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { checkUnlockedBadges, getNextBadgeToUnlock, emotionalProgressBadges } from './emotionalProgressAnalyzer';
import PointsDisplay from './rewards/PointsDisplay';
import LevelSystem from './rewards/LevelSystem';
import UnlockedBadges from './rewards/UnlockedBadges';
import NextBadgePreview from './rewards/NextBadgePreview';
import MotivationalMessages from './rewards/MotivationalMessages';

interface VirtualRewardsProps {
  currentDay: number;
  totalSavings: number;
  unlockedAchievements: any[];
}

const VirtualRewards = ({ currentDay, totalSavings, unlockedAchievements }: VirtualRewardsProps) => {
  const { t } = useTranslation();
  const [emotionLogs, setEmotionLogs] = useState<any[]>([]);
  const [unlockedEmotionalBadges, setUnlockedEmotionalBadges] = useState<string[]>([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('emotion-logs') || '[]');
    setEmotionLogs(logs);
    
    if (logs.length > 0) {
      const unlocked = checkUnlockedBadges(logs);
      setUnlockedEmotionalBadges(unlocked);
    }
  }, []);

  // Sistema de puntos basado ÚNICAMENTE en actividad emocional
  const calculatePoints = () => {
    if (emotionLogs.length === 0) return 0;
    
    let points = 0;
    points += emotionLogs.length * 25; // 25 puntos por cada registro emocional
    points += unlockedEmotionalBadges.length * 100; // 100 puntos por insignia emocional
    
    // Bonus por consistencia (si hay registros en múltiples días)
    const uniqueDays = new Set(emotionLogs.map(log => log.date?.split('T')[0])).size;
    points += uniqueDays * 15; // 15 puntos extra por cada día con registro
    
    return points;
  };

  const totalPoints = calculatePoints();

  // Obtener insignias desbloqueadas con sus datos completos
  const unlockedBadgesData = emotionalProgressBadges.filter(badge => 
    unlockedEmotionalBadges.includes(badge.id)
  );

  const nextBadge = getNextBadgeToUnlock(emotionLogs, unlockedEmotionalBadges);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          {t('virtualRewards.title')}
          <TooltipHelper
            content={
              <div className="space-y-2">
                <p className="font-semibold">{t('virtualRewards.tooltip.title')}</p>
                <p className="text-sm">{t('virtualRewards.tooltip.description')}</p>
                <p className="font-semibold">{t('virtualRewards.tooltip.purpose')}</p>
                <p className="text-sm">{t('virtualRewards.tooltip.science')}</p>
              </div>
            }
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <PointsDisplay totalPoints={totalPoints} />
        
        <LevelSystem unlockedBadgesCount={unlockedBadgesData.length} />

        <UnlockedBadges unlockedBadgesData={unlockedBadgesData} />

        <NextBadgePreview nextBadge={nextBadge} />

        <MotivationalMessages emotionLogsCount={emotionLogs.length} />
      </CardContent>
    </Card>
  );
};

export default VirtualRewards;