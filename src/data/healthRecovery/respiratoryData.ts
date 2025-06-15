export interface HealthRecoveryPoint {
  day: number;
  value: number;
  description: string;
  medicalBasis?: string;
  timeline?: string;
}

export const respiratoryData: HealthRecoveryPoint[] = [
  { 
    day: 0, 
    value: 0, 
    description: "Función pulmonar comprometida por inflamación bronquial",
    medicalBasis: "Acumulación de glicerina en alvéolos",
    timeline: "Estado inicial"
  },
  { 
    day: 0.04, // ~1 hora
    value: 2, 
    description: "Primeros cambios: Disminución de monóxido de carbono",
    medicalBasis: "Inicio de eliminación de sustancias tóxicas",
    timeline: "Primera hora"
  },
  { 
    day: 0.08, // ~2 horas
    value: 3, 
    description: "Mejora inicial en la oxigenación sanguínea",
    medicalBasis: "Reducción de sustancias que bloquean hemoglobina",
    timeline: "Primeras 2 horas"
  },
  { 
    day: 0.33, // ~8 horas
    value: 4, 
    description: "Niveles de oxígeno en sangre mejorando",
    medicalBasis: "Eliminación progresiva de monóxido de carbono",
    timeline: "Primeras 8 horas"
  },
  { 
    day: 0.5, // 12 horas
    value: 5, 
    description: "Función ciliar comenzando a reactivarse",
    medicalBasis: "Inicio de limpieza de vías respiratorias",
    timeline: "Primeras 12 horas"
  },
  { 
    day: 1, 
    value: 5, 
    description: "Reducción inicial de irritación",
    medicalBasis: "Reactivación de cilios respiratorios",
    timeline: "Primer día"
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
    medicalBasis: "40% de reducción en resistencia de vías aéreas",
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
    description: "Notable resistencia física",
    medicalBasis: "VO₂ máx aumentado 25-30%",
    timeline: "Dos meses"
  },
  { 
    day: 90, 
    value: 90, 
    description: "Recuperación casi completa",
    medicalBasis: "Función pulmonar comparable a no fumadores",
    timeline: "Tres meses"
  },
  { 
    day: 180, 
    value: 95, 
    description: "Función pulmonar completamente normalizada",
    medicalBasis: "Capacidad vital forzada en rangos óptimos",
    timeline: "Seis meses"
  }
];