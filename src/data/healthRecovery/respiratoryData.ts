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
    description: "Lung function compromised by bronchial inflammation",
    medicalBasis: "Glycerin accumulation in alveoli",
    timeline: "Initial state"
  },
  { 
    day: 1, 
    value: 5, 
    description: "Initial reduction of irritation",
    medicalBasis: "Reactivation of respiratory cilia",
    timeline: "First 24 hours"
  },
  { 
    day: 3, 
    value: 15, 
    description: "Significant decrease in morning cough",
    medicalBasis: "Active expulsion of flavoring residues",
    timeline: "72 hours"
  },
  { 
    day: 7, 
    value: 25, 
    description: "Notable improvement in respiratory capacity",
    medicalBasis: "40% reduction in airway resistance",
    timeline: "First week"
  },
  { 
    day: 14, 
    value: 40, 
    description: "Lung capacity increases 15-20%",
    medicalBasis: "Regeneration of bronchial epithelium",
    timeline: "Two weeks"
  },
  { 
    day: 30, 
    value: 60, 
    description: "Ciliary function restored to 70%",
    medicalBasis: "Efficient mucus elimination",
    timeline: "One month"
  },
  { 
    day: 60, 
    value: 80, 
    description: "Notable physical endurance",
    medicalBasis: "VO₂ max increased 25-30%",
    timeline: "Two months"
  },
  { 
    day: 90, 
    value: 90, 
    description: "Almost complete recovery",
    medicalBasis: "Lung function comparable to non-smokers",
    timeline: "Three months"
  },
  { 
    day: 180, 
    value: 95, 
    description: "Lung function completely normalized",
    medicalBasis: "Forced vital capacity in optimal ranges",
    timeline: "Six months"
  }
];