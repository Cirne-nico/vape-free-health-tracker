
export const emotionTypes = {
  euphoric: { text: 'Eufórique', type: 'positive', color: '#22C55E', energy: 1, valence: 1 },
  happy: { text: 'Alegre', type: 'positive', color: '#10B981', energy: 1, valence: 1 },
  calm: { text: 'Tranquile', type: 'positive', color: '#3B82F6', energy: -1, valence: 1 },
  proud: { text: 'Orgullose', type: 'positive', color: '#8B5CF6', energy: 0.5, valence: 1 },
  hopeful: { text: 'Esperanzade', type: 'positive', color: '#F59E0B', energy: 0.5, valence: 1 },
  motivated: { text: 'Motivade', type: 'positive', color: '#6366F1', energy: 1, valence: 1 },
  relaxed: { text: 'Relajade', type: 'positive', color: '#14B8A6', energy: -1, valence: 1 },
  satisfied: { text: 'Satisfeche', type: 'positive', color: '#059669', energy: -0.5, valence: 1 },
  optimistic: { text: 'Optimista', type: 'positive', color: '#EC4899', energy: 0.5, valence: 1 },
  neutral: { text: 'Neutral', type: 'neutral', color: '#6B7280', energy: 0, valence: 0 },
  irritable: { text: 'Irritable', type: 'negative', color: '#F97316', energy: 1, valence: -1 },
  sad: { text: 'Triste', type: 'negative', color: '#EF4444', energy: -0.5, valence: -1 },
  depressed: { text: 'Deprimide', type: 'negative', color: '#DC2626', energy: -1, valence: -1 },
  disgusted: { text: 'Sensación de asco', type: 'negative', color: '#8B5CF6', energy: -0.5, valence: -1 },
  anxious: { text: 'Ansiose', type: 'negative', color: '#CA8A04', energy: 0.5, valence: -1 },
  frustrated: { text: 'Frustrade', type: 'negative', color: '#DC2626', energy: 0.5, valence: -1 },
  craving: { text: 'Con antojos', type: 'negative', color: '#EA580C', energy: 0.5, valence: -1 },
  overwhelmed: { text: 'Abrumade', type: 'negative', color: '#B91C1C', energy: 1, valence: -1 },
  restless: { text: 'Inquiete', type: 'negative', color: '#FB923C', energy: 1, valence: -1 },
  foggy: { text: 'Confuse', type: 'negative', color: '#6B7280', energy: -0.5, valence: -1 }
} as const;
