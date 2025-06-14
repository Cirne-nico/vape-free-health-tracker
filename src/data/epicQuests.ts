export interface EpicQuest {
  id: string;
  title: string;
  description: string;
  requiredChecks: number;
  currentChecks: number;
  icon: string;
  category: 'social' | 'emotional' | 'substance' | 'psychological' | 'situational';
  isCustom?: boolean;
  isCompleted: boolean;
  reward?: string;
  medalIcon?: string; // Nueva propiedad para la medalla épica
}

export const defaultEpicQuests: Omit<EpicQuest, 'currentChecks' | 'isCompleted'>[] = [
  {
    id: 'party',
    title: 'Salir de fiesta',
    description: 'Disfrutar de una fiesta o celebración sin necesidad de vapear',
    requiredChecks: 3,
    icon: '🎉',
    category: 'social',
    reward: 'La diversión no depende al menos de esta sustancia',
    medalIcon: '/lovable-uploads/situación_social.png'
  },
  {
    id: 'fight_friend',
    title: 'Pelear-te con une amigue/pareja/vínculo',
    description: 'Gestionar un conflicto emocional intenso sin recurrir al vapeo',
    requiredChecks: 2,
    icon: '💔',
    category: 'emotional',
    reward: 'Capacidad de procesar emociones difíciles sin recurrir a la Nicotina',
    medalIcon: '/lovable-uploads/Discusión_pelea.png'
  },
  {
    id: 'bad_news',
    title: 'Recibir una mala noticia',
    description: 'Afrontar noticias impactantes o dolorosas sin vapear como escape',
    requiredChecks: 3,
    icon: '📰',
    category: 'emotional',
    reward: 'Fortaleza emocional para enfrentar la adversidad',
    medalIcon: '/lovable-uploads/mala_noticia.png'
  },
  {
    id: 'work_stress',
    title: 'Estrés laboral',
    description: 'Manejar presión, deadlines o conflictos en el trabajo sin vapear',
    requiredChecks: 3,
    icon: '💼',
    category: 'situational',
    reward: 'Herramientas de gestión del estrés profesional',
    medalIcon: '/lovable-uploads/Estres_laboral.png'
  },
  {
    id: 'work_break',
    title: 'Descanso en el trabajo',
    description: 'Disfrutar de los descansos laborales sin necesidad de vapear',
    requiredChecks: 3,
    icon: '☕',
    category: 'situational',
    reward: 'Descansos genuinos y reparadores',
    medalIcon: '/lovable-uploads/Descanso_trabajo copy.png'
  },
  {
    id: 'control_illusion',
    title: 'Superar el "Yo controlo, unas caladas no hacen daño a nadie"',
    description: 'Resistir el pensamiento más peligroso de la recuperación',
    requiredChecks: 4,
    icon: '🧠',
    category: 'psychological',
    reward: 'Claridad mental sobre los mecanismos de autoengaño',
    medalIcon: '/lovable-uploads/Yo_controlo.png'
  },
  {
    id: 'with_coffee',
    title: 'Con el café',
    description: 'Disfrutar del café sin asociarlo automáticamente con vapear',
    requiredChecks: 3,
    icon: '☕',
    category: 'substance',
    reward: 'Desvinculación de rituales adictivos',
    medalIcon: '/lovable-uploads/gesta_café.png'
  },
  {
    id: 'with_beer',
    title: 'Con la birra (u otra bebida alcohólica)',
    description: 'Beber alcohol sin que active el deseo de vapear',
    requiredChecks: 3,
    icon: '🍺',
    category: 'substance',
    reward: 'Control sobre asociaciones cruzadas de sustancias',
    medalIcon: '/lovable-uploads/gesta_birra.png'
  },
  {
    id: 'sixth_beer',
    title: 'Con la 6ª birra',
    description: 'Mantener el control incluso en estados de desinhibición alcohólica',
    requiredChecks: 3,
    icon: '🍻',
    category: 'substance',
    reward: 'Autocontrol en estados alterados de conciencia',
    medalIcon: '/lovable-uploads/6a_birra.png'
  },
  {
    id: 'other_substances',
    title: 'Con otras sustancias',
    description: 'Usar otras sustancias sin que desencadenen el deseo de vapear',
    requiredChecks: 3,
    icon: '💊',
    category: 'substance',
    reward: 'Independencia entre diferentes tipos de consumo',
    medalIcon: '/lovable-uploads/Otras_sustancias.png'
  },
  {
    id: 'strong_boredom',
    title: 'Aburrimiento fuerte',
    description: 'Tolerar estados de aburrimiento intenso sin buscar estimulación química',
    requiredChecks: 2,
    icon: '😴',
    category: 'emotional',
    reward: 'Capacidad de estar presente sin necesidad de estímulos externos',
    medalIcon: '/lovable-uploads/aburrimiento.png'
  },
  {
    id: 'prolonged_sadness',
    title: 'Período de tristeza prolongado',
    description: 'Atravesar episodios de tristeza profunda sin vapear',
    requiredChecks: 1,
    icon: '😢',
    category: 'emotional',
    reward: 'Aceptación y procesamiento natural de emociones difíciles',
    medalIcon: '/lovable-uploads/tristeza.png'
  },
  {
    id: 'social_situation',
    title: 'Situación social con amigues',
    description: 'Socializar cómodamente sin vapear como facilitador social',
    requiredChecks: 3,
    icon: '👥',
    category: 'social',
    reward: 'Confianza social auténtica sin dependencias químicas',
    medalIcon: '/lovable-uploads/situación_social.png'
  },
  {
    id: 'euphoria_moment',
    title: 'Momento de euforia',
    description: 'Experimentar alegría intensa sin querer "potenciarla" vapeando',
    requiredChecks: 3,
    icon: '🎊',
    category: 'emotional',
    reward: 'Disfrute pleno de emociones positivas naturales',
    medalIcon: '/lovable-uploads/euforia.png'
  },
  {
    id: 'anxiety_periods',
    title: 'Períodos de ansiedad',
    description: 'Sobrellevar episodio prolongado de ansiedad sin vapear como ansiolítico',
    requiredChecks: 1,
    icon: '😰',
    category: 'emotional',
    reward: 'Herramientas naturales de regulación de la ansiedad',
    medalIcon: '/lovable-uploads/gesta_ansiedad.png'
  },
  {
    id: 'pelimanta',
    title: 'Pelimanta',
    description: 'Disfrutar de momentos de relajación en casa sin vapear',
    requiredChecks: 3,
    icon: '🛋️',
    category: 'psychological',
    reward: 'Relajación auténtica sin dependencias químicas',
    medalIcon: '/lovable-uploads/Pelimanta copy.png'
  },
  {
    id: 'writing_effort',
    title: 'Acabas de escribir algo con gran esfuerzo y te dispones a releerlo',
    description: 'Completar tareas creativas o intelectuales sin vapear como recompensa',
    requiredChecks: 3,
    icon: '✍️',
    category: 'psychological',
    reward: 'Satisfacción genuina por el trabajo intelectual',
    medalIcon: '/lovable-uploads/Acabas_de_escribir copy.png'
  },
  {
    id: 'ultimate_achievement',
    title: 'CRACK! - Maestría Total',
    description: 'Has completado TODAS las gestas épicas disponibles. Eres une verdadere maestre de la recuperación.',
    requiredChecks: 1,
    icon: '💥',
    category: 'psychological',
    reward: 'Reconocimiento como maestre absolute de la recuperación. Has demostrado que puedes superar cualquier situación sin vapear.',
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
    case 'emotional': return 'Emocional';
    case 'substance': return 'Sustancias';
    case 'psychological': return 'Psicológico';
    case 'situational': return 'Situacional';
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