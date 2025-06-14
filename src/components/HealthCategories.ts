export interface HealthCategory {
  title: string;
  icon: string;
  description: string;
  color: string;
}

export const healthCategories = {
  respiratory: {
    title: 'Lungs',
    icon: '🫁',
    description: 'Pulmonary capacity and respiratory function',
    color: '#3B82F6'
  },
  cardiovascular: {
    title: 'Heart', 
    icon: '❤️',
    description: 'Blood pressure and cardiac function',
    color: '#EF4444'
  },
  liver: {
    title: 'Liver',
    icon: '🔶',
    description: 'Liver function and ALT/GGT values',
    color: '#F59E0B'
  },
  skinEyes: {
    title: 'Skin & Eyes',
    icon: '👁️',
    description: 'Hydration and dermatological health',
    color: '#10B981'
  },
  mental: {
    title: 'Mental Wellbeing',
    icon: '🧠',
    description: 'Emotional stability and sleep quality',
    color: '#8B5CF6'
  }
} as const;

export type HealthCategoryKey = keyof typeof healthCategories;