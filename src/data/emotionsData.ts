export interface Emotion {
  id: string;
  name: string;
  category: 'positive' | 'negative' | 'neutral';
  intensity: number;
  color: string;
  icon: string;
  type: 'positive' | 'negative' | 'neutral';
  energy: number;
  valence: number;
}

export const emotionsData: Emotion[] = [
  // Positive emotions
  {
    id: 'happy',
    name: 'Alegre',
    category: 'positive',
    type: 'positive',
    intensity: 8,
    energy: 0.5,
    valence: 0.8,
    color: '#10B981',
    icon: '😊'
  },
  {
    id: 'excited',
    name: 'Eufórique',
    category: 'positive',
    type: 'positive',
    intensity: 9,
    energy: 0.9,
    valence: 0.8,
    color: '#F59E0B',
    icon: '🤩'
  },
  {
    id: 'calm',
    name: 'Tranquile',
    category: 'positive',
    type: 'positive',
    intensity: 6,
    energy: -0.3,
    valence: 0.6,
    color: '#06B6D4',
    icon: '😌'
  },
  {
    id: 'serene',
    name: 'Serene',
    category: 'positive',
    type: 'positive',
    intensity: 5,
    energy: -0.5,
    valence: 0.7,
    color: '#0EA5E9',
    icon: '🧘'
  },
  {
    id: 'confident',
    name: 'Confiade',
    category: 'positive',
    type: 'positive',
    intensity: 7,
    energy: 0.4,
    valence: 0.7,
    color: '#3B82F6',
    icon: '😎'
  },
  {
    id: 'grateful',
    name: 'Agradecide',
    category: 'positive',
    type: 'positive',
    intensity: 7,
    energy: 0.2,
    valence: 0.8,
    color: '#8B5CF6',
    icon: '🙏'
  },
  {
    id: 'motivated',
    name: 'Motivade',
    category: 'positive',
    type: 'positive',
    intensity: 8,
    energy: 0.7,
    valence: 0.7,
    color: '#EF4444',
    icon: '💪'
  },
  {
    id: 'proud',
    name: 'Orgullose',
    category: 'positive',
    type: 'positive',
    intensity: 7,
    energy: 0.3,
    valence: 0.8,
    color: '#F97316',
    icon: '🏆'
  },
  {
    id: 'energetic',
    name: 'Enérgice',
    category: 'positive',
    type: 'positive',
    intensity: 8,
    energy: 0.9,
    valence: 0.6,
    color: '#84CC16',
    icon: '⚡'
  },
  
  // Negative emotions
  {
    id: 'anxious',
    name: 'Ansiose',
    category: 'negative',
    type: 'negative',
    intensity: 7,
    energy: 0.6,
    valence: -0.7,
    color: '#EF4444',
    icon: '😰'
  },
  {
    id: 'sad',
    name: 'Triste',
    category: 'negative',
    type: 'negative',
    intensity: 6,
    energy: -0.5,
    valence: -0.8,
    color: '#6366F1',
    icon: '😢'
  },
  {
    id: 'angry',
    name: 'Enojade',
    category: 'negative',
    type: 'negative',
    intensity: 8,
    energy: 0.8,
    valence: -0.8,
    color: '#DC2626',
    icon: '😠'
  },
  {
    id: 'stressed',
    name: 'Estresade',
    category: 'negative',
    type: 'negative',
    intensity: 8,
    energy: 0.7,
    valence: -0.6,
    color: '#F59E0B',
    icon: '😫'
  },
  {
    id: 'frustrated',
    name: 'Frustrade',
    category: 'negative',
    type: 'negative',
    intensity: 7,
    energy: 0.5,
    valence: -0.7,
    color: '#EA580C',
    icon: '😤'
  },
  {
    id: 'lonely',
    name: 'Sole',
    category: 'negative',
    type: 'negative',
    intensity: 6,
    energy: -0.4,
    valence: -0.6,
    color: '#7C3AED',
    icon: '😔'
  },
  {
    id: 'overwhelmed',
    name: 'Abrumade',
    category: 'negative',
    type: 'negative',
    intensity: 8,
    energy: 0.6,
    valence: -0.8,
    color: '#BE123C',
    icon: '😵'
  },
  {
    id: 'restless',
    name: 'Inquiete',
    category: 'negative',
    type: 'negative',
    intensity: 7,
    energy: 0.8,
    valence: -0.5,
    color: '#C2410C',
    icon: '😣'
  },
  {
    id: 'depressed',
    name: 'Deprimide',
    category: 'negative',
    type: 'negative',
    intensity: 8,
    energy: -0.8,
    valence: -0.9,
    color: '#1E40AF',
    icon: '😞'
  },
  {
    id: 'foggy',
    name: 'Embotade',
    category: 'negative',
    type: 'negative',
    intensity: 6,
    energy: -0.6,
    valence: -0.4,
    color: '#6B7280',
    icon: '🌫️'
  },
  
  // Neutral emotions
  {
    id: 'neutral',
    name: 'Neutral',
    category: 'neutral',
    type: 'neutral',
    intensity: 5,
    energy: 0,
    valence: 0,
    color: '#6B7280',
    icon: '😐'
  },
  {
    id: 'tired',
    name: 'Cansade',
    category: 'neutral',
    type: 'neutral',
    intensity: 4,
    energy: -0.7,
    valence: -0.2,
    color: '#64748B',
    icon: '😴'
  },
  {
    id: 'bored',
    name: 'Aburride',
    category: 'neutral',
    type: 'neutral',
    intensity: 3,
    energy: -0.5,
    valence: -0.3,
    color: '#9CA3AF',
    icon: '😑'
  },
  {
    id: 'confused',
    name: 'Confundide',
    category: 'neutral',
    type: 'neutral',
    intensity: 5,
    energy: 0.2,
    valence: -0.2,
    color: '#8B5CF6',
    icon: '😕'
  },
  {
    id: 'indifferent',
    name: 'Indiferente',
    category: 'neutral',
    type: 'neutral',
    intensity: 3,
    energy: -0.3,
    valence: 0,
    color: '#71717A',
    icon: '😶'
  }
];

// Create emotions map for easy access by ID
export const emotions: Record<string, Emotion> = emotionsData.reduce((acc, emotion) => {
  acc[emotion.id] = emotion;
  return acc;
}, {} as Record<string, Emotion>);

export const getEmotionById = (id: string): Emotion | undefined => {
  return emotionsData.find(emotion => emotion.id === id);
};

export const getEmotionsByCategory = (category: 'positive' | 'negative' | 'neutral'): Emotion[] => {
  return emotionsData.filter(emotion => emotion.category === category);
};