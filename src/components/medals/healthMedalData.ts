
import { DetailedHealthInfo } from './medalTypes';

// Información médica detallada para cada logro de salud
export const getDetailedHealthInfo = (achievementId: string): DetailedHealthInfo | null => {
  const healthDetails: Record<string, DetailedHealthInfo> = {
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

  return healthDetails[achievementId] || null;
};
