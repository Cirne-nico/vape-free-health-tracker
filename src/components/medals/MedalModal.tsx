
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { Medal } from './medalTypes';
import { getDetailedHealthInfo } from './healthMedalData';
import { getSuccessRate } from './medalUtils';
import { calculateHealthProgress, getCurrentValue } from '../healthData';
import { healthCategories } from '../HealthCategories';

interface MedalModalProps {
  selectedMedal: Medal | null;
  totalSavings: number;
  onClose: () => void;
}

export const MedalModal = ({ selectedMedal, totalSavings, onClose }: MedalModalProps) => {
  const [sliderValue, setSliderValue] = useState([100]);

  if (!selectedMedal) return null;

  const savingsOpacity = Math.max(0, 1 - (sliderValue[0] / 100));
  const revealPercentage = 100 - sliderValue[0];
  const detailedHealthInfo = selectedMedal.type === 'health' ? getDetailedHealthInfo(selectedMedal.id) : null;

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

  // Type guard to check if medal has days property
  const medalHasDays = (medal: Medal): medal is Medal & { days: number } => {
    return 'days' in medal && typeof medal.days === 'number';
  };

  return (
    <Dialog open={!!selectedMedal} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={`text-center text-xl font-bold ${
            selectedMedal.type === 'victory' 
              ? 'text-yellow-600' 
              : selectedMedal.type === 'health'
              ? 'text-green-600'
              : 'text-purple-600'
          }`}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="relative">
                <img 
                  src={selectedMedal.icon} 
                  alt={selectedMedal.title}
                  className="w-16 h-16 rounded-full object-cover border-2 border-current"
                />
                {selectedMedal.type === 'health' && 'organIcon' in selectedMedal && selectedMedal.organIcon && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-green-400 shadow-sm">
                    <span className="text-sm">{selectedMedal.organIcon}</span>
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
                selectedMedal.type === 'victory' 
                  ? 'text-yellow-700' 
                  : selectedMedal.type === 'health'
                  ? 'text-green-700'
                  : 'text-purple-700'
              }`}>
                Medalla de {
                  selectedMedal.type === 'victory' 
                    ? 'Victoria - Nike' 
                    : selectedMedal.type === 'health'
                    ? 'Salud - Higiea'
                    : 'Vigor - Dioniso'
                }
              </p>
            </div>
            <p className={`text-sm ${
              selectedMedal.type === 'victory' 
                ? 'text-yellow-600' 
                : selectedMedal.type === 'health'
                ? 'text-green-600'
                : 'text-purple-600'
            }`}>
              {selectedMedal.type === 'victory' 
                ? 'Símbolo de triunfo contra las adversidades estadísticas'
                : selectedMedal.type === 'health'
                ? 'Símbolo de recuperación y sanación corporal'
                : 'Símbolo de vitalidad, salud y beneficios de vida'
              }
            </p>
          </div>

          <p className="text-gray-600">{selectedMedal.description}</p>
          
          <div className={`${
            selectedMedal.type === 'victory' 
              ? 'bg-yellow-50' 
              : selectedMedal.type === 'health'
              ? 'bg-green-50'
              : 'bg-purple-50'
          } p-4 rounded-lg`}>
            <p className={`text-sm font-medium ${
              selectedMedal.type === 'victory' 
                ? 'text-yellow-700' 
                : selectedMedal.type === 'health'
                ? 'text-green-700'
                : 'text-purple-700'
            } mb-2`}>
              Beneficio conseguido:
            </p>
            <p className={`${
              selectedMedal.type === 'victory' 
                ? 'text-yellow-600' 
                : selectedMedal.type === 'health'
                ? 'text-green-600'
                : 'text-purple-600'
            }`}>
              {selectedMedal.reward}
            </p>
            
            {selectedMedal.type === 'health' && 'medicalBasis' in selectedMedal && selectedMedal.medicalBasis && (
              <div className="mt-3 p-2 bg-white/50 rounded border border-green-300">
                <p className="text-xs text-green-700 font-medium mb-1">Base médica:</p>
                <p className="text-xs text-green-600 italic">
                  {selectedMedal.medicalBasis}
                </p>
              </div>
            )}

            {selectedMedal.type === 'victory' && 'specialMessage' in selectedMedal && selectedMedal.specialMessage && (
              <div className="mt-3 p-2 bg-white/50 rounded border border-yellow-300">
                <p className="text-xs text-yellow-700 italic">
                  {selectedMedal.specialMessage}
                </p>
              </div>
            )}
          </div>
          
          {/* Información detallada para medallas de Salud (Higiea) */}
          {selectedMedal.type === 'health' && detailedHealthInfo && (
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200 text-left space-y-6">
              <h3 className="text-xl font-bold text-green-700 mb-4 text-center">🏛️ Análisis Médico Detallado - Higiea</h3>
              
              {/* Base científica */}
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <h4 className="text-lg font-semibold text-green-800 mb-2">📚 Base Científica</h4>
                <p className="text-sm text-green-700 leading-relaxed">
                  {detailedHealthInfo.scientificBasis}
                </p>
              </div>

              {/* Proceso fisiológico */}
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <h4 className="text-lg font-semibold text-green-800 mb-2">🔬 Proceso Fisiológico</h4>
                <p className="text-sm text-green-700 leading-relaxed">
                  {detailedHealthInfo.physiologicalProcess}
                </p>
              </div>

              {/* Impacto medible */}
              <div className="bg-white p-4 rounded-lg border border-green-300">
                <h4 className="text-lg font-semibold text-green-800 mb-2">📊 Impacto Medible</h4>
                <p className="text-sm text-green-700 leading-relaxed">
                  {detailedHealthInfo.measurableImpact}
                </p>
              </div>

              {/* Cronología */}
              <div className="bg-green-100 p-4 rounded-lg border border-green-400">
                <h4 className="text-lg font-semibold text-green-800 mb-2">⏰ Cronología de Recuperación</h4>
                <p className="text-sm text-green-700 font-medium">
                  {detailedHealthInfo.timeline}
                </p>
              </div>

              {/* Referencias */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">📖 Referencias Científicas</h4>
                <p className="text-xs text-gray-600 italic">
                  {detailedHealthInfo.references}
                </p>
              </div>

              {/* Logro específico alcanzado */}
              {selectedMedal.type === 'health' && medalHasDays(selectedMedal) && 'healthCategory' in selectedMedal && (
                <div className="bg-green-200 p-4 rounded-lg border-2 border-green-400">
                  <h4 className="text-lg font-semibold text-green-800 mb-2 text-center">🎯 Tu Logro Específico</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white p-3 rounded border text-center">
                      <p className="font-medium text-green-700">Hito alcanzado:</p>
                      <p className="text-green-600">Día {selectedMedal.days}</p>
                    </div>
                    <div className="bg-white p-3 rounded border text-center">
                      <p className="font-medium text-green-700">Categoría:</p>
                      <p className="text-green-600 capitalize">{selectedMedal.healthCategory}</p>
                    </div>
                  </div>
                  <div className="mt-3 bg-white p-3 rounded border text-center">
                    <p className="font-medium text-green-700 mb-1">Beneficio específico obtenido:</p>
                    <p className="text-green-600 font-semibold">{selectedMedal.reward}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Solo mostrar ahorros y salud para medallas de Vigor */}
          {selectedMedal.type === 'vigor' && medalHasDays(selectedMedal) && (
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
                {medalHasDays(selectedMedal) && (
                  <div className="bg-yellow-100 p-3 rounded border">
                    <p className="font-medium mb-2">Estadística actual:</p>
                    <p>Solo el {getSuccessRate(selectedMedal.days)}% de las personas llegan donde tú has llegado.</p>
                    <p className="text-xs mt-2 italic">
                      Has demostrado ser parte de una minoría resiliente y determinada.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
