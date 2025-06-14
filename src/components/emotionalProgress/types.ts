export interface EmotionalProgressCriteria {
  id: string;
  name: string;
  level: 'I' | 'II';
  description: string;
  icon: string;
  checkCriteria: (logs: any[]) => boolean;
  minDaysRequired: number;
  category: 'serenity' | 'positive_activation' | 'tension_reduction' | 'lethargy_overcome' | 'stability' | 'ventral';
}