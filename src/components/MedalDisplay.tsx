
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Achievement {
  id: string;
  title: string;
  description: string;
  days: number;
  icon: string;
  reward: string;
}

interface MedalDisplayProps {
  unlockedAchievements: Achievement[];
  totalSavings: number;
}

const MedalDisplay = ({ unlockedAchievements, totalSavings }: MedalDisplayProps) => {
  const [selectedMedal, setSelectedMedal] = useState<Achievement | null>(null);

  const handleMedalClick = (achievement: Achievement) => {
    setSelectedMedal(achievement);
  };

  const handleCloseModal = () => {
    setSelectedMedal(null);
  };

  if (unlockedAchievements.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        {unlockedAchievements.map((achievement) => (
          <Tooltip key={achievement.id}>
            <TooltipTrigger>
              <button
                onClick={() => handleMedalClick(achievement)}
                className="text-2xl hover:scale-110 transition-transform duration-200 bg-white/20 rounded-full p-2 backdrop-blur-sm border border-white/30"
              >
                {achievement.icon}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{achievement.title}</p>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {selectedMedal && (
        <Dialog open={!!selectedMedal} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-green-600">
                {selectedMedal.icon} {selectedMedal.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="text-center space-y-4 py-4">
              <p className="text-gray-600">{selectedMedal.description}</p>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-700 mb-2">Beneficio conseguido:</p>
                <p className="text-green-600">{selectedMedal.reward}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{totalSavings.toFixed(2)}€</p>
                <p className="text-sm text-blue-700 mb-2">ahorrados en total</p>
                <p className="text-sm text-gray-600 italic">
                  "Cómprate algo con esto o valora pillarte un día libre en el curro"
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-50 p-2 rounded">
                  <p className="font-medium">Logro alcanzado:</p>
                  <p>Día {selectedMedal.days}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="font-medium">Ahorro del hito:</p>
                  <p>{(selectedMedal.days * ((20/7) + (4/10))).toFixed(2)}€</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MedalDisplay;
