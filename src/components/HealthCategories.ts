
export interface HealthCategory {
  title: string;
  icon: string;
  description: string;
  color: string;
}

export const healthCategories = {
  respiratory: {
    title: 'Sistema Respiratorio',
    icon: '🫁',
    description: 'Capacidad pulmonar y función respiratoria',
    color: '#3B82F6'
  },
  cardiovascular: {
    title: 'Sistema Cardiovascular', 
    icon: '❤️',
    description: 'Presión arterial y función cardíaca',
    color: '#EF4444'
  },
  liver: {
    title: 'Salud Hepática',
    icon: '🔶',
    description: 'Función hepática y valores ALT/GGT',
    color: '#F59E0B'
  },
  skinEyes: {
    title: 'Piel y Ojos',
    icon: '👁️',
    description: 'Hidratación y salud dermatológica',
    color: '#10B981'
  },
  mental: {
    title: 'Bienestar Mental',
    icon: '🧠',
    description: 'Estabilidad emocional y calidad del sueño',
    color: '#8B5CF6'
  }
} as const;

export type HealthCategoryKey = keyof typeof healthCategories;
