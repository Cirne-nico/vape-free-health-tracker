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

  // Medalla de Victoria (Nike) para el año (365 días) - SOLO si han pasado 365 días o más
  if (currentDays >= 365) {
    const victoryMedal = {
      id: 'one_year_victory',
      type: 'victory' as const,
      title: 'Victoria de Nike',
      icon: '/lovable-uploads/Nike_365.png',
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

// Función corregida para obtener medallas épicas de gestas
export const getEpicQuestMedals = (): EpicQuestMedal[] => {
  console.log('=== GETTING EPIC QUEST MEDALS ===');
  
  // Obtener gestas del localStorage
  const savedQuests = localStorage.getItem('epic-quests');
  if (!savedQuests) {
    console.log('No saved quests found in localStorage');
    return [];
  }
  
  let quests;
  try {
    quests = JSON.parse(savedQuests);
    console.log('Parsed quests from localStorage:', quests);
  } catch (error) {
    console.error('Error parsing quests from localStorage:', error);
    return [];
  }
  
  if (!Array.isArray(quests)) {
    console.log('Quests is not an array:', quests);
    return [];
  }
  
  // Filtrar solo las gestas completadas que tienen medalla
  const completedQuestsWithMedals = quests.filter((quest: any) => {
    const isCompleted = quest.isCompleted === true;
    const hasMedal = quest.medalIcon && quest.medalIcon.trim() !== '';
    
    console.log(`Quest "${quest.title}": completed=${isCompleted}, medalIcon="${quest.medalIcon}", hasMedal=${hasMedal}`);
    
    return isCompleted && hasMedal;
  });
  
  console.log('Completed quests with medals:', completedQuestsWithMedals);
  
  // Convertir a formato de medalla épica
  const epicMedals = completedQuestsWithMedals.map((quest: any) => {
    const medal: EpicQuestMedal = {
      id: `epic_${quest.id}`,
      type: 'epic' as const,
      title: quest.title,
      icon: quest.medalIcon,
      description: quest.description || quest.title,
      reward: quest.reward || 'Hazaña épica completada',
      questId: quest.id,
      category: quest.category || 'general'
    };
    
    console.log('Created epic medal:', medal);
    return medal;
  });
  
  console.log('Final epic medals array:', epicMedals);
  console.log('=== END GETTING EPIC QUEST MEDALS ===');
  
  return epicMedals;
};