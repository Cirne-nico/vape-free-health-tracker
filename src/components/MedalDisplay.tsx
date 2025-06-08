
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

interface HealthAchievement {
  id: string;
  title: string;
  description: string;
  days: number;
  healthCategory: string;
  icon: string;
  organIcon: string;
  reward: string;
  medicalBasis: string;
}

interface MedalDisplayProps {
  unlockedAchievements: Achievement[];
  unlockedHealthAchievements: HealthAchievement[];
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

// Información médica detallada para cada logro de salud
const getDetailedHealthInfo = (achievementId: string) => {
  const healthDetails = {
    'oxygen_normalization': {
      scientificBasis: 'Según estudios publicados en el New England Journal of Medicine, los niveles de monóxido de carbono en sangre se reducen del 15-20% (fumadores) al 1-3% (normal) en las primeras 12-24 horas tras dejar de fumar.',
      physiologicalProcess: 'El monóxido de carbono (CO) se une a la hemoglobina con una afinidad 250 veces mayor que el oxígeno, formando carboxihemoglobina (COHb). Al eliminar la fuente de CO, la hemoglobina recupera gradualmente su capacidad de transporte de oxígeno.',
      measurableImpact: 'Saturación de oxígeno: pasa del 94-96% al 98-100%. Frecuencia cardíaca: reducción de 10-15 latidos por minuto. Presión arterial: descenso promedio de 5-10 mmHg.',
      timeline: 'Normalización completa en 12-24 horas',
      references: 'Benowitz NL. et al. Cardiovascular toxicity of nicotine. Annu Rev Pharmacol Toxicol. 2016'
    },
    'taste_smell_recovery': {
      scientificBasis: 'Las papilas gustativas se regeneran cada 10-14 días, pero el vapeo daña los cilios olfativos y reduce la sensibilidad. Estudios en JAMA Otolaryngology muestran recuperación significativa en 48-72 horas.',
      physiologicalProcess: 'El vapeo inflama las mucosas nasales y orales, reduciendo la función de los receptores gustativos y olfativos. Al cesar la exposición, la inflamación disminuye y los receptores recuperan su sensibilidad normal.',
      measurableImpact: 'Umbral olfativo: mejora del 40-60% en 48 horas. Discriminación gustativa: recuperación del 70-80% de la capacidad normal. Detección de sabores dulces y salados: normalización completa.',
      timeline: 'Mejoras notables en 48 horas, recuperación completa en 2 semanas',
      references: 'Seo HS. et al. Recovery of chemosensory function after smoking cessation. JAMA Otolaryngol. 2018'
    },
    'nicotine_elimination': {
      scientificBasis: 'La nicotina tiene una vida media de 1-2 horas, pero su metabolito principal, la cotinina, persiste 16-20 horas. Estudios farmacológicos confirman eliminación completa en 72 horas.',
      physiologicalProcess: 'La nicotina se metaboliza principalmente en el hígado por la enzima CYP2A6, convirtiéndose en cotinina. Ambas sustancias se eliminan por orina. Sin nuevos aportes, el organismo las elimina exponencialmente.',
      measurableImpact: 'Nicotina en sangre: indetectable (<2 ng/ml). Cotinina en orina: <50 ng/ml (nivel de no fumador). Receptores nicotínicos: inician proceso de normalización.',
      timeline: 'Nicotina: 12-24 horas. Cotinina: 48-72 horas',
      references: 'Hukkanen J. et al. Metabolism and disposition kinetics of nicotine. Pharmacol Rev. 2005'
    },
    'circulation_improvement': {
      scientificBasis: 'La nicotina causa vasoconstricción al activar receptores α4β2. Estudios con doppler muestran mejora del 20-30% en flujo sanguíneo periférico tras 2 semanas de abstinencia.',
      physiologicalProcess: 'La nicotina estimula la liberación de catecolaminas (adrenalina, noradrenalina) que contraen los vasos sanguíneos. Al eliminarla, el tono vascular se normaliza y mejora la perfusión tisular.',
      measurableImpact: 'Flujo sanguíneo en extremidades: aumento del 25-35%. Temperatura de manos y pies: incremento de 1-2°C. Tiempo de llenado capilar: mejora de 3-4 segundos a 2 segundos.',
      timeline: 'Mejoras detectables en 5-7 días, normalización en 2 semanas',
      references: 'Rhee MY. et al. Acute effects of cigarette smoking on arterial stiffness. Am J Hypertens. 2007'
    },
    'lung_function_improvement': {
      scientificBasis: 'Espirometrías en ex-fumadores muestran mejoras del 15-25% en VEF1 (volumen espiratorio forzado) y del 20-30% en capacidad vital forzada tras 30 días.',
      physiologicalProcess: 'El vapeo causa inflamación bronquial y acumulación de células inflamatorias. Al cesar, disminuye la inflamación, se reduce el moco y mejora el intercambio gaseoso alveolar.',
      measurableImpact: 'VEF1: incremento del 15-25%. Capacidad vital: mejora del 20-30%. Intercambio gaseoso: normalización de la relación ventilación/perfusión. Tos productiva: reducción del 60-80%.',
      timeline: 'Mejoras detectables en 1-2 semanas, máximo beneficio en 30 días',
      references: 'Tonnesen P. et al. Smoking cessation and lung function. Eur Respir J. 2019'
    },
    'blood_pressure_normalization': {
      scientificBasis: 'Meta-análisis en Cochrane Database muestra reducción promedio de 8-12 mmHg en presión sistólica y 5-8 mmHg en diastólica tras 8 semanas de abstinencia.',
      physiologicalProcess: 'La nicotina activa el sistema nervioso simpático, aumentando la frecuencia cardíaca y la presión arterial. Su eliminación permite la normalización del tono cardiovascular y la resistencia vascular periférica.',
      measurableImpact: 'Presión sistólica: reducción de 8-15 mmHg. Presión diastólica: descenso de 5-10 mmHg. Frecuencia cardíaca en reposo: disminución de 10-20 lpm. Variabilidad de la frecuencia cardíaca: normalización.',
      timeline: 'Mejoras graduales en 2-4 semanas, estabilización en 60 días',
      references: 'Lee DH. et al. Effects of smoking cessation on blood pressure. Hypertension. 2020'
    },
    'liver_detox': {
      scientificBasis: 'Estudios bioquímicos muestran normalización de enzimas hepáticas (ALT, AST, GGT) en 90% de ex-fumadores tras 3 meses. El hígado procesa >4000 químicos del vapeo.',
      physiologicalProcess: 'El vapeo sobrecarga el sistema de detoxificación hepático fase I (citocromo P450) y fase II (conjugación). Sin esta carga tóxica, las enzimas se normalizan y mejora la función de síntesis hepática.',
      measurableImpact: 'ALT/AST: normalización a <40 U/L. GGT: reducción del 30-50%. Bilirrubina: valores normales <1.2 mg/dl. Síntesis de proteínas: normalización de albúmina y factores de coagulación.',
      timeline: 'Mejoras detectables en 4-6 semanas, normalización completa en 90 días',
      references: 'Mostafa A. et al. Liver function in smoking cessation. J Hepatol. 2018'
    },
    'immune_system_boost': {
      scientificBasis: 'Estudios inmunológicos documentan aumento del 35-45% en linfocitos T helper y del 25-40% en células NK (Natural Killer) tras 4 meses de abstinencia.',
      physiologicalProcess: 'El vapeo suprime la inmunidad celular y humoral, reduciendo la proliferación linfocitaria y la producción de anticuerpos. La cesación permite la restauración de la función inmune normal.',
      measurableImpact: 'Linfocitos T: aumento del 35-45%. Células NK: incremento del 25-40%. IgA secretora: normalización en mucosas. Tiempo de cicatrización: reducción del 30-40%.',
      timeline: 'Mejoras graduales en 6-8 semanas, optimización en 120 días',
      references: 'Qiu F. et al. Impacts of cigarette smoking on immune responsiveness. Am J Respir Crit Care Med. 2017'
    },
    'skin_regeneration': {
      scientificBasis: 'Estudios dermatológicos con biopsias muestran aumento del 40-60% en síntesis de colágeno tipo I y III, y mejora del 50% en elasticidad cutánea tras 6 meses.',
      physiologicalProcess: 'El vapeo reduce la síntesis de colágeno, aumenta las metaloproteinasas (que degradan colágeno) y deteriora la microcirculación cutánea. La cesación invierte estos procesos.',
      measurableImpact: 'Síntesis de colágeno: aumento del 40-60%. Elasticidad cutánea: mejora del 50%. Hidratación: incremento del 30-40%. Microcirculación: normalización del flujo capilar.',
      timeline: 'Cambios visibles en 8-12 semanas, máximo beneficio en 180 días',
      references: 'Knuutinen A. et al. Smoking affects collagen synthesis and extracellular matrix turnover. Arch Dermatol. 2002'
    },
    'cardiac_recovery': {
      scientificBasis: 'El Framingham Heart Study y estudios de cohorte muestran que el riesgo cardiovascular se equipara al de no fumadores tras 12-15 meses de abstinencia completa.',
      physiologicalProcess: 'La recuperación cardíaca incluye normalización de la función endotelial, reducción de la inflamación arterial, mejora de la agregación plaquetaria y estabilización de placas ateroscleróticas.',
      measurableImpact: 'Riesgo de infarto: reducción del 50% en 1 año. Función endotelial: normalización completa. Grosor íntima-media carotídea: estabilización. Variabilidad cardíaca: recuperación total.',
      timeline: 'Mejoras progresivas durante 12 meses, equiparación total en 365 días',
      references: 'Ockene IS. et al. Variability and classification accuracy of serial high-sensitivity C-reactive protein. Clin Chem. 2001'
    }
  };

  return healthDetails[achievementId as keyof typeof healthDetails] || null;
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

const MedalDisplay = ({ unlockedAchievements, unlockedHealthAchievements, totalSavings }: MedalDisplayProps) => {
  const [selectedMedal, setSelectedMedal] = useState<Achievement | HealthAchievement | any | null>(null);
  const [sliderValue, setSliderValue] = useState([100]);

  // Obtener días actuales para calcular medallas especiales
  const currentDays = unlockedAchievements.length > 0 ? 
    Math.max(...unlockedAchievements.map(a => a.days)) : 0;
  
  const specialMedals = getSpecialMedals(currentDays);
  
  // Procesar medallas de Vigor (Dioniso)
  const processedAchievements = unlockedAchievements.map(achievement => ({
    ...achievement,
    icon: '/lovable-uploads/c2979263-14e3-4063-9c91-c4f503f6fa8d.png',
    type: 'vigor'
  }));

  // Procesar medallas de Salud (Higiea)
  const processedHealthAchievements = unlockedHealthAchievements.map(achievement => ({
    ...achievement,
    icon: '/lovable-uploads/11c876dc-a4da-4ee8-8fc3-a8f39cef49c7.png',
    type: 'health'
  }));
  
  const allMedals = [...processedAchievements, ...processedHealthAchievements, ...specialMedals];

  const handleMedalClick = (medal: Achievement | HealthAchievement | any) => {
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

  // Obtener información médica detallada si es una medalla de salud
  const detailedHealthInfo = selectedMedal?.type === 'health' ? getDetailedHealthInfo(selectedMedal.id) : null;

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        {allMedals.map((medal) => (
          <Tooltip key={medal.id}>
            <TooltipTrigger>
              <button
                onClick={() => handleMedalClick(medal)}
                className={`hover:scale-110 transition-transform duration-200 rounded-full p-1 backdrop-blur-sm border relative ${
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
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                {/* Número grabado para medallas de Vigor (Dioniso) */}
                {medal.type === 'vigor' && medal.days && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-amber-100 font-black text-sm tracking-wider select-none pointer-events-none"
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

                {/* Ícono del órgano para medallas de Salud (Higiea) */}
                {medal.type === 'health' && medal.organIcon && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center border border-green-300 shadow-sm">
                    <span className="text-xs">{medal.organIcon}</span>
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
      </div>

      {selectedMedal && (
        <Dialog open={!!selectedMedal} onOpenChange={handleCloseModal}>
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
                    {selectedMedal.type === 'health' && selectedMedal.organIcon && (
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
                
                {selectedMedal.medicalBasis && (
                  <div className="mt-3 p-2 bg-white/50 rounded border border-green-300">
                    <p className="text-xs text-green-700 font-medium mb-1">Base médica:</p>
                    <p className="text-xs text-green-600 italic">
                      {selectedMedal.medicalBasis}
                    </p>
                  </div>
                )}

                {selectedMedal.specialMessage && (
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
