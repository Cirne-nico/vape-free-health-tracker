import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TooltipHelper } from '@/components/ui/tooltip-helper';
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
          Sistema de Progreso Emocional
          <TooltipHelper
            content={
              <div className="space-y-2">
                <p className="font-semibold">¿Cómo funciona?</p>
                <p className="text-sm">Este sistema analiza tus registros emocionales diarios para identificar patrones de progreso y otorgar insignias de reconocimiento.</p>
                <p className="font-semibold">Sentido del sistema:</p>
                <p className="text-sm">Motivar la constancia en el registro emocional y celebrar mejoras en tu bienestar psicológico durante el proceso de abandono del vapeo.</p>
                <p className="font-semibold">Base científica:</p>
                <p className="text-sm">Basado en la terapia cognitivo-conductual y estudios sobre autorregulación emocional en procesos de cesación de adicciones (Marlatt & Gordon, 1985).</p>
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