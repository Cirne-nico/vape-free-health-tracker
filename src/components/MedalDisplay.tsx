
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

// Función para calcular la tasa de éxito según estudios reales
const getSuccessRate = (day: number) => {
  if (day < 1) return 95;
  if (day < 3) return 78;
  if (day < 7) return 65;
  if (day < 14) return 52;
  if (day < 30) return 41;
  if (day < 90) return 28;
  return 15;
};

// Función para generar medallas especiales
const getSpecialMedals = (days: number) => {
  const medals = [];
  const currentSuccessRate = getSuccessRate(days);
  
  // Primera medalla de Victoria (Nike) - cuando la tasa de éxito >= 50%
  if (currentSuccessRate >= 50) {
    medals.push({
      id: 'victory-nike-50',
      type: 'victory',
      title: 'Victoria de Nike - Nivel I',
      icon: '/lovable-uploads/33187119-695f-43d4-b30c-aa40ff98424e.png',
      description: `Has alcanzado un hito donde la tasa de éxito es del ${currentSuccessRate}%. ¡La diosa Nike te sonríe!`,
      reward: 'Reconocimiento de superación estadística - Primer nivel',
      hasEconomicBenefits: false,
      hasHealthBenefits: false,
      specialMessage: 'Esta medalla representa tu fortaleza contra las estadísticas. Has demostrado una determinación excepcional.'
    });
  }
  
  // Segunda medalla de Victoria (Nike) - cuando la tasa de éxito >= 75%
  if (currentSuccessRate >= 75) {
    medals.push({
      id: 'victory-nike-75',
      type: 'victory',
      title: 'Victoria de Nike - Nivel II',
      icon: '/lovable-uploads/33187119-695f-43d4-b30c-aa40ff98424e.png',
      description: `¡Extraordinario! Con una tasa de éxito del ${currentSuccessRate}%, te encuentras en la élite de la perseverancia.`,
      reward: 'Reconocimiento de superación estadística - Nivel élite',
      hasEconomicBenefits: false,
      hasHealthBenefits: false,
      specialMessage: 'Has alcanzado un nivel de determinación que solo poseen los más resilientes. Nike te corona como ejemplo de victoria.'
    });
  }
  
  return medals;
};

// Función para determinar si una medalla es de Vigor (Dioniso)
const isVigorMedal = (achievement: Achievement) => {
  // Las medallas normales de logros son de tipo "Vigor"
  return true; // Todas las medallas de achievements regulares son de Vigor
};

const MedalDisplay = ({ unlockedAchievements, totalSavings }: MedalDisplayProps) => {
  const [selectedMedal, setSelectedMedal] = useState<Achievement | any | null>(null);
  const [sliderValue, setSliderValue] = useState([100]);

  // Obtener días actuales para calcular medallas especiales
  const currentDays = unlockedAchievements.length > 0 ? 
    Math.max(...unlockedAchievements.map(a => a.days)) : 0;
  
  const specialMedals = getSpecialMedals(currentDays);
  
  // Asignar imagen de Dioniso a medallas de Vigor
  const processedAchievements = unlockedAchievements.map(achievement => ({
    ...achievement,
    icon: '/lovable-uploads/c2979263-14e3-4063-9c91-c4f503f6fa8d.png', // Imagen de Dioniso
    type: 'vigor'
  }));
  
  const allMedals = [...processedAchievements, ...specialMedals];

  const handleMedalClick = (medal: Achievement | any) => {
    setSelectedMedal(medal);
  };

  const handleCloseModal = () => {
    setSelectedMedal(null);
  };

  if (allMedals.length === 0) {
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

  const savingsOpacity = Math.max(0, 1 - (sliderValue[0] / 100));
  const revealPercentage = 100 - sliderValue[0];

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        {allMedals.map((medal) => (
          <Tooltip key={medal.id}>
            <TooltipTrigger>
              <button
                onClick={() => handleMedalClick(medal)}
                className={`hover:scale-110 transition-transform duration-200 rounded-full p-1 backdrop-blur-sm border ${
                  medal.type === 'victory' 
                    ? 'bg-yellow-100/80 border-yellow-300' 
                    : 'bg-white/20 border-white/30'
                }`}
              >
                <img 
                  src={medal.icon} 
                  alt={medal.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{medal.title}</p>
              <p className="text-xs text-muted-foreground">{medal.description}</p>
              {medal.type === 'victory' && (
                <p className="text-xs text-yellow-600 font-medium">Medalla de Victoria - Nike</p>
              )}
              {medal.type !== 'victory' && (
                <p className="text-xs text-purple-600 font-medium">Medalla de Vigor - Dioniso</p>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {selectedMedal && (
        <Dialog open={!!selectedMedal} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className={`text-center text-xl font-bold ${
                selectedMedal.type === 'victory' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <img 
                    src={selectedMedal.icon} 
                    alt={selectedMedal.title}
                    className="w-16 h-16 rounded-full object-cover border-2 border-current"
                  />
                  <span>{selectedMedal.title}</span>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="text-center space-y-4 py-4">
              {/* Tipo de medalla */}
              <div className={`${
                selectedMedal.type === 'victory' 
                  ? 'bg-yellow-50 border-yellow-200' 
                  : 'bg-purple-50 border-purple-200'
              } border rounded-lg p-3`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img 
                    src={selectedMedal.icon} 
                    alt={selectedMedal.type === 'victory' ? 'Nike' : 'Dioniso'}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className={`font-bold ${
                    selectedMedal.type === 'victory' ? 'text-yellow-700' : 'text-purple-700'
                  }`}>
                    Medalla de {selectedMedal.type === 'victory' ? 'Victoria - Nike' : 'Vigor - Dioniso'}
                  </p>
                </div>
                <p className={`text-sm ${
                  selectedMedal.type === 'victory' ? 'text-yellow-600' : 'text-purple-600'
                }`}>
                  {selectedMedal.type === 'victory' 
                    ? 'Símbolo de triunfo contra las adversidades estadísticas'
                    : 'Símbolo de vitalidad, salud y beneficios de vida'
                  }
                </p>
              </div>

              <p className="text-gray-600">{selectedMedal.description}</p>
              
              <div className={`${
                selectedMedal.type === 'victory' ? 'bg-yellow-50' : 'bg-green-50'
              } p-4 rounded-lg`}>
                <p className={`text-sm font-medium ${
                  selectedMedal.type === 'victory' ? 'text-yellow-700' : 'text-green-700'
                } mb-2`}>
                  Beneficio conseguido:
                </p>
                <p className={`${
                  selectedMedal.type === 'victory' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {selectedMedal.reward}
                </p>
                
                {selectedMedal.specialMessage && (
                  <div className="mt-3 p-2 bg-white/50 rounded border border-yellow-300">
                    <p className="text-xs text-yellow-700 italic">
                      {selectedMedal.specialMessage}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Solo mostrar ahorros y salud para medallas de Vigor */}
              {selectedMedal.type !== 'victory' && (
                <>
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

                  {/* Logros en salud acumulados para medallas de Vigor */}
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
                </>
              )}

              {/* Información especial para medallas de Victoria */}
              {selectedMedal.type === 'victory' && (
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <h3 className="text-lg font-bold text-yellow-700 mb-3">🏛️ Significado de la Victoria</h3>
                  <div className="space-y-3 text-sm text-yellow-700">
                    <p>
                      <strong>Nike, la diosa griega de la victoria</strong>, representa tu triunfo 
                      sobre las estadísticas. Esta medalla no otorga beneficios materiales, 
                      sino el reconocimiento de tu fortaleza excepcional.
                    </p>
                    <div className="bg-yellow-100 p-3 rounded border">
                      <p className="font-medium mb-2">Estadística actual:</p>
                      <p>Solo el {getSuccessRate(currentDays)}% de las personas llegan donde tú has llegado.</p>
                      <p className="text-xs mt-2 italic">
                        Has demostrado ser parte de una minoría resiliente y determinada.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MedalDisplay;
