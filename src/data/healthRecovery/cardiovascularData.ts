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
];