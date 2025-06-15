import { HealthRecoveryPoint } from './respiratoryData';

export const cardiovascularData: HealthRecoveryPoint[] = [
  { 
    day: 0, 
    value: 0, 
    description: "Frecuencia cardíaca elevada (80-90 lpm)",
    medicalBasis: "Vasoconstricción periférica por efectos nicotínicos",
    timeline: "Estado inicial"
  },
  { 
    day: 0.08, // ~2 horas
    value: 3, 
    description: "Inicio de normalización de frecuencia cardíaca",
    medicalBasis: "Reducción de efectos estimulantes de la nicotina",
    timeline: "Primeras 2 horas"
  },
  { 
    day: 0.33, // ~8 horas
    value: 5, 
    description: "Presión arterial comenzando a estabilizarse",
    medicalBasis: "Disminución de vasoconstricción periférica",
    timeline: "Primeras 8 horas"
  },
  { 
    day: 0.5, // 12 horas
    value: 7, 
    description: "Mejora en circulación periférica",
    medicalBasis: "Reducción de resistencia vascular",
    timeline: "Primeras 12 horas"
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
    medicalBasis: "30% de aumento en flujo sanguíneo",
    timeline: "Dos semanas"
  },
  { 
    day: 30, 
    value: 70, 
    description: "Riesgo cardiovascular reducido en 25%",
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
];