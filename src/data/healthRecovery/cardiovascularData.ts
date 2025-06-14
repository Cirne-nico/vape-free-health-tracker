import { HealthRecoveryPoint } from './respiratoryData';

export const cardiovascularData: HealthRecoveryPoint[] = [
  { 
    day: 0, 
    value: 0, 
    description: "Elevated heart rate (80-90 bpm)",
    medicalBasis: "Peripheral vasoconstriction due to nicotinic effects",
    timeline: "Initial state"
  },
  { 
    day: 1, 
    value: 10, 
    description: "Initial stabilization",
    medicalBasis: "Reduction of 10-15 bpm in heart rate",
    timeline: "24 hours"
  },
  { 
    day: 7, 
    value: 30, 
    description: "Blood pressure improves 8-12 mmHg",
    medicalBasis: "Reversal of vasoconstriction",
    timeline: "One week"
  },
  { 
    day: 14, 
    value: 50, 
    description: "Optimized peripheral circulation",
    medicalBasis: "30% increase in blood flow",
    timeline: "Two weeks"
  },
  { 
    day: 30, 
    value: 70, 
    description: "Cardiovascular risk reduced by 25%",
    medicalBasis: "Improvement in endothelial function",
    timeline: "One month"
  },
  { 
    day: 60, 
    value: 85, 
    description: "Normalized cardiac function",
    medicalBasis: "Restored heart rate variability",
    timeline: "Two months"
  },
  { 
    day: 90, 
    value: 92, 
    description: "Optimal cardiovascular health",
    medicalBasis: "Risk equated to non-smokers",
    timeline: "Three months"
  }
];