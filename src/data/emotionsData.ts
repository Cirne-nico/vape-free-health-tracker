export interface Emotion {
  id: string;
  name: string;
  category: 'positive' | 'negative' | 'neutral';
  intensity: number;
  color: string;
  icon: string;
}

export const emotionsData: Emotion[] = [
  // Positive emotions
  {
    id: 'happy',
    name: 'Feliz',
    category: 'positive',
    intensity: 8,
    color: '#FFD700',
    icon: '😊'
  },
  {
    id: 'excited',
    name: 'Emocionado',
    category: 'positive',
    intensity: 9,
    color: '#FF6B35',
    icon: '🤩'
  },
  {
    id: 'calm',
    name: 'Tranquilo',
    category: 'positive',
    intensity: 6,
    color: '#4ECDC4',
    icon: '😌'
  },
  {
    id: 'confident',
    name: 'Confiado',
    category: 'positive',
    intensity: 7,
    color: '#45B7D1',
    icon: '😎'
  },
  {
    id: 'grateful',
    name: 'Agradecido',
    category: 'positive',
    intensity: 7,
    color: '#96CEB4',
    icon: '🙏'
  },
  
  // Negative emotions
  {
    id: 'anxious',
    name: 'Ansioso',
    category: 'negative',
    intensity: 7,
    color: '#FF6B6B',
    icon: '😰'
  },
  {
    id: 'sad',
    name: 'Triste',
    category: 'negative',
    intensity: 6,
    color: '#4A90E2',
    icon: '😢'
  },
  {
    id: 'angry',
    name: 'Enojado',
    category: 'negative',
    intensity: 8,
    color: '#E74C3C',
    icon: '😠'
  },
  {
    id: 'stressed',
    name: 'Estresado',
    category: 'negative',
    intensity: 8,
    color: '#F39C12',
    icon: '😫'
  },
  {
    id: 'frustrated',
    name: 'Frustrado',
    category: 'negative',
    intensity: 7,
    color: '#E67E22',
    icon: '😤'
  },
  {
    id: 'lonely',
    name: 'Solo',
    category: 'negative',
    intensity: 6,
    color: '#9B59B6',
    icon: '😔'
  },
  
  // Neutral emotions
  {
    id: 'neutral',
    name: 'Neutral',
    category: 'neutral',
    intensity: 5,
    color: '#95A5A6',
    icon: '😐'
  },
  {
    id: 'tired',
    name: 'Cansado',
    category: 'neutral',
    intensity: 4,
    color: '#7F8C8D',
    icon: '😴'
  },
  {
    id: 'bored',
    name: 'Aburrido',
    category: 'neutral',
    intensity: 3,
    color: '#BDC3C7',
    icon: '😑'
  },
  {
    id: 'confused',
    name: 'Confundido',
    category: 'neutral',
    intensity: 5,
    color: '#A569BD',
    icon: '😕'
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

export const getEmotionIntensityColor = (intensity: number): string => {
  if (intensity >= 8) return '#E74C3C'; // High intensity - red
  if (intensity >= 6) return '#F39C12'; // Medium intensity - orange
  if (intensity >= 4) return '#F1C40F'; // Low-medium intensity - yellow
  return '#2ECC71'; // Low intensity - green
};