
export const emotionTypes = {
  euphoric: { text: 'Eufórico', type: 'positive', color: '#22C55E', energy: 1, valence: 1 },
  happy: { text: 'Alegre', type: 'positive', color: '#10B981', energy: 1, valence: 1 },
  calm: { text: 'Tranquilo', type: 'positive', color: '#3B82F6', energy: -1, valence: 1 },
  proud: { text: 'Orgulloso', type: 'positive', color: '#8B5CF6', energy: 0.5, valence: 1 },
  hopeful: { text: 'Esperanzado', type: 'positive', color: '#F59E0B', energy: 0.5, valence: 1 },
  motivated: { text: 'Motivado', type: 'positive', color: '#6366F1', energy: 1, valence: 1 },
  relaxed: { text: 'Relajado', type: 'positive', color: '#14B8A6', energy: -1, valence: 1 },
  satisfied: { text: 'Satisfecho', type: 'positive', color: '#059669', energy: -0.5, valence: 1 },
  optimistic: { text: 'Optimista', type: 'positive', color: '#EC4899', energy: 0.5, valence: 1 },
  neutral: { text: 'Neutral', type: 'neutral', color: '#6B7280', energy: 0, valence: 0 },
  irritable: { text: 'Irritable', type: 'negative', color: '#F97316', energy: 1, valence: -1 },
  sad: { text: 'Triste', type: 'negative', color: '#EF4444', energy: -0.5, valence: -1 },
  depressed: { text: 'Deprimido', type: 'negative', color: '#DC2626', energy: -1, valence: -1 },
  disgusted: { text: 'Disgusto', type: 'negative', color: '#8B5CF6', energy: -0.5, valence: -1 },
  anxious: { text: 'Ansioso', type: 'negative', color: '#CA8A04', energy: 0.5, valence: -1 },
  frustrated: { text: 'Frustrado', type: 'negative', color: '#DC2626', energy: 0.5, valence: -1 },
  craving: { text: 'Con antojos', type: 'negative', color: '#EA580C', energy: 0.5, valence: -1 },
  overwhelmed: { text: 'Abrumado', type: 'negative', color: '#B91C1C', energy: 1, valence: -1 },
  restless: { text: 'Inquieto', type: 'negative', color: '#FB923C', energy: 1, valence: -1 },
  foggy: { text: 'Confuso', type: 'negative', color: '#6B7280', energy: -0.5, valence: -1 }
} as const;
