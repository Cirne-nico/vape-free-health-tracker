import { EpicQuestMedal } from './medalTypes';

export const getSuccessRate = (days: number): number => {
  // Datos aproximados basados en estadísticas generales sobre dejar de fumar/vapear
  const initialRate = 30; // Tasa inicial de éxito (primeros días)
  const declineRate = 0.5; // Tasa de disminución del éxito con el tiempo

  let successRate = initialRate - (days * declineRate);
  
  // Asegurarse de que la tasa de éxito no sea negativa
  successRate = Math.max(1, successRate);

  // Ajuste para los 90 días (aumenta la tasa de éxito)
  if (days >= 90) {
    successRate += 5;
  }

  // Ajuste para el año (aumenta aún más la tasa de éxito)
  if (days >= 365) {
    successRate += 10;
  }

  return Math.min(successRate, 95); // No puede ser mayor al 95%
};

export const getSpecialMedals = (currentDays: number) => {
  const specialMedals = [];
  
  // Medalla de Atenea para el día 90 - SOLO si han pasado 90 días o más
  if (currentDays >= 90) {
    const athenaMedal = {
      id: 'athena_90',
      type: 'athena' as const,
      title: 'Sabiduría de Atenea',
      icon: '/lovable-uploads/40729490-8efc-4406-96d1-6fa50fd1c815.png',
      description: 'Has alcanzado 90 días de sabiduría y determinación',
      reward: 'Ya puedes comprarte un viaje a Grecia',
      days: 90,
      specialMessage: 'La diosa de la sabiduría te otorga este reconocimiento por tu perseverancia excepcional.'
    };
    specialMedals.push(athenaMedal);
  }

  // Medalla de Victoria (Nike) para el año (365 días)
  if (currentDays >= 365) {
    const victoryMedal = {
      id: 'one_year_victory',
      type: 'victory' as const,
      title: 'Victoria de Nike',
      icon: '/lovable-uploads/Nike_365 copy.png',
      description: '¡Un año completo sin vapear!',
      reward: 'Salud de hierro y bienestar total',
      hasEconomicBenefits: true,
      hasHealthBenefits: true,
      specialMessage: 'Nike, diosa de la victoria, reconoce tu triunfo sobre las estadísticas de recaída.'
    };
    specialMedals.push(victoryMedal);
  }

  // Medalla de Afrodita para los dos años (730 días) - SOLO si han pasado 730 días o más
  if (currentDays >= 730) {
    const afroditaMedal = {
      id: 'two_years_afrodita',
      type: 'chronos' as const,
      title: 'Afrodita - Dos Años',
      icon: '/lovable-uploads/d2d56d43-0631-466d-9f75-6605bc86a799.png',
      description: '¡Dos años completos de libertad!',
      reward: 'Ahora ya puedes ir a Amorgós, alquilar una casa, pegarte un homenaje en la psarotaberna de Aigiali e invitar a rakí a toda la taverna',
      days: 730,
      specialMessage: 'Afrodita celebra tu renacimiento hacia una vida plena y libre.'
    };
    specialMedals.push(afroditaMedal);
  }
  
  return specialMedals;
};

// Función para obtener medallas épicas de gestas
export const getEpicQuestMedals = (): EpicQuestMedal[] => {
  // Obtener gestas del localStorage
  const savedQuests = localStorage.getItem('epic-quests');
  if (!savedQuests) {
    return [];
  }
  
  let quests;
  try {
    quests = JSON.parse(savedQuests);
  } catch (error) {
    console.error('Error parsing quests from localStorage:', error);
    return [];
  }
  
  if (!Array.isArray(quests)) {
    return [];
  }
  
  // Filtrar solo las gestas completadas que tienen medalla
  const completedQuestsWithMedals = quests.filter((quest: any) => {
    return quest.isCompleted === true && quest.medalIcon && quest.medalIcon.trim() !== '';
  });
  
  // Convertir a formato de medalla épica
  const epicMedals = completedQuestsWithMedals.map((quest: any) => {
    const medal: EpicQuestMedal = {
      id: `epic_${quest.id}`,
      type: 'epic' as const,
      title: quest.title,
      icon: quest.medalIcon, // Usar directamente el icono de la medalla
      description: quest.description || quest.title,
      reward: quest.reward || 'Hazaña épica completada',
      questId: quest.id,
      category: quest.category || 'general'
    };
    
    return medal;
  });
  
  return epicMedals;
};

// Función para obtener medallas de hábitos
export const getHabitMedals = () => {
  const savedMedals = localStorage.getItem('habit-medals');
  if (!savedMedals) return [];
  
  const habitMedals = JSON.parse(savedMedals);
  
  return habitMedals.map((medal: any) => ({
    id: medal.id,
    type: 'habit' as const,
    title: getHabitMedalTitle(medal.habitType, medal.habitName),
    icon: getHabitMedalIcon(medal.habitType),
    description: getHabitMedalDescription(medal.habitType),
    reward: `Hábito "${medal.habitName}" consolidado permanentemente`,
    habitType: medal.habitType,
    dateObtained: medal.dateObtained
  }));
};

const getHabitMedalIcon = (type: string) => {
  switch (type) {
    case 'exercise':
      return '/lovable-uploads/Ejercicio.png';
    case 'sleep':
      return '/lovable-uploads/Sueño.png';
    case 'social':
      return '/lovable-uploads/social.png';
    case 'nature':
      return '/lovable-uploads/maestría_naturaleza.png'; // Icono para paseos en naturaleza
    case 'hydration':
      return '/lovable-uploads/Hidratacion.png'; // Icono para hidratación programada
    default:
      return '/lovable-uploads/Ejercicio.png';
  }
};

const getHabitMedalTitle = (type: string, habitName: string) => {
  switch (type) {
    case 'exercise':
      return 'Maestría del Ejercicio';
    case 'sleep':
      return 'Maestría del Sueño';
    case 'social':
      return 'Maestría Social';
    case 'nature':
      return 'Maestría de la Naturaleza'; // Título para paseos en naturaleza
    case 'hydration':
      return 'Maestría de la Hidratación'; // Título para hidratación programada
    default:
      return `Maestría de ${habitName}`;
  }
};

const getHabitMedalDescription = (type: string) => {
  switch (type) {
    case 'exercise':
      return 'Has consolidado el hábito del ejercicio diario como herramienta anti-antojo';
    case 'sleep':
      return 'Has consolidado un horario estricto de sueño para mejor control de impulsos';
    case 'social':
      return 'Has consolidado el compromiso social semanal como red de apoyo';
    case 'nature':
      return 'Has consolidado los paseos en naturaleza como práctica de bienestar mental';
    case 'hydration':
      return 'Has consolidado la hidratación programada como estrategia contra antojos';
    default:
      return 'Has consolidado este hábito científico';
  }
};

// Función para actualizar medallas épicas con rutas correctas
export const updateEpicMedalIcons = () => {
  const savedQuests = localStorage.getItem('epic-quests');
  if (!savedQuests) return;
  
  const quests = JSON.parse(savedQuests);
  
  // Actualizar gestas con medallas faltantes
  const updatedQuests = quests.map((quest: any) => {
    let updated = { ...quest };
    
    // Asignar medallas faltantes con rutas corregidas
    if (!quest.medalIcon) {
      switch (quest.id) {
        case 'with_coffee':
          updated.medalIcon = '/lovable-uploads/gesta_café.png';
          break;
        case 'with_beer':
          updated.medalIcon = '/lovable-uploads/gesta_birra.png';
          break;
        case 'sixth_beer':
          updated.medalIcon = '/lovable-uploads/6a_birra.png';
          break;
        case 'other_substances':
          updated.medalIcon = '/lovable-uploads/Otras_sustancias.png';
          break;
        case 'work_stress':
          updated.medalIcon = '/lovable-uploads/Estres_laboral.png';
          break;
        case 'work_break':
          updated.medalIcon = '/lovable-uploads/Descanso_trabajo copy.png';
          break;
        case 'anxiety_periods':
          updated.medalIcon = '/lovable-uploads/gesta_ansiedad.png';
          break;
        case 'party':
          updated.medalIcon = '/lovable-uploads/fiesta.png';
          break;
        case 'social_situation':
          updated.medalIcon = '/lovable-uploads/situación_social.png';
          break;
        case 'fight_friend':
          updated.medalIcon = '/lovable-uploads/Discusión_pelea.png';
          break;
        case 'control_illusion':
          updated.medalIcon = '/lovable-uploads/Yo_controlo.png';
          break;
        case 'strong_boredom':
          updated.medalIcon = '/lovable-uploads/aburrimiento.png';
          break;
        case 'prolonged_sadness':
          updated.medalIcon = '/lovable-uploads/tristeza.png';
          break;
        case 'euphoria_moment':
          updated.medalIcon = '/lovable-uploads/euforia.png';
          break;
        case 'pelimanta':
          updated.medalIcon = '/lovable-uploads/Pelimanta copy.png';
          break;
        case 'writing_effort':
          updated.medalIcon = '/lovable-uploads/Acabas_de_escribir copy.png';
          break;
        case 'bad_news':
          updated.medalIcon = '/lovable-uploads/mala_noticia.png';
          break;
        case 'ultimate_achievement':
          updated.medalIcon = '/lovable-uploads/Crack.png';
          break;
      }
    }
    
    return updated;
  });
  
  // Guardar las gestas actualizadas
  localStorage.setItem('epic-quests', JSON.stringify(updatedQuests));
  
  return getEpicQuestMedals();
};