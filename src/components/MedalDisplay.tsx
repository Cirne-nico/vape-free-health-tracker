import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { calculateHealthProgress, getCurrentValue } from './healthData';
import { healthCategories } from './HealthCategories';

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
  const [sliderValue, setSliderValue] = useState([100]); // Empezamos en 100 (oculto)

  const handleMedalClick = (achievement: Achievement) => {
    setSelectedMedal(achievement);
  };

  const handleCloseModal = () => {
    setSelectedMedal(null);
  };

  if (unlockedAchievements.length === 0) {
    return null;
  }

  const getHealthDataForDay = (days: number) => {
    const healthData = calculateHealthProgress(days);
    return {
      respiratory: getCurrentValue('respiratory', days, healthData),
      cardiovascular: getCurrentValue('cardiovascular', days, healthData),
      liver: getCurrentValue('liver', days, healthData),
      skinEyes: getCurrentValue('skinEyes', days, healthData),
      mental: getCurrentValue('mental', days, healthData)
    };
  };

  // Calcular la opacidad del ahorro basado en el slider (0 = visible, 100 = oculto)
  const savingsOpacity = Math.max(0, 1 - (sliderValue[0] / 100));
  const revealPercentage = 100 - sliderValue[0];

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
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
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
              
              {/* Sección del ahorro con slider */}
              <div className="bg-blue-50 p-4 rounded-lg relative overflow-hidden">
                <div className="mb-4">
                  <p className="text-sm text-blue-700 mb-2">Desliza para revelar el ahorro:</p>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {revealPercentage.toFixed(0)}% revelado
                  </p>
                </div>
                
                <div 
                  className="transition-opacity duration-300"
                  style={{ opacity: savingsOpacity }}
                >
                  <p className="text-3xl font-bold text-blue-600">{totalSavings.toFixed(2)}€</p>
                  <p className="text-sm text-blue-700 mb-2">ahorrados en total</p>
                  <p className="text-sm text-gray-600 italic">
                    "Cómprate algo con esto o valora pillarte un día libre en el curro"
                  </p>
                </div>
                
                {savingsOpacity < 0.1 && (
                  <div className="absolute inset-0 bg-blue-100/80 flex items-center justify-center backdrop-blur-sm">
                    <p className="text-blue-800 font-medium">
                      Desliza hacia la izquierda para revelar
                    </p>
                  </div>
                )}
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

              {/* Nueva sección: Logros en salud acumulados */}
              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                <h3 className="text-lg font-bold text-purple-700 mb-3">🏥 Logros en Salud Acumulados</h3>
                <p className="text-sm text-purple-600 mb-4">Recuperación alcanzada al día {selectedMedal.days}:</p>
                
                <div className="grid gap-3">
                  {Object.entries(getHealthDataForDay(selectedMedal.days)).map(([key, data]) => {
                    const category = healthCategories[key as keyof typeof healthCategories];
                    return (
                      <div key={key} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{category.icon}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-700">{category.title}</p>
                            <p className="text-xs text-gray-500">{data.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div 
                            className="text-lg font-bold"
                            style={{ color: category.color }}
                          >
                            {data.value}%
                          </div>
                          <div className="text-xs text-gray-500">recuperado</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                  <p className="text-xs text-purple-700 text-center">
                    📊 Datos basados en estudios médicos sobre recuperación post-vapeo
                  </p>
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
