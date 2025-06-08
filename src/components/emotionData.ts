
export const emotions = [
  { id: 'euphoric', text: 'Eufórico', emoji: '🤩', type: 'positive', color: 'bg-green-500' },
  { id: 'happy', text: 'Alegre', emoji: '😊', type: 'positive', color: 'bg-green-400' },
  { id: 'calm', text: 'Tranquilo', emoji: '😌', type: 'positive', color: 'bg-blue-400' },
  { id: 'proud', text: 'Orgulloso', emoji: '💪', type: 'positive', color: 'bg-purple-400' },
  { id: 'hopeful', text: 'Esperanzado', emoji: '🌟', type: 'positive', color: 'bg-yellow-400' },
  { id: 'motivated', text: 'Motivado', emoji: '🚀', type: 'positive', color: 'bg-indigo-400' },
  { id: 'relaxed', text: 'Relajado', emoji: '🧘‍♂️', type: 'positive', color: 'bg-teal-400' },
  { id: 'satisfied', text: 'Satisfecho', emoji: '😌', type: 'positive', color: 'bg-emerald-400' },
  { id: 'optimistic', text: 'Optimista', emoji: '✨', type: 'positive', color: 'bg-pink-400' },
  { id: 'neutral', text: 'Neutral', emoji: '😐', type: 'neutral', color: 'bg-gray-400' },
  { id: 'anxious', text: 'Ansioso', emoji: '😰', type: 'negative', color: 'bg-yellow-600' },
  { id: 'irritable', text: 'Irritable', emoji: '😤', type: 'negative', color: 'bg-orange-500' },
  { id: 'sad', text: 'Triste', emoji: '😢', type: 'negative', color: 'bg-blue-600' },
  { id: 'frustrated', text: 'Frustrado', emoji: '😫', type: 'negative', color: 'bg-red-500' },
  { id: 'depressed', text: 'Deprimido', emoji: '😞', type: 'negative', color: 'bg-red-600' },
  { id: 'craving', text: 'Con antojos', emoji: '🤤', type: 'negative', color: 'bg-orange-600' },
  { id: 'disgusted', text: 'Disgusto', emoji: '🤢', type: 'negative', color: 'bg-purple-500' },
  { id: 'overwhelmed', text: 'Abrumado', emoji: '😵', type: 'negative', color: 'bg-red-700' },
  { id: 'restless', text: 'Inquieto', emoji: '😣', type: 'negative', color: 'bg-orange-400' },
  { id: 'foggy', text: 'Confuso', emoji: '🌫️', type: 'negative', color: 'bg-gray-500' }
];

export type Emotion = typeof emotions[0];
