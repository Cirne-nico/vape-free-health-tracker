import { useTranslation } from 'react-i18next';

export interface HealthCategory {
  title: string;
  icon: string;
  description: string;
  color: string;
}

export const useHealthCategories = () => {
  const { t } = useTranslation();
  
  return {
    respiratory: {
      title: t('healthTracker.categories.respiratory.title'),
      icon: '🫁',
      description: t('healthTracker.categories.respiratory.description'),
      color: '#3B82F6'
    },
    cardiovascular: {
      title: t('healthTracker.categories.cardiovascular.title'), 
      icon: '❤️',
      description: t('healthTracker.categories.cardiovascular.description'),
      color: '#EF4444'
    },
    liver: {
      title: t('healthTracker.categories.liver.title'),
      icon: '🔶',
      description: t('healthTracker.categories.liver.description'),
      color: '#F59E0B'
    },
    skinEyes: {
      title: t('healthTracker.categories.skinEyes.title'),
      icon: '👁️',
      description: t('healthTracker.categories.skinEyes.description'),
      color: '#10B981'
    },
    mental: {
      title: t('healthTracker.categories.mental.title'),
      icon: '🧠',
      description: t('healthTracker.categories.mental.description'),
      color: '#8B5CF6'
    }
  } as const;
};

export const healthCategories = {
  respiratory: {
    title: 'Pulmones',
    icon: '🫁',
    description: 'Capacidad pulmonar y función respiratoria',
    color: '#3B82F6'
  },
  cardiovascular: {
    title: 'Corazón', 
    icon: '❤️',
    description: 'Presión arterial y función cardíaca',
    color: '#EF4444'
  },
  liver: {
    title: 'Hígado',
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