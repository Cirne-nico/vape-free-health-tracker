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
];