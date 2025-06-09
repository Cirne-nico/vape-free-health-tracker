
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Brain, Info } from 'lucide-react';
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
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Sistema de Progreso Emocional
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm p-3">
                <div className="space-y-2">
                  <p className="font-semibold">¿Cómo funciona?</p>
                  <p className="text-sm">Este sistema analiza tus registros emocionales diarios para identificar patrones de progreso y otorgar insignias de reconocimiento.</p>
                  <p className="font-semibold">Sentido del sistema:</p>
                  <p className="text-sm">Motivar la constancia en el registro emocional y celebrar mejoras en tu bienestar psicológico durante el proceso de abandono del vapeo.</p>
                  <p className="font-semibold">Base científica:</p>
                  <p className="text-sm">Basado en la terapia cognitivo-conductual y estudios sobre autorregulación emocional en procesos de cesación de adicciones (Marlatt & Gordon, 1985).</p>
                </div>
              </TooltipContent>
            </Tooltip>
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
    </TooltipProvider>
  );
};

export default VirtualRewards;
