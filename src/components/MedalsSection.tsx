import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);
  
  const totalMedals = unlockedAchievements.length + unlockedHealthAchievements.length;
  
  if (totalMedals === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Medallas Obtenidas ({totalMedals})
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <span className="text-sm">Ocultar</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span className="text-sm">Ver medallas</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <MedalDisplay 
            unlockedAchievements={unlockedAchievements}
            unlockedHealthAchievements={unlockedHealthAchievements}
            totalSavings={totalSavings}
          />
        </CardContent>
      )}
    </Card>
  );
};

export default MedalsSection;