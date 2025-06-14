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
  
  console.log('Generating special medals for days:', currentDays);
  
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
    console.log('Added Athena medal:', athenaMedal);
  }

  // Medalla de Victoria (Nike) para el año (365 días) - RUTA CORREGIDA DEFINITIVAMENTE
  if (currentDays >= 365) {
    const victoryMedal = {
      id: 'one_year_victory',
      type: 'victory' as const,
      title: 'Victoria de Nike',
      icon: '/lovable-uploads/Nike_365 copy.png', // ✅ RUTA CORREGIDA FINAL
      description: '¡Un año completo sin vapear!',
      reward: 'Salud de hierro y bienestar total',
      hasEconomicBenefits: true,
      hasHealthBenefits: true,
      specialMessage: 'Nike, diosa de la victoria, reconoce tu triunfo sobre las estadísticas de recaída.'
    };
    specialMedals.push(victoryMedal);
    console.log('Added Victory medal:', victoryMedal);
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
    console.log('Added Afrodita medal:', afroditaMedal);
  }
  
  console.log('Final special medals array:', specialMedals);
  return specialMedals;
};

// Función MEJORADA para obtener medallas épicas de gestas
export const getEpicQuestMedals = (): EpicQuestMedal[] => {
  console.log('\n🔍 === GETTING EPIC QUEST MEDALS - ENHANCED VERSION ===');
  
  // Obtener gestas del localStorage
  const savedQuests = localStorage.getItem('epic-quests');
  console.log('🔍 Raw localStorage data:', savedQuests);
  
  if (!savedQuests) {
    console.log('❌ No saved quests found in localStorage');
    return [];
  }
  
  let quests;
  try {
    quests = JSON.parse(savedQuests);
    console.log('✅ Parsed quests from localStorage:', quests);
  } catch (error) {
    console.error('❌ Error parsing quests from localStorage:', error);
    return [];
  }
  
  if (!Array.isArray(quests)) {
    console.log('❌ Quests is not an array:', typeof quests, quests);
    return [];
  }
  
  console.log(`📊 Found ${quests.length} total quests`);
  
  // Filtrar solo las gestas completadas que tienen medalla
  const completedQuestsWithMedals = quests.filter((quest: any) => {
    console.log(`\n--- 🔍 Checking quest: "${quest.title}" (ID: ${quest.id}) ---`);
    console.log('Quest object:', quest);
    
    const isCompleted = quest.isCompleted === true;
    const hasMedalIcon = quest.medalIcon && quest.medalIcon.trim() !== '';
    
    console.log(`- isCompleted: ${isCompleted}`);
    console.log(`- medalIcon: "${quest.medalIcon}"`);
    console.log(`- hasMedalIcon: ${hasMedalIcon}`);
    console.log(`- Will include: ${isCompleted && hasMedalIcon}`);
    
    return isCompleted && hasMedalIcon;
  });
  
  console.log(`\n🎯 Filtered to ${completedQuestsWithMedals.length} completed quests with medals:`, completedQuestsWithMedals);
  
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
    
    console.log('🏆 Created epic medal:', medal);
    return medal;
  });
  
  console.log(`\n✅ Final epic medals array (${epicMedals.length} medals):`, epicMedals);
  console.log('🔍 === END GETTING EPIC QUEST MEDALS ===\n');
  
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
    title: getHabitMedalTitle(medal.type, medal.habitName),
    icon: getHabitMedalIcon(medal.type),
    description: getHabitMedalDescription(medal.type),
    reward: `Hábito "${medal.habitName}" consolidado permanentemente`,
    habitType: medal.type,
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
    default:
      return 'Has consolidado este hábito científico';
  }
};

// Función de debug mejorada para forzar la actualización de medallas épicas
export const debugEpicMedals = () => {
  console.log('\n🚨 === DEBUG EPIC MEDALS FUNCTION - ENHANCED ===');
  
  // Obtener datos actuales
  const savedQuests = localStorage.getItem('epic-quests');
  console.log('Current localStorage data:', savedQuests);
  
  if (savedQuests) {
    const quests = JSON.parse(savedQuests);
    console.log('Parsed quests:', quests);
    
    // Actualizar gestas con medallas faltantes - RUTAS CORREGIDAS DEFINITIVAMENTE
    const updatedQuests = quests.map((quest: any) => {
      let updated = { ...quest };
      
      // Asignar medallas faltantes con rutas corregidas FINALES
      if (!quest.medalIcon) {
        switch (quest.id) {
          case 'with_coffee':
            updated.medalIcon = '/lovable-uploads/gesta_café.png';
            break;
          case 'with_beer':
            updated.medalIcon = '/lovable-uploads/gesta_birra.png';
            break;
          case 'sixth_beer':
            updated.medalIcon = '/lovable-uploads/6a_birra.png'; // ✅ CORREGIDA FINAL
            break;
          case 'other_substances':
            updated.medalIcon = '/lovable-uploads/Otras_sustancias.png';
            break;
          case 'work_stress':
            updated.medalIcon = '/lovable-uploads/Estres_laboral.png';
            break;
          case 'work_break':
            updated.medalIcon = '/lovable-uploads/Descanso_trabajo copy.png'; // ✅ CORREGIDA FINAL
            break;
          case 'anxiety_periods':
            updated.medalIcon = '/lovable-uploads/gesta_ansiedad.png';
            break;
          case 'party':
            updated.medalIcon = '/lovable-uploads/situación_social.png';
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
            updated.medalIcon = '/lovable-uploads/Pelimanta copy.png'; // ✅ CORREGIDA FINAL
            break;
          case 'writing_effort':
            updated.medalIcon = '/lovable-uploads/Acabas_de_escribir copy.png'; // ✅ CORREGIDA FINAL
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
    console.log('Updated quests with medals:', updatedQuests);
    
    const completedWithMedals = updatedQuests.filter((q: any) => q.isCompleted && q.medalIcon);
    console.log('Completed quests with medals:', completedWithMedals);
    
    // Forzar recarga de medallas
    const medals = getEpicQuestMedals();
    console.log('Generated medals:', medals);
    
    return medals;
  }
  
  console.log('🚨 === END DEBUG ===\n');
  return [];
};