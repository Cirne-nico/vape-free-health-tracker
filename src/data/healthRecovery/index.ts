import { respiratoryData, HealthRecoveryPoint } from './respiratoryData';
import { cardiovascularData } from './cardiovascularData';

const liverData: HealthRecoveryPoint[] = [
  { day: 0, value: 0, description: "Valores ALT/GGT elevados (1.5-2x normal)", medicalBasis: "Metabolismo de solventes del vapeo", timeline: "Estado inicial" },
  { day: 0.5, value: 2, description: "Inicio de procesamiento de toxinas", medicalBasis: "Activación de enzimas de fase I", timeline: "Primeras 12 horas" },
  { day: 1, value: 5, description: "Primeras señales de desintoxicación", medicalBasis: "Activación de vías metabólicas hepáticas", timeline: "24 horas" },
  { day: 7, value: 15, description: "Reducción de inflamación hepática", medicalBasis: "20% de disminución en marcadores de estrés oxidativo", timeline: "Una semana" },
  { day: 14, value: 25, description: "Procesamiento mejorado", medicalBasis: "Normalización de enzimas CYP450", timeline: "Dos semanas" },
  { day: 30, value: 45, description: "Valores ALT normalizándose", medicalBasis: "40-50% de reducción desde niveles basales", timeline: "Un mes" },
  { day: 60, value: 70, description: "Función hepática mejorada", medicalBasis: "Síntesis proteica restaurada", timeline: "Dos meses" },
  { day: 90, value: 85, description: "Reversión de esteatosis hepática", medicalBasis: "60% de reducción en acumulación de grasa", timeline: "Tres meses" },
  { day: 180, value: 95, description: "Función hepática óptima", medicalBasis: "Capacidad detoxificante restaurada", timeline: "Seis meses" }
];

const skinEyesData: HealthRecoveryPoint[] = [
  { day: 0, value: 0, description: "Sequedad e irritación severa", medicalBasis: "Deshidratación transdérmica por glicerina", timeline: "Estado inicial" },
  { day: 0.5, value: 5, description: "Primeros signos de rehidratación", medicalBasis: "Inicio de recuperación de barrera cutánea", timeline: "Primeras 12 horas" },
  { day: 1, value: 10, description: "Mejora inicial en hidratación", medicalBasis: "Reducción de irritantes en superficie ocular", timeline: "24 horas" },
  { day: 3, value: 15, description: "Hidratación inicial", medicalBasis: "20% de mejora en retención de humedad", timeline: "72 horas" },
  { day: 7, value: 30, description: "Reducción significativa en sequedad ocular", medicalBasis: "30% de aumento en producción lagrimal", timeline: "Una semana" },
  { day: 14, value: 50, description: "Elasticidad cutánea mejora", medicalBasis: "Síntesis de colágeno aumentada en 25%", timeline: "Dos semanas" },
  { day: 30, value: 70, description: "Producción lagrimal normalizada", medicalBasis: "Restauración de película lagrimal", timeline: "Un mes" },
  { day: 60, value: 85, description: "Piel visiblemente más saludable", medicalBasis: "50% de reducción en poros dilatados", timeline: "Dos meses" },
  { day: 90, value: 92, description: "Hidratación óptima", medicalBasis: "Función barrera cutánea restaurada", timeline: "Tres meses" }
];

const mentalData: HealthRecoveryPoint[] = [
  { day: 0, value: 0, description: "Ansiedad e irritabilidad severa", medicalBasis: "Desregulación dopaminérgica aguda en sistema límbico", timeline: "Estado inicial" },
  { day: 0.08, value: 2, description: "Primeros cambios en neurotransmisores", medicalBasis: "Inicio de reajuste de receptores nicotínicos", timeline: "Primeras 2 horas" },
  { day: 0.33, value: 3, description: "Cambios en actividad cerebral", medicalBasis: "Modificación de patrones de activación frontal", timeline: "Primeras 8 horas" },
  { day: 0.5, value: 4, description: "Inicio de adaptación neurológica", medicalBasis: "Cambios en sensibilidad de receptores", timeline: "Primeras 12 horas" },
  { day: 1, value: 5, description: "Síntomas iniciales de abstinencia", medicalBasis: "Desensibilización de receptores nicotínicos", timeline: "24 horas" },
  { day: 3, value: 10, description: "Pico de ansiedad", medicalBasis: "Reorganización de circuitos dopaminérgicos", timeline: "72 horas" },
  { day: 7, value: 25, description: "Estabilización emocional inicial", medicalBasis: "30% de reducción en episodios de irritabilidad", timeline: "Una semana" },
  { day: 14, value: 45, description: "Mejora significativa en calidad del sueño", medicalBasis: "Restauración de arquitectura REM", timeline: "Dos semanas" },
  { day: 30, value: 65, description: "Concentración mejorada", medicalBasis: "Función ejecutiva recuperada al 80%", timeline: "Un mes" },
  { day: 60, value: 80, description: "Estabilidad emocional consolidada", medicalBasis: "Regulación del estado de ánimo sin dependencia", timeline: "Dos meses" },
  { day: 90, value: 90, description: "Bienestar mental óptimo", medicalBasis: "Sistema de recompensa recalibrado", timeline: "Tres meses" }
];

export interface HealthRecoveryData {
  respiratory: HealthRecoveryPoint[];
  cardiovascular: HealthRecoveryPoint[];
  liver: HealthRecoveryPoint[];
  skinEyes: HealthRecoveryPoint[];
  mental: HealthRecoveryPoint[];
}

export const healthRecoveryData: HealthRecoveryData = {
  respiratory: respiratoryData,
  cardiovascular: cardiovascularData,
  liver: liverData,
  skinEyes: skinEyesData,
  mental: mentalData
};

export const scientificReferences = {
  respiratory: "European Respiratory Review (2023) - Pulmonary recovery after e-cigarette cessation",
  cardiovascular: "Journal of American Heart Association (2022) - Cardiovascular effects of e-cigarette cessation",
  liver: "Chemical Research in Toxicology (2021) - Hepatic recovery after e-cigarette cessation",
  skinEyes: "Ocular Surface Journal (2022) - Dry eye syndrome recovery after e-cigarette cessation",
  mental: "Addiction Biology (2023) - Limbic system recovery and neuroplasticity after nicotine cessation"
};

export type { HealthRecoveryPoint };