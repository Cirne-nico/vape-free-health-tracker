export const emotions = {
  euphoric: { 
    id: 'euphoric',
    text: 'Eufórique', 
    emoji: '🤩', 
    type: 'positive' as const, 
    color: '#22C55E', 
    bgColor: 'bg-green-500',
    energy: 1, 
    valence: 1 
  },
  happy: { 
    id: 'happy',
    text: 'Alegre', 
    emoji: '😊', 
    type: 'positive' as const, 
    color: '#10B981', 
    bgColor: 'bg-green-400',
    energy: 1, 
    valence: 1 
  },
  calm: { 
    id: 'calm',
    text: 'Tranquile', 
    emoji: '😌', 
    type: 'positive' as const, 
    color: '#3B82F6', 
    bgColor: 'bg-blue-400',
    energy: -1, 
    valence: 1 
  },
  proud: { 
    id: 'proud',
    text: 'Orgullose', 
    emoji: '💪', 
    type: 'positive' as const, 
    color: '#8B5CF6', 
    bgColor: 'bg-purple-400',
    energy: 0.5, 
    valence: 1 
  },
  hopeful: { 
    id: 'hopeful',
    text: 'Esperanzade', 
    emoji: '🌟', 
    type: 'positive' as const, 
    color: '#F59E0B', 
    bgColor: 'bg-yellow-400',
    energy: 0.5, 
    valence: 1 
  },
  motivated: { 
    id: 'motivated',
    text: 'Motivade', 
    emoji: '🚀', 
    type: 'positive' as const, 
    color: '#6366F1', 
    bgColor: 'bg-indigo-400',
    energy: 1, 
    valence: 1 
  },
  relaxed: { 
    id: 'relaxed',
    text: 'Relajade', 
    emoji: '🧘‍♂️', 
    type: 'positive' as const, 
    color: '#14B8A6', 
    bgColor: 'bg-teal-400',
    energy: -1, 
    valence: 1 
  },
  satisfied: { 
    id: 'satisfied',
    text: 'Satisfeche', 
    emoji: '😌', 
    type: 'positive' as const, 
    color: '#059669', 
    bgColor: 'bg-emerald-400',
    energy: -0.5, 
    valence: 1 
  },
  optimistic: { 
    id: 'optimistic',
    text: 'Optimista', 
    emoji: '✨', 
    type: 'positive' as const, 
    color: '#EC4899', 
    bgColor: 'bg-pink-400',
    energy: 0.5, 
    valence: 1 
  },
  neutral: { 
    id: 'neutral',
    text: 'Neutral', 
    emoji: '😐', 
    type: 'neutral' as const, 
    color: '#6B7280', 
    bgColor: 'bg-gray-400',
    energy: 0, 
    valence: 0 
  },
  irritable: { 
    id: 'irritable',
    text: 'Irritable', 
    emoji: '😤', 
    type: 'negative' as const, 
    color: '#F97316', 
    bgColor: 'bg-orange-500',
    energy: 1, 
    valence: -1 
  },
  sad: { 
    id: 'sad',
    text: 'Triste', 
    emoji: '😢', 
    type: 'negative' as const, 
    color: '#EF4444', 
    bgColor: 'bg-blue-600',
    energy: -0.5, 
    valence: -1 
  },
  depressed: { 
    id: 'depressed',
    text: 'Deprimide', 
    emoji: '😞', 
    type: 'negative' as const, 
    color: '#DC2626', 
    bgColor: 'bg-red-600',
    energy: -1, 
    valence: -1 
  },
  indifferent: { 
    id: 'indifferent',
    text: 'Indiferente', 
    emoji: '😑', 
    type: 'negative' as const, 
    color: '#64748B', 
    bgColor: 'bg-slate-500',
    energy: -1, 
    valence: -0.5 
  },
  anxious: { 
    id: 'anxious',
    text: 'Ansiose', 
    emoji: '😰', 
    type: 'negative' as const, 
    color: '#CA8A04', 
    bgColor: 'bg-yellow-600',
    energy: 0.5, 
    valence: -1 
  },
  frustrated: { 
    id: 'frustrated',
    text: 'Frustrade', 
    emoji: '😫', 
    type: 'negative' as const, 
    color: '#DC2626', 
    bgColor: 'bg-red-500',
    energy: 0.5, 
    valence: -1 
  },
  craving: { 
    id: 'craving',
    text: 'Con antojos', 
    emoji: '🤤', 
    type: 'negative' as const, 
    color: '#EA580C', 
    bgColor: 'bg-orange-600',
    energy: 0.5, 
    valence: -1 
  },
  overwhelmed: { 
    id: 'overwhelmed',
    text: 'Abrumade', 
    emoji: '😵', 
    type: 'negative' as const, 
    color: '#B91C1C', 
    bgColor: 'bg-red-700',
    energy: 1, 
    valence: -1 
  },
  restless: { 
    id: 'restless',
    text: 'Inquiete', 
    emoji: '😣', 
    type: 'negative' as const, 
    color: '#FB923C', 
    bgColor: 'bg-orange-400',
    energy: 1, 
    valence: -1 
  },
  foggy: { 
    id: 'foggy',
    text: 'Confuse', 
    emoji: '🌫️', 
    type: 'negative' as const, 
    color: '#6B7280', 
    bgColor: 'bg-gray-500',
    energy: -0.5, 
    valence: -1 
  }
} as const;

// Array de emociones para componentes que necesiten iterar
export const emotionsArray = Object.values(emotions);

// Tipos derivados
export type EmotionId = keyof typeof emotions;
export type EmotionType = 'positive' | 'negative' | 'neutral';
export type Emotion = typeof emotions[EmotionId];

// Funciones de utilidad
export const getEmotionById = (id: string): Emotion | undefined => {
  return emotions[id as EmotionId];
};

export const getEmotionsByType = (type: EmotionType): Emotion[] => {
  return emotionsArray.filter(emotion => emotion.type === type);
};