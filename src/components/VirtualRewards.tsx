
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
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

  // Sistema de puntos basado en días, logros y nuevas insignias emocionales
  const calculatePoints = () => {
    let points = currentDay * 10; // 10 puntos por día
    points += unlockedAchievements.length * 50; // 50 puntos por logro
    points += Math.floor(totalSavings / 10) * 5; // 5 puntos por cada 10€ ahorrados
    points += unlockedEmotionalBadges.length * 75; // 75 puntos por insignia emocional
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
          Sistema de Progreso Emocional
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
