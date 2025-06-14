import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';

interface Level {
  name: string;
  icon: string;
  minBadges: number;
  color: string;
  description: string;
}

interface LevelSystemProps {
  unlockedBadgesCount: number;
}

const LevelSystem = ({ unlockedBadgesCount }: LevelSystemProps) => {
  const { t } = useTranslation();
  
  const levels: Level[] = [
    { 
      name: t('virtualRewards.levels.dorsal.name'), 
      icon: '🪨',
      minBadges: 0, 
      color: 'text-gray-600',
      description: t('virtualRewards.levels.dorsal.description')
    },
    { 
      name: t('virtualRewards.levels.dorsalAwakening.name'), 
      icon: '🌫️',
      minBadges: 2, 
      color: 'text-gray-500',
      description: t('virtualRewards.levels.dorsalAwakening.description')
    },
    { 
      name: t('virtualRewards.levels.sympatheticTransition.name'), 
      icon: '💧',
      minBadges: 4, 
      color: 'text-blue-600',
      description: t('virtualRewards.levels.sympatheticTransition.description')
    },
    { 
      name: t('virtualRewards.levels.emergingBalance.name'), 
      icon: '🌿',
      minBadges: 6, 
      color: 'text-green-600',
      description: t('virtualRewards.levels.emergingBalance.description')
    },
    { 
      name: t('virtualRewards.levels.earlyVentral.name'), 
      icon: '🌀',
      minBadges: 8, 
      color: 'text-cyan-600',
      description: t('virtualRewards.levels.earlyVentral.description')
    },
    { 
      name: t('virtualRewards.levels.matureVentral.name'), 
      icon: '🌬️',
      minBadges: 10, 
      color: 'text-purple-600',
      description: t('virtualRewards.levels.matureVentral.description')
    },
    { 
      name: t('virtualRewards.levels.totalPresence.name'), 
      icon: '🪶',
      minBadges: 12, 
      color: 'text-golden-600',
      description: t('virtualRewards.levels.totalPresence.description')
    }
  ];

  const currentLevel = levels.slice().reverse().find(level => unlockedBadgesCount >= level.minBadges) || levels[0];
  const nextLevel = levels.find(level => unlockedBadgesCount < level.minBadges);
  const progressToNext = nextLevel ? 
    ((unlockedBadgesCount - currentLevel.minBadges) / (nextLevel.minBadges - currentLevel.minBadges)) * 100 : 100;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-lg">{currentLevel.icon}</span>
        <Badge className={`${currentLevel.color}`}>
          {currentLevel.name}
        </Badge>
      </div>
      
      <p className="text-xs text-gray-600 italic mb-3 px-2 text-center">
        {currentLevel.description}
      </p>
      
      {nextLevel && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{t('virtualRewards.progressToNextLevel')}</span>
            <span>{t('virtualRewards.remainingStates', { count: nextLevel.minBadges - unlockedBadgesCount })}</span>
          </div>
          <Progress value={progressToNext} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default LevelSystem;