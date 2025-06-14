export interface EpicQuest {
  id: string;
  title: string;
  description: string;
  requiredChecks: number;
  currentChecks: number;
  icon: string;
  category: 'social' | 'emotional' | 'substance' | 'psychological' | 'situational' | 'ultimate';
  isCustom?: boolean;
  isCompleted: boolean;
  reward?: string;
  medalIcon?: string; // Nueva propiedad para la medalla épica
}

export const defaultEpicQuests: Omit<EpicQuest, 'currentChecks' | 'isCompleted'>[] = [
  {
    id: 'party',
    title: 'Going to a party',
    description: 'Enjoy a party or celebration without needing to vape',
    requiredChecks: 3,
    icon: '🎉',
    category: 'social',
    reward: 'Fun no longer depends on this substance',
    medalIcon: '/lovable-uploads/fiesta.png'
  },
  {
    id: 'fight_friend',
    title: 'Argument with a friend/partner',
    description: 'Managing an intense emotional conflict without resorting to vaping',
    requiredChecks: 2,
    icon: '💔',
    category: 'emotional',
    reward: 'Ability to process difficult emotions without resorting to nicotine',
    medalIcon: '/lovable-uploads/Discusión_pelea.png'
  },
  {
    id: 'bad_news',
    title: 'Receiving bad news',
    description: 'Facing impactful or painful news without vaping as an escape',
    requiredChecks: 3,
    icon: '📰',
    category: 'emotional',
    reward: 'Emotional strength to face adversity',
    medalIcon: '/lovable-uploads/mala_noticia.png'
  },
  {
    id: 'work_stress',
    title: 'Work stress',
    description: 'Managing pressure, deadlines, or conflicts at work without vaping',
    requiredChecks: 3,
    icon: '💼',
    category: 'situational',
    reward: 'Professional stress management tools',
    medalIcon: '/lovable-uploads/Estres_laboral.png'
  },
  {
    id: 'work_break',
    title: 'Work break',
    description: 'Enjoying work breaks without needing to vape',
    requiredChecks: 3,
    icon: '☕',
    category: 'situational',
    reward: 'Genuine and restorative breaks',
    medalIcon: '/lovable-uploads/Descanso_trabajo copy.png'
  },
  {
    id: 'control_illusion',
    title: 'Overcoming "I can control it, a few puffs won\'t hurt anyone"',
    description: 'Resisting the most dangerous thought in recovery',
    requiredChecks: 4,
    icon: '🧠',
    category: 'psychological',
    reward: 'Mental clarity about self-deception mechanisms',
    medalIcon: '/lovable-uploads/Yo_controlo.png'
  },
  {
    id: 'with_coffee',
    title: 'With coffee',
    description: 'Enjoying coffee without automatically associating it with vaping',
    requiredChecks: 3,
    icon: '☕',
    category: 'substance',
    reward: 'Decoupling from addictive rituals',
    medalIcon: '/lovable-uploads/gesta_café.png'
  },
  {
    id: 'with_beer',
    title: 'With beer (or other alcoholic drink)',
    description: 'Drinking alcohol without triggering the desire to vape',
    requiredChecks: 3,
    icon: '🍺',
    category: 'substance',
    reward: 'Control over cross-substance associations',
    medalIcon: '/lovable-uploads/gesta_birra.png'
  },
  {
    id: 'sixth_beer',
    title: 'With the 6th beer',
    description: 'Maintaining control even in states of alcoholic disinhibition',
    requiredChecks: 3,
    icon: '🍻',
    category: 'substance',
    reward: 'Self-control in altered states of consciousness',
    medalIcon: '/lovable-uploads/6a_birra.png'
  },
  {
    id: 'other_substances',
    title: 'With other substances',
    description: 'Using other substances without triggering the desire to vape',
    requiredChecks: 3,
    icon: '💊',
    category: 'substance',
    reward: 'Independence between different types of consumption',
    medalIcon: '/lovable-uploads/Otras_sustancias.png'
  },
  {
    id: 'strong_boredom',
    title: 'Strong boredom',
    description: 'Tolerating states of intense boredom without seeking chemical stimulation',
    requiredChecks: 2,
    icon: '😴',
    category: 'emotional',
    reward: 'Ability to be present without needing external stimuli',
    medalIcon: '/lovable-uploads/aburrimiento.png'
  },
  {
    id: 'prolonged_sadness',
    title: 'Period of prolonged sadness',
    description: 'Going through episodes of deep sadness without vaping',
    requiredChecks: 1,
    icon: '😢',
    category: 'emotional',
    reward: 'Acceptance and natural processing of difficult emotions',
    medalIcon: '/lovable-uploads/tristeza.png'
  },
  {
    id: 'social_situation',
    title: 'Social situation with friends',
    description: 'Socializing comfortably without vaping as a social facilitator',
    requiredChecks: 3,
    icon: '👥',
    category: 'social',
    reward: 'Authentic social confidence without chemical dependencies',
    medalIcon: '/lovable-uploads/situación_social.png'
  },
  {
    id: 'euphoria_moment',
    title: 'Moment of euphoria',
    description: 'Experiencing intense joy without wanting to "enhance it" by vaping',
    requiredChecks: 3,
    icon: '🎊',
    category: 'emotional',
    reward: 'Full enjoyment of natural positive emotions',
    medalIcon: '/lovable-uploads/euforia.png'
  },
  {
    id: 'anxiety_periods',
    title: 'Periods of anxiety',
    description: 'Managing episodes of anxiety without vaping as an anxiolytic',
    requiredChecks: 1,
    icon: '😰',
    category: 'emotional',
    reward: 'Natural tools for anxiety regulation',
    medalIcon: '/lovable-uploads/gesta_ansiedad.png'
  },
  {
    id: 'pelimanta',
    title: 'Movie night at home',
    description: 'Enjoying relaxation moments at home without vaping',
    requiredChecks: 3,
    icon: '🛋️',
    category: 'situational',
    reward: 'Authentic relaxation without chemical dependencies',
    medalIcon: '/lovable-uploads/Pelimanta copy.png'
  },
  {
    id: 'writing_effort',
    title: 'You just finished writing something with great effort and are about to reread it',
    description: 'Completing creative or intellectual tasks without vaping as a reward',
    requiredChecks: 3,
    icon: '✍️',
    category: 'psychological',
    reward: 'Genuine satisfaction from intellectual work',
    medalIcon: '/lovable-uploads/Acabas_de_escribir copy.png'
  },
  {
    id: 'ultimate_achievement',
    title: 'CRACK! - Total Mastery',
    description: 'You have completed ALL available epic feats. You are a true master of recovery.',
    requiredChecks: 1,
    icon: '💥',
    category: 'ultimate',
    reward: 'Recognition as an absolute master of recovery. You have demonstrated that you can overcome any situation without vaping.',
    medalIcon: '/lovable-uploads/Crack.png'
  }
];

export const createEpicQuest = (baseQuest: Omit<EpicQuest, 'currentChecks' | 'isCompleted'>): EpicQuest => ({
  ...baseQuest,
  currentChecks: 0,
  isCompleted: false
});

export const getCategoryColor = (category: EpicQuest['category']) => {
  switch (category) {
    case 'social': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'emotional': return 'bg-red-100 text-red-800 border-red-300';
    case 'substance': return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'psychological': return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'situational': return 'bg-green-100 text-green-800 border-green-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const getCategoryName = (category: EpicQuest['category']) => {
  switch (category) {
    case 'social': return 'Social';
    case 'emotional': return 'Emotional';
    case 'substance': return 'Substances';
    case 'psychological': return 'Psychological';
    case 'situational': return 'Situational';
    default: return 'General';
  }
};

// Función para obtener las gestas completadas con medallas
export const getCompletedQuestsWithMedals = (): EpicQuest[] => {
  const savedQuests = localStorage.getItem('epic-quests');
  if (!savedQuests) return [];
  
  const quests: EpicQuest[] = JSON.parse(savedQuests);
  return quests.filter(quest => quest.isCompleted && quest.medalIcon);
};