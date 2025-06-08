
export interface Achievement {
  id: string;
  title: string;
  description: string;
  days: number;
  icon: string;
  reward: string;
}

export interface HealthAchievement {
  id: string;
  title: string;
  description: string;
  days: number;
  healthCategory: string;
  icon: string;
  organIcon: string;
  inscription: string;
  reward: string;
  medicalBasis: string;
}

export interface SpecialMedal {
  id: string;
  type: 'victory';
  title: string;
  icon: string;
  description: string;
  reward: string;
  hasEconomicBenefits: boolean;
  hasHealthBenefits: boolean;
  specialMessage: string;
}

export interface ProcessedAchievement extends Achievement {
  type: 'vigor';
}

export interface ProcessedHealthAchievement extends HealthAchievement {
  type: 'health';
}

export type Medal = ProcessedAchievement | ProcessedHealthAchievement | SpecialMedal;

export interface DetailedHealthInfo {
  scientificBasis: string;
  physiologicalProcess: string;
  measurableImpact: string;
  timeline: string;
  references: string;
}
