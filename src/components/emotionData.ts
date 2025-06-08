
export const emotions = [
  { id: 'euphoric', text: 'Eufórique', emoji: '🤩', type: 'positive', color: 'bg-green-500' },
  { id: 'happy', text: 'Alegre', emoji: '😊', type: 'positive', color: 'bg-green-400' },
  { id: 'calm', text: 'Tranquile', emoji: '😌', type: 'positive', color: 'bg-blue-400' },
  { id: 'proud', text: 'Orgullose', emoji: '💪', type: 'positive', color: 'bg-purple-400' },
  { id: 'hopeful', text: 'Esperanzade', emoji: '🌟', type: 'positive', color: 'bg-yellow-400' },
  { id: 'motivated', text: 'Motivade', emoji: '🚀', type: 'positive', color: 'bg-indigo-400' },
  { id: 'relaxed', text: 'Relajade', emoji: '🧘‍♂️', type: 'positive', color: 'bg-teal-400' },
  { id: 'satisfied', text: 'Satisfeche', emoji: '😌', type: 'positive', color: 'bg-emerald-400' },
  { id: 'optimistic', text: 'Optimista', emoji: '✨', type: 'positive', color: 'bg-pink-400' },
  { id: 'neutral', text: 'Neutral', emoji: '😐', type: 'neutral', color: 'bg-gray-400' },
  { id: 'anxious', text: 'Ansiose', emoji: '😰', type: 'negative', color: 'bg-yellow-600' },
  { id: 'irritable', text: 'Irritable', emoji: '😤', type: 'negative', color: 'bg-orange-500' },
  { id: 'sad', text: 'Triste', emoji: '😢', type: 'negative', color: 'bg-blue-600' },
  { id: 'frustrated', text: 'Frustrade', emoji: '😫', type: 'negative', color: 'bg-red-500' },
  { id: 'depressed', text: 'Deprimide', emoji: '😞', type: 'negative', color: 'bg-red-600' },
  { id: 'craving', text: 'Con antojos', emoji: '🤤', type: 'negative', color: 'bg-orange-600' },
  { id: 'disgusted', text: 'Sensación de asco', emoji: '🤢', type: 'negative', color: 'bg-purple-500' },
  { id: 'overwhelmed', text: 'Abrumade', emoji: '😵', type: 'negative', color: 'bg-red-700' },
  { id: 'restless', text: 'Inquiete', emoji: '😣', type: 'negative', color: 'bg-orange-400' },
  { id: 'foggy', text: 'Confuse', emoji: '🌫️', type: 'negative', color: 'bg-gray-500' }
];

export type Emotion = typeof emotions[0];
