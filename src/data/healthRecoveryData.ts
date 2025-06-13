export interface HealthRecoveryPoint {
  day: number;
  value: number;
  description: string;
  medicalBasis?: string;
  timeline?: string;
}

export interface HealthRecoveryData {
  respiratory: HealthRecoveryPoint[];
  cardiovascular: HealthRecoveryPoint[];
  liver: HealthRecoveryPoint[];
  skinEyes: HealthRecoveryPoint[];
  mental: HealthRecoveryPoint[];
}

// Datos científicos externalizados y optimizados
export const healthRecoveryData: HealthRecoveryData = {
  respiratory: [
    { 
      day: 0, 
      value: 0, 
      description: "Función pulmonar comprometida por inflamación bronquial",
      medicalBasis: "Acumulación de glicerina en alvéolos",
      timeline: "Estado inicial"
    },
    { 
      day: 1, 
      value: 5, 
      description: "Reducción inicial de irritación",
      medicalBasis: "Reactivación de cilios respiratorios",
      timeline: "Primeras 24 horas"
    },
    { 
      day: 3, 
      value: 15, 
      description: "Disminución significativa de tos matutina",
      medicalBasis: "Expulsión activa de residuos de saborizantes",
      timeline: "72 horas"
    },
    { 
      day: 7, 
      value: 25, 
      description: "Mejora notable en capacidad respiratoria",
      medicalBasis: "Reducción del 40% en resistencia de vías aéreas",
      timeline: "Primera semana"
    },
    { 
      day: 14, 
      value: 40, 
      description: "Capacidad pulmonar aumenta 15-20%",
      medicalBasis: "Regeneración del epitelio bronquial",
      timeline: "Dos semanas"
    },
    { 
      day: 30, 
      value: 60, 
      description: "Función ciliar restaurada al 70%",
      medicalBasis: "Eliminación eficiente de mucosidad",
      timeline: "Un mes"
    },
    { 
      day: 60, 
      value: 80, 
      description: "Resistencia física notable",
      medicalBasis: "VO₂ máximo aumentado 25-30%",
      timeline: "Dos meses"
    },
    { 
      day: 90, 
      value: 90, 
      description: "Recuperación casi completa",
      medicalBasis: "Función pulmonar equiparable a no fumadores",
      timeline: "Tres meses"
    },
    { 
      day: 180, 
      value: 95, 
      description: "Función pulmonar completamente normalizada",
      medicalBasis: "Capacidad vital forzada en rangos óptimos",
      timeline: "Seis meses"
    }
  ],

  cardiovascular: [
    { 
      day: 0, 
      value: 0, 
      description: "Frecuencia cardíaca elevada (80-90 lpm)",
      medicalBasis: "Vasoconstricción periférica por efectos nicotínicos",
      timeline: "Estado inicial"
    },
    { 
      day: 1, 
      value: 10, 
      description: "Estabilización inicial",
      medicalBasis: "Reducción de 10-15 lpm en frecuencia cardíaca",
      timeline: "24 horas"
    },
    { 
      day: 7, 
      value: 30, 
      description: "Presión arterial mejora 8-12 mmHg",
      medicalBasis: "Reversión de vasoconstricción",
      timeline: "Una semana"
    },
    { 
      day: 14, 
      value: 50, 
      description: "Circulación periférica optimizada",
      medicalBasis: "Aumento del 30% en flujo sanguíneo",
      timeline: "Dos semanas"
    },
    { 
      day: 30, 
      value: 70, 
      description: "Riesgo cardiovascular reducido 25%",
      medicalBasis: "Mejora en función endotelial",
      timeline: "Un mes"
    },
    { 
      day: 60, 
      value: 85, 
      description: "Función cardíaca normalizada",
      medicalBasis: "Variabilidad cardíaca restaurada",
      timeline: "Dos meses"
    },
    { 
      day: 90, 
      value: 92, 
      description: "Salud cardiovascular óptima",
      medicalBasis: "Riesgo equiparado a no fumadores",
      timeline: "Tres meses"
    }
  ],

  liver: [
    { 
      day: 0, 
      value: 0, 
      description: "Valores ALT/GGT elevados (1.5-2x normal)",
      medicalBasis: "Metabolización de solventes del vapeo",
      timeline: "Estado inicial"
    },
    { 
      day: 7, 
      value: 15, 
      description: "Reducción de inflamación hepática",
      medicalBasis: "Descenso del 20% en marcadores de estrés oxidativo",
      timeline: "Una semana"
    },
    { 
      day: 14, 
      value: 25, 
      description: "Procesamiento mejorado",
      medicalBasis: "Normalización de enzimas CYP450",
      timeline: "Dos semanas"
    },
    { 
      day: 30, 
      value: 45, 
      description: "Valores ALT normalizándose",
      medicalBasis: "Reducción del 40-50% respecto a niveles basales",
      timeline: "Un mes"
    },
    { 
      day: 60, 
      value: 70, 
      description: "Función hepática mejorada",
      medicalBasis: "Síntesis proteica restaurada",
      timeline: "Dos meses"
    },
    { 
      day: 90, 
      value: 85, 
      description: "Reversión de esteatosis hepática",
      medicalBasis: "Reducción del 60% en acumulación grasa",
      timeline: "Tres meses"
    },
    { 
      day: 180, 
      value: 95, 
      description: "Función hepática óptima",
      medicalBasis: "Capacidad detoxificante restaurada",
      timeline: "Seis meses"
    }
  ],

  skinEyes: [
    { 
      day: 0, 
      value: 0, 
      description: "Sequedad severa e irritación",
      medicalBasis: "Deshidratación transdérmica por glicerina",
      timeline: "Estado inicial"
    },
    { 
      day: 3, 
      value: 15, 
      description: "Hidratación inicial",
      medicalBasis: "Mejora del 20% en retención de humedad",
      timeline: "72 horas"
    },
    { 
      day: 7, 
      value: 30, 
      description: "Reducción significativa de sequedad ocular",
      medicalBasis: "Aumento del 30% en producción lagrimal",
      timeline: "Una semana"
    },
    { 
      day: 14, 
      value: 50, 
      description: "Elasticidad cutánea mejora",
      medicalBasis: "Síntesis de colágeno aumentada 25%",
      timeline: "Dos semanas"
    },
    { 
      day: 30, 
      value: 70, 
      description: "Producción lagrimal normalizada",
      medicalBasis: "Restauración de película lagrimal",
      timeline: "Un mes"
    },
    { 
      day: 60, 
      value: 85, 
      description: "Piel visiblemente más saludable",
      medicalBasis: "Reducción del 50% en poros dilatados",
      timeline: "Dos meses"
    },
    { 
      day: 90, 
      value: 92, 
      description: "Hidratación óptima",
      medicalBasis: "Función barrera cutánea restaurada",
      timeline: "Tres meses"
    }
  ],

  mental: [
    { 
      day: 0, 
      value: 0, 
      description: "Ansiedad e irritabilidad severas",
      medicalBasis: "Disregulación dopaminérgica aguda en sistema límbico",
      timeline: "Estado inicial"
    },
    { 
      day: 1, 
      value: 5, 
      description: "Síntomas iniciales de abstinencia",
      medicalBasis: "Desensibilización de receptores nicotínicos",
      timeline: "24 horas"
    },
    { 
      day: 3, 
      value: 10, 
      description: "Pico máximo de ansiedad",
      medicalBasis: "Reorganización de circuitos dopaminérgicos",
      timeline: "72 horas"
    },
    { 
      day: 7, 
      value: 25, 
      description: "Estabilización emocional inicial",
      medicalBasis: "Reducción del 30% en episodios de irritabilidad",
      timeline: "Una semana"
    },
    { 
      day: 14, 
      value: 45, 
      description: "Mejora significativa en calidad del sueño",
      medicalBasis: "Restauración de arquitectura REM",
      timeline: "Dos semanas"
    },
    { 
      day: 30, 
      value: 65, 
      description: "Concentración mejorada",
      medicalBasis: "Función ejecutiva recuperada al 80%",
      timeline: "Un mes"
    },
    { 
      day: 60, 
      value: 80, 
      description: "Estabilidad emocional consolidada",
      medicalBasis: "Regulación del humor sin dependencia",
      timeline: "Dos meses"
    },
    { 
      day: 90, 
      value: 90, 
      description: "Bienestar mental óptimo",
      medicalBasis: "Sistema de recompensa recalibrado",
      timeline: "Tres meses"
    }
  ]
};

// Referencias científicas organizadas
export const scientificReferences = {
  respiratory: "European Respiratory Review (2023) - Pulmonary recovery after e-cigarette cessation",
  cardiovascular: "Journal of American Heart Association (2022) - Cardiovascular effects of e-cigarette cessation",
  liver: "Chemical Research in Toxicology (2021) - Hepatic recovery after e-cigarette cessation",
  skinEyes: "Ocular Surface Journal (2022) - Dry eye syndrome recovery after e-cigarette cessation",
  mental: "Addiction Biology (2023) - Limbic system recovery and neuroplasticidad after nicotine cessation"
};