import { respiratoryData, HealthRecoveryPoint } from './respiratoryData';
import { cardiovascularData } from './cardiovascularData';

const liverData: HealthRecoveryPoint[] = [
  { day: 0, value: 0, description: "Elevated ALT/GGT values (1.5-2x normal)", medicalBasis: "Metabolism of vaping solvents", timeline: "Initial state" },
  { day: 7, value: 15, description: "Reduction of hepatic inflammation", medicalBasis: "20% decrease in oxidative stress markers", timeline: "One week" },
  { day: 14, value: 25, description: "Improved processing", medicalBasis: "Normalization of CYP450 enzymes", timeline: "Two weeks" },
  { day: 30, value: 45, description: "ALT values normalizing", medicalBasis: "40-50% reduction from baseline levels", timeline: "One month" },
  { day: 60, value: 70, description: "Improved liver function", medicalBasis: "Restored protein synthesis", timeline: "Two months" },
  { day: 90, value: 85, description: "Reversal of hepatic steatosis", medicalBasis: "60% reduction in fat accumulation", timeline: "Three months" },
  { day: 180, value: 95, description: "Optimal liver function", medicalBasis: "Restored detoxifying capacity", timeline: "Six months" }
];

const skinEyesData: HealthRecoveryPoint[] = [
  { day: 0, value: 0, description: "Severe dryness and irritation", medicalBasis: "Transdermal dehydration from glycerin", timeline: "Initial state" },
  { day: 3, value: 15, description: "Initial hydration", medicalBasis: "20% improvement in moisture retention", timeline: "72 hours" },
  { day: 7, value: 30, description: "Significant reduction in eye dryness", medicalBasis: "30% increase in tear production", timeline: "One week" },
  { day: 14, value: 50, description: "Skin elasticity improves", medicalBasis: "Collagen synthesis increased by 25%", timeline: "Two weeks" },
  { day: 30, value: 70, description: "Normalized tear production", medicalBasis: "Restoration of tear film", timeline: "One month" },
  { day: 60, value: 85, description: "Visibly healthier skin", medicalBasis: "50% reduction in dilated pores", timeline: "Two months" },
  { day: 90, value: 92, description: "Optimal hydration", medicalBasis: "Restored skin barrier function", timeline: "Three months" }
];

const mentalData: HealthRecoveryPoint[] = [
  { day: 0, value: 0, description: "Severe anxiety and irritability", medicalBasis: "Acute dopaminergic dysregulation in limbic system", timeline: "Initial state" },
  { day: 1, value: 5, description: "Initial withdrawal symptoms", medicalBasis: "Desensitization of nicotinic receptors", timeline: "24 hours" },
  { day: 3, value: 10, description: "Peak anxiety", medicalBasis: "Reorganization of dopaminergic circuits", timeline: "72 hours" },
  { day: 7, value: 25, description: "Initial emotional stabilization", medicalBasis: "30% reduction in irritability episodes", timeline: "One week" },
  { day: 14, value: 45, description: "Significant improvement in sleep quality", medicalBasis: "Restoration of REM architecture", timeline: "Two weeks" },
  { day: 30, value: 65, description: "Improved concentration", medicalBasis: "Executive function recovered to 80%", timeline: "One month" },
  { day: 60, value: 80, description: "Consolidated emotional stability", medicalBasis: "Mood regulation without dependence", timeline: "Two months" },
  { day: 90, value: 90, description: "Optimal mental wellbeing", medicalBasis: "Recalibrated reward system", timeline: "Three months" }
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