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

export interface AthenaMedal {
  id: string;
  type: 'athena';
  title: string;
  icon: string;
  description: string;
  reward: string;
  days: number;
  specialMessage: string;
}

export interface ChronosMedal {
  id: string;
  type: 'chronos';
  title: string;
  icon: string;
  description: string;
  reward: string;
  days: number;
  specialMessage: string;
}

export interface EpicQuestMedal {
  id: string;
  type: 'epic';
  title: string;
  icon: string;
  description: string;
  reward: string;
  questId: string;
  category: string;
}

export interface HabitMedal {
  id: string;
  type: 'habit';
  title: string;
  icon: string;
  description: string;
  reward: string;
  habitType: string;
  dateObtained: string;
}

export interface ProcessedAchievement extends Achievement {
  type: 'vigor';
}

export interface ProcessedHealthAchievement extends HealthAchievement {
  type: 'health';
}

export type Medal = ProcessedAchievement | ProcessedHealthAchievement | SpecialMedal | AthenaMedal | ChronosMedal | EpicQuestMedal | HabitMedal;

export interface DetailedHealthInfo {
  scientificBasis: string;
  physiologicalProcess: string;
  measurableImpact: string;
  timeline: string;
  references: string;
}