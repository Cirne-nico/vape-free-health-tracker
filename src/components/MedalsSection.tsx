import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import MedalDisplay from './MedalDisplay';
import { Achievement, HealthAchievement } from './medals/medalTypes';

interface MedalsSectionProps {
  unlockedAchievements: Achievement[];
  unlockedHealthAchievements: HealthAchievement[];
  totalSavings: number;
}

const MedalsSection = ({ 
  unlockedAchievements, 
  unlockedHealthAchievements, 
  totalSavings 
}: MedalsSectionProps) => {
  if (unlockedAchievements.length === 0 && unlockedHealthAchievements.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
          <Trophy className="w-5 h-5" />
          Medallas Obtenidas
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <MedalDisplay 
          unlockedAchievements={unlockedAchievements}
          unlockedHealthAchievements={unlockedHealthAchievements}
          totalSavings={totalSavings}
        />
      </CardContent>
    </Card>
  );
};

export default MedalsSection;