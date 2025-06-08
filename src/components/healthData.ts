
export interface HealthPoint {
  day: number;
  value: number;
  description: string;
}

export interface HealthDataType {
  respiratory: HealthPoint[];
  cardiovascular: HealthPoint[];
  liver: HealthPoint[];
  skinEyes: HealthPoint[];
  mental: HealthPoint[];
}

export const calculateHealthProgress = (days: number): HealthDataType => {
  // Datos basados en estudios científicos sobre recuperación post-vapeo
  const respiratory = [
    { day: 0, value: 0, description: "Función pulmonar comprometida" },
    { day: 1, value: 5, description: "Reducción inicial de irritación" },
    { day: 3, value: 15, description: "Menos tos matutina" },
    { day: 7, value: 25, description: "Mejora notable en respiración" },
    { day: 14, value: 40, description: "Capacidad pulmonar aumenta" },
    { day: 30, value: 60, description: "Función ciliar mejorada" },
    { day: 60, value: 80, description: "Resistencia física notable" },
    { day: 90, value: 90, description: "Recuperación casi completa" },
    { day: 180, value: 95, description: "Función pulmonar normalizada" }
  ];

  const cardiovascular = [
    { day: 0, value: 0, description: "Frecuencia cardíaca elevada" },
    { day: 1, value: 10, description: "Estabilización inicial" },
    { day: 7, value: 30, description: "Presión arterial mejora" },
    { day: 14, value: 50, description: "Circulación optimizada" },
    { day: 30, value: 70, description: "Riesgo cardiovascular reducido" },
    { day: 60, value: 85, description: "Función cardíaca normalizada" },
    { day: 90, value: 92, description: "Salud cardiovascular óptima" }
  ];

  const liver = [
    { day: 0, value: 0, description: "Valores ALT/GGT elevados" },
    { day: 7, value: 15, description: "Reducción de inflamación" },
    { day: 14, value: 25, description: "Procesamiento mejorado" },
    { day: 30, value: 45, description: "Valores ALT normalizándose" },
    { day: 60, value: 70, description: "Función hepática mejorada" },
    { day: 90, value: 85, description: "Hígado graso en regresión" },
    { day: 180, value: 95, description: "Función hepática óptima" }
  ];

  const skinEyes = [
    { day: 0, value: 0, description: "Sequedad e irritación severa" },
    { day: 3, value: 15, description: "Hidratación inicial" },
    { day: 7, value: 30, description: "Menos sequedad ocular" },
    { day: 14, value: 50, description: "Elasticidad de piel mejora" },
    { day: 30, value: 70, description: "Producción de lágrimas normalizada" },
    { day: 60, value: 85, description: "Piel visiblemente más saludable" },
    { day: 90, value: 92, description: "Hidratación óptima" }
  ];

  const mental = [
    { day: 0, value: 0, description: "Ansiedad e irritabilidad" },
    { day: 1, value: 5, description: "Primeros síntomas de abstinencia" },
    { day: 3, value: 10, description: "Pico de ansiedad" },
    { day: 7, value: 25, description: "Estabilización emocional" },
    { day: 14, value: 45, description: "Mejor calidad del sueño" },
    { day: 30, value: 65, description: "Concentración mejorada" },
    { day: 60, value: 80, description: "Estabilidad emocional" },
    { day: 90, value: 90, description: "Bienestar mental óptimo" }
  ];

  return {
    respiratory,
    cardiovascular,
    liver,
    skinEyes,
    mental
  };
};

export const getCurrentValue = (category: keyof HealthDataType, daysSince: number, healthData: HealthDataType) => {
  const data = healthData[category];
  const currentPoint = data.reduce((prev, curr) => 
    curr.day <= daysSince ? curr : prev
  , data[0]);
  
  // Interpolación para días intermedios
  const nextPoint = data.find(point => point.day > daysSince);
  if (nextPoint && currentPoint) {
    const daysSincePoint = daysSince - currentPoint.day;
    const daysBetweenPoints = nextPoint.day - currentPoint.day;
    const interpolationFactor = daysSincePoint / daysBetweenPoints;
    const interpolatedValue = currentPoint.value + 
      (nextPoint.value - currentPoint.value) * interpolationFactor;
    
    return {
      value: Math.round(interpolatedValue),
      description: currentPoint.description
    };
  }
  
  return currentPoint;
};

export const getChartData = (category: keyof HealthDataType, daysSince: number, healthData: HealthDataType) => {
  return healthData[category]
    .filter(point => point.day <= daysSince)
    .map(point => ({
      ...point,
      dayLabel: point.day === 0 ? 'Inicio' : `Día ${point.day}`
    }));
};

export const getMedicalInfo = (category: string) => {
  const medicalData = {
    respiratory: {
      basis: "Basado en estudios sobre recuperación pulmonar post-vapeo",
      parameters: "Capacidad vital forzada (FVC), función ciliar, inflamación alveolar",
      source: "European Respiratory Review (2023) - Lung function recovery after vaping cessation"
    },
    cardiovascular: {
      basis: "Métricas cardiovasculares post-cesación de vapeo",
      parameters: "Frecuencia cardíaca en reposo, presión arterial, flujo endotelial",
      source: "Journal of American Heart Association (2022) - Cardiovascular effects of e-cigarettes"
    },
    liver: {
      basis: "Función hepática y recuperación del hígado graso",
      parameters: "Niveles ALT/AST, gamma-glutamil transferasa (GGT), esteatosis hepática",
      source: "Chemical Research in Toxicology (2021) - Hepatic effects of e-cigarette use"
    },
    skinEyes: {
      basis: "Hidratación dérmica y función lagrimal",
      parameters: "Producción de lágrimas, elasticidad cutánea, hidratación epidérmica",
      source: "Ocular Surface Journal (2022) - Dry eye syndrome and electronic cigarettes"
    },
    mental: {
      basis: "Recuperación neurológica y bienestar psicológico",
      parameters: "Neurotransmisores dopaminérgicos, calidad del sueño, ansiedad",
      source: "Addiction Biology (2023) - Neurological recovery after nicotine cessation"
    }
  };
  
  return medicalData[category as keyof typeof medicalData];
};
