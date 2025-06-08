
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
  currentDay: number;
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

// Hitos de salud específicos para medallas de Higiea
const healthMilestones = [
  {
    id: 'respiratory_day3',
    title: 'Primeros Cilios Respiratorios',
    day: 3,
    category: 'respiratory',
    icon: '🫁',
    description: 'Los cilios respiratorios comienzan a regenerarse',
    reward: 'Mejora inicial en la limpieza pulmonar'
  },
  {
    id: 'cardiovascular_day7',
    title: 'Estabilización Cardíaca',
    day: 7,
    category: 'cardiovascular',
    icon: '❤️',
    description: 'La presión arterial se estabiliza notablemente',
    reward: 'Reducción del riesgo cardiovascular inmediato'
  },
  {
    id: 'respiratory_day14',
    title: 'Capacidad Pulmonar Mejorada',
    day: 14,
    category: 'respiratory',
    icon: '🫁',
    description: 'Capacidad pulmonar aumenta significativamente',
    reward: 'Respiración más profunda y eficiente'
  },
  {
    id: 'liver_day30',
    title: 'Función Hepática Normalizada',
    day: 30,
    category: 'liver',
    icon: '🔶',
    description: 'Los valores ALT y GGT se normalizan',
    reward: 'Hígado funcionando óptimamente'
  },
  {
    id: 'cardiovascular_day60',
    title: 'Circulación Plena',
    day: 60,
    category: 'cardiovascular',
    icon: '❤️',
    description: 'La circulación sanguínea alcanza niveles óptimos',
    reward: 'Eritrocitos y oxigenación en niveles normales'
  },
  {
    id: 'respiratory_day90',
    title: 'Pulmones Regenerados',
    day: 90,
    category: 'respiratory',
    icon: '🫁',
    description: 'Los pulmones alcanzan el 95% de recuperación',
    reward: 'Capacidad respiratoria casi completa'
  },
  {
    id: 'mental_day120',
    title: 'Equilibrio Neurológico',
    day: 120,
    category: 'mental',
    icon: '🧠',
    description: 'Los neurotransmisores alcanzan el equilibrio',
    reward: 'Estabilidad emocional y cognitiva plena'
  },
  {
    id: 'skinEyes_day180',
    title: 'Renovación Dérmica Completa',
    day: 180,
    category: 'skinEyes',
    icon: '👁️',
    description: 'Piel y ojos completamente regenerados',
    reward: 'Aspecto saludable y visión mejorada'
  },
  {
    id: 'cardiovascular_day365',
    title: 'Corazón de No Fumador',
    day: 365,
    category: 'cardiovascular',
    icon: '❤️',
    description: 'El riesgo cardíaco iguala al de un no fumador',
    reward: 'Protección cardiovascular completa'
  }
];

// Función para generar medallas especiales de Victoria (Nike)
const getVictoryMedals = (days: number) => {
  const medals = [];
  const currentSuccessRate = getSuccessRate(days);
  
  if (currentSuccessRate >= 50) {
    medals.push({
      id: 'victory-nike-50',
      type: 'victory',
      title: 'Victoria de Nike - Nivel I',
      icon: '/lovable-uploads/33187119-695f-43d4-b30c-aa40ff98424e.png',
      description: `Has alcanzado un hito donde la tasa de éxito es del ${currentSuccessRate}%. ¡La diosa Nike te sonríe!`,
      reward: 'Reconocimiento de superación estadística - Primer nivel',
      specialMessage: 'Esta medalla representa tu fortaleza contra las estadísticas. Has demostrado una determinación excepcional.'
    });
  }
  
  if (currentSuccessRate >= 75) {
    medals.push({
      id: 'victory-nike-75',
      type: 'victory',
      title: 'Victoria de Nike - Nivel II',
      icon: '/lovable-uploads/33187119-695f-43d4-b30c-aa40ff98424e.png',
      description: `¡Extraordinario! Con una tasa de éxito del ${currentSuccessRate}%, te encuentras en la élite de la perseverancia.`,
      reward: 'Reconocimiento de superación estadística - Nivel élite',
      specialMessage: 'Has alcanzado un nivel de determinación que solo poseen los más resilientes. Nike te corona como ejemplo de victoria.'
    });
  }
  
  return medals;
};

// Función para obtener medallas de salud desbloqueadas (Higiea)
const getHealthMedals = (days: number) => {
  return healthMilestones
    .filter(milestone => days >= milestone.day)
    .map(milestone => ({
      ...milestone,
      type: 'health',
      icon: '/lovable-uploads/017f1411-853a-40b3-9508-75237fbb45fc.png', // Imagen de Higiea
      organIcon: milestone.icon // Icono del órgano específico
    }));
};

const MedalDisplay = ({ unlockedAchievements, totalSavings, currentDay }: MedalDisplayProps) => {
  const [selectedMedal, setSelectedMedal] = useState<Achievement | any | null>(null);
  const [sliderValue, setSliderValue] = useState([100]);

  // Obtener todos los tipos de medallas
  const victoryMedals = getVictoryMedals(currentDay);
  const healthMedals = getHealthMedals(currentDay);
  
  // Procesar medallas de Vigor (Dioniso)
  const vigorMedals = unlockedAchievements.map(achievement => ({
    ...achievement,
    icon: '/lovable-uploads/c2979263-14e3-4063-9c91-c4f503f6fa8d.png',
    type: 'vigor'
  }));
  
  // Combinar todas las medallas con límite de espacio
  const allMedals = [...vigorMedals, ...victoryMedals, ...healthMedals];
  
  // Limitar a 12 medallas máximo para evitar solapamiento
  const displayedMedals = allMedals.slice(0, 12);

  const handleMedalClick = (medal: Achievement | any) => {
    setSelectedMedal(medal);
  };

  const handleCloseModal = () => {
    setSelectedMedal(null);
  };

  if (displayedMedals.length === 0) {
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
      <div className="flex items-center gap-1 flex-wrap max-w-full">
        {displayedMedals.map((medal) => (
          <Tooltip key={medal.id}>
            <TooltipTrigger>
              <button
                onClick={() => handleMedalClick(medal)}
                className={`hover:scale-105 transition-transform duration-200 rounded-full p-0.5 backdrop-blur-sm border relative ${
                  medal.type === 'victory' 
                    ? 'bg-yellow-100/80 border-yellow-300' 
                    : medal.type === 'health'
                    ? 'bg-green-100/80 border-green-300'
                    : 'bg-white/20 border-white/30'
                }`}
              >
                <img 
                  src={medal.icon} 
                  alt={medal.title}
                  className="w-10 h-10 rounded-full object-cover"
                />
                
                {/* Número grabado para medallas de Vigor */}
                {medal.type === 'vigor' && medal.days && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-amber-100 font-black text-xs tracking-wider select-none pointer-events-none"
                      style={{
                        textShadow: `
                          0 1px 0 #8B4513,
                          0 2px 0 #654321,
                          0 3px 0 #543622,
                          0 4px 0 #432815,
                          0 5px 0 #321A08,
                          0 6px 1px rgba(0,0,0,.1),
                          0 0 5px rgba(0,0,0,.1),
                          0 1px 3px rgba(0,0,0,.3),
                          0 3px 5px rgba(0,0,0,.2),
                          0 5px 10px rgba(0,0,0,.25),
                          inset 0 1px 0 rgba(255,255,255,0.3),
                          inset 0 -1px 0 rgba(0,0,0,0.5)
                        `,
                        filter: 'drop-shadow(0 0 2px rgba(139, 69, 19, 0.8))',
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                        backgroundImage: 'linear-gradient(145deg, #F5E6A3 0%, #D4AF37 30%, #B8860B  60%, #8B6914 100%)',
                      }}
                    >
                      {medal.days}
                    </span>
                  </div>
                )}
                
                {/* Icono del órgano para medallas de Salud */}
                {medal.type === 'health' && medal.organIcon && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-xs border border-green-300">
                    {medal.organIcon}
                  </div>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{medal.title}</p>
              <p className="text-xs text-muted-foreground">{medal.description}</p>
              {medal.type === 'victory' && (
                <p className="text-xs text-yellow-600 font-medium">Medalla de Victoria - Nike</p>
              )}
              {medal.type === 'health' && (
                <p className="text-xs text-green-600 font-medium">Medalla de Salud - Higiea</p>
              )}
              {medal.type === 'vigor' && (
                <p className="text-xs text-purple-600 font-medium">Medalla de Vigor - Dioniso</p>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
        
        {allMedals.length > 12 && (
          <div className="text-xs text-gray-500 ml-2">
            +{allMedals.length - 12} más
          </div>
        )}
      </div>

      {selectedMedal && (
        <Dialog open={!!selectedMedal} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className={`text-center text-xl font-bold ${
                selectedMedal.type === 'victory' ? 'text-yellow-600' : 
                selectedMedal.type === 'health' ? 'text-green-600' : 'text-purple-600'
              }`}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="relative">
                    <img 
                      src={selectedMedal.icon} 
                      alt={selectedMedal.title}
                      className="w-16 h-16 rounded-full object-cover border-2 border-current"
                    />
                    {selectedMedal.organIcon && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm border-2 border-green-400">
                        {selectedMedal.organIcon}
                      </div>
                    )}
                  </div>
                  <span>{selectedMedal.title}</span>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="text-center space-y-4 py-4">
              {/* Tipo de medalla */}
              <div className={`${
                selectedMedal.type === 'victory' 
                  ? 'bg-yellow-50 border-yellow-200' 
                  : selectedMedal.type === 'health'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-purple-50 border-purple-200'
              } border rounded-lg p-3`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img 
                    src={selectedMedal.icon} 
                    alt={selectedMedal.type === 'victory' ? 'Nike' : selectedMedal.type === 'health' ? 'Higiea' : 'Dioniso'}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className={`font-bold ${
                    selectedMedal.type === 'victory' ? 'text-yellow-700' : 
                    selectedMedal.type === 'health' ? 'text-green-700' : 'text-purple-700'
                  }`}>
                    Medalla de {selectedMedal.type === 'victory' ? 'Victoria - Nike' : 
                                selectedMedal.type === 'health' ? 'Salud - Higiea' : 'Vigor - Dioniso'}
                  </p>
                </div>
                <p className={`text-sm ${
                  selectedMedal.type === 'victory' ? 'text-yellow-600' : 
                  selectedMedal.type === 'health' ? 'text-green-600' : 'text-purple-600'
                }`}>
                  {selectedMedal.type === 'victory' 
                    ? 'Símbolo de triunfo contra las adversidades estadísticas'
                    : selectedMedal.type === 'health'
                    ? 'Símbolo de recuperación física y bienestar corporal'
                    : 'Símbolo de vitalidad, salud y beneficios de vida'
                  }
                </p>
              </div>

              <p className="text-gray-600">{selectedMedal.description}</p>
              
              <div className={`${
                selectedMedal.type === 'victory' ? 'bg-yellow-50' : 
                selectedMedal.type === 'health' ? 'bg-green-50' : 'bg-purple-50'
              } p-4 rounded-lg`}>
                <p className={`text-sm font-medium ${
                  selectedMedal.type === 'victory' ? 'text-yellow-700' : 
                  selectedMedal.type === 'health' ? 'text-green-700' : 'text-purple-700'
                } mb-2`}>
                  Beneficio conseguido:
                </p>
                <p className={`${
                  selectedMedal.type === 'victory' ? 'text-yellow-600' : 
                  selectedMedal.type === 'health' ? 'text-green-600' : 'text-purple-600'
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

              {/* Información específica por tipo de medalla */}
              {selectedMedal.type === 'health' && (
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                  <h3 className="text-lg font-bold text-green-700 mb-3">🏛️ Bendición de Higiea</h3>
                  <div className="space-y-3 text-sm text-green-700">
                    <p>
                      <strong>Higiea, diosa griega de la salud</strong>, te otorga esta medalla 
                      como reconocimiento de la recuperación específica de tu {healthCategories[selectedMedal.category]?.title.toLowerCase()}.
                    </p>
                    <div className="bg-green-100 p-3 rounded border">
                      <p className="font-medium mb-2">Hito alcanzado (Día {selectedMedal.day}):</p>
                      <p>{selectedMedal.description}</p>
                      <p className="text-xs mt-2 italic">
                        Esta recuperación se basa en evidencia médica documentada.
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
                      <p>Solo el {getSuccessRate(currentDay)}% de las personas llegan donde tú has llegado.</p>
                      <p className="text-xs mt-2 italic">
                        Has demostrado ser parte de una minoría resiliente y determinada.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Solo mostrar ahorros y salud para medallas de Vigor */}
              {selectedMedal.type === 'vigor' && (
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
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MedalDisplay;
