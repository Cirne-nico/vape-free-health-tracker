import { useState, useEffect } from 'react';
import { EpicQuest, defaultEpicQuests, createEpicQuest } from '@/data/epicQuests';
import { toast } from 'sonner';

export const useQuestManager = () => {
  const [quests, setQuests] = useState<EpicQuest[]>([]);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Cargar gestas del localStorage
  useEffect(() => {
    const savedQuests = localStorage.getItem('epic-quests');
    if (savedQuests) {
      const loadedQuests = JSON.parse(savedQuests);
      setQuests(loadedQuests);
      updateDebugInfo(loadedQuests);
    } else {
      // Inicializar con gestas por defecto
      const initialQuests = defaultEpicQuests.map(createEpicQuest);
      setQuests(initialQuests);
      localStorage.setItem('epic-quests', JSON.stringify(initialQuests));
      updateDebugInfo(initialQuests);
    }
  }, []);

  // Función para actualizar información de debug
  const updateDebugInfo = (questList: EpicQuest[]) => {
    const completedWithMedals = questList.filter(q => q.isCompleted && q.medalIcon);
    const info = `
📊 ESTADO ACTUAL:
• Total gestas: ${questList.length}
• Gestas completadas: ${questList.filter(q => q.isCompleted).length}
• Gestas con medalla: ${questList.filter(q => q.medalIcon).length}
• Gestas completadas CON medalla: ${completedWithMedals.length}

🏆 MEDALLAS ÉPICAS DISPONIBLES:
${completedWithMedals.map(q => `• ${q.title} (${q.medalIcon ? '✅ Medalla' : '❌ Sin medalla'})`).join('\n')}

${completedWithMedals.length === 0 ? '❌ NO HAY MEDALLAS ÉPICAS PARA MOSTRAR' : '✅ HAY MEDALLAS ÉPICAS DISPONIBLES'}
    `;
    setDebugInfo(info);
  };

  // Función para verificar si se debe desbloquear la medalla final MEJORADA
  const checkUltimateAchievement = (updatedQuests: EpicQuest[]) => {
    console.log('\n🏆 === CHECKING ULTIMATE ACHIEVEMENT ===');
    
    // Contar gestas completadas (excluyendo la medalla final)
    const completedQuests = updatedQuests.filter(q => 
      q.isCompleted && q.id !== 'ultimate_achievement'
    );
    
    console.log('Completed quests (excluding ultimate):', completedQuests.length);
    console.log('Completed quest IDs:', completedQuests.map(q => q.id));
    
    // Contar gestas con medalla (excluyendo la medalla final)
    const questsWithMedals = updatedQuests.filter(q => 
      q.medalIcon && q.id !== 'ultimate_achievement'
    );
    
    console.log('Quests with medals (excluding ultimate):', questsWithMedals.length);
    console.log('Quest with medals IDs:', questsWithMedals.map(q => q.id));
    
    // Verificar si todas las gestas con medalla están completadas
    const allMedalQuestsCompleted = questsWithMedals.every(q => q.isCompleted);
    console.log('All medal quests completed:', allMedalQuestsCompleted);
    
    // Obtener la gesta ultimate
    const ultimateQuest = updatedQuests.find(q => q.id === 'ultimate_achievement');
    console.log('Ultimate quest found:', !!ultimateQuest);
    console.log('Ultimate quest completed:', ultimateQuest?.isCompleted);
    
    // Condiciones para desbloquear la medalla final
    const shouldUnlock = ultimateQuest && 
                        !ultimateQuest.isCompleted && 
                        questsWithMedals.length > 0 && 
                        allMedalQuestsCompleted;
    
    console.log('Should unlock ultimate achievement:', shouldUnlock);
    
    if (shouldUnlock) {
      console.log('🎉 UNLOCKING ULTIMATE ACHIEVEMENT!');
      
      // Desbloquear automáticamente la medalla final
      const finalUpdatedQuests = updatedQuests.map(quest => {
        if (quest.id === 'ultimate_achievement') {
          return {
            ...quest,
            currentChecks: 1,
            isCompleted: true
          };
        }
        return quest;
      });
      
      toast.success('🎉 ¡CRACK! ¡Has desbloqueado la medalla de Maestría Total!', {
        description: 'Has completado todas las gestas épicas disponibles. Eres une verdadere maestre.',
        duration: 8000
      });
      
      console.log('🏆 === ULTIMATE ACHIEVEMENT UNLOCKED ===\n');
      return finalUpdatedQuests;
    }
    
    console.log('🏆 === ULTIMATE ACHIEVEMENT NOT UNLOCKED ===\n');
    return updatedQuests;
  };

  // Guardar gestas en localStorage
  const saveQuests = (updatedQuests: EpicQuest[]) => {
    // Verificar medalla final antes de guardar
    const finalQuests = checkUltimateAchievement(updatedQuests);
    
    setQuests(finalQuests);
    localStorage.setItem('epic-quests', JSON.stringify(finalQuests));
    updateDebugInfo(finalQuests);
  };

  // Función para actualizar gestas existentes con medallas
  const updateQuestsWithMedals = () => {
    const updatedQuests = quests.map(quest => {
      // Asignar medallas a las gestas específicas
      if (quest.id === 'with_coffee' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/gesta_café.png' };
      }
      if (quest.id === 'with_beer' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/gesta_birra.png' };
      }
      if (quest.id === 'sixth_beer' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/sexta_birra.png' };
      }
      if (quest.id === 'other_substances' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/Otras_sustancias.png' };
      }
      if (quest.id === 'work_stress' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/Estres_laboral.png' };
      }
      if (quest.id === 'work_break' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/descanso_trabajo.png' };
      }
      if (quest.id === 'anxiety_periods' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/gesta_ansiedad.png' };
      }
      if (quest.id === 'party' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/situación_social.png' };
      }
      if (quest.id === 'social_situation' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/situación_social.png' };
      }
      if (quest.id === 'fight_friend' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/Discusión_pelea.png' };
      }
      if (quest.id === 'control_illusion' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/Yo_controlo.png' };
      }
      if (quest.id === 'strong_boredom' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/aburrimiento.png' };
      }
      if (quest.id === 'prolonged_sadness' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/tristeza.png' };
      }
      if (quest.id === 'euphoria_moment' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/euforia.png' };
      }
      if (quest.id === 'pelimanta' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/pelimanta.png' };
      }
      if (quest.id === 'writing_effort' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/escritura.png' };
      }
      if (quest.id === 'bad_news' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/mala_noticia.png' };
      }
      if (quest.id === 'ultimate_achievement' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/Crack.png' };
      }
      return quest;
    });
    
    saveQuests(updatedQuests);
    toast.success('Medallas épicas actualizadas');
  };

  // NUEVA FUNCIÓN: Debug completo del sistema de medallas
  const debugMedalSystem = () => {
    console.log('\n🐛 === DEBUGGING MEDAL SYSTEM ===');
    
    const savedQuests = localStorage.getItem('epic-quests');
    console.log('Raw localStorage:', savedQuests);
    
    if (savedQuests) {
      const parsedQuests = JSON.parse(savedQuests);
      console.log('Parsed quests:', parsedQuests);
      
      const completedWithMedals = parsedQuests.filter((q: any) => q.isCompleted && q.medalIcon);
      console.log('Completed with medals:', completedWithMedals);
      
      // Simular la función getEpicQuestMedals
      const epicMedals = completedWithMedals.map((quest: any) => ({
        id: `epic_${quest.id}`,
        type: 'epic',
        title: quest.title,
        icon: quest.medalIcon,
        description: quest.description || quest.title,
        reward: quest.reward || 'Hazaña épica completada',
        questId: quest.id,
        category: quest.category || 'general'
      }));
      
      console.log('Generated epic medals:', epicMedals);
      
      // Mostrar en toast
      toast.success(`Debug: ${epicMedals.length} medallas épicas encontradas`, {
        description: epicMedals.map(m => m.title).join(', '),
        duration: 5000
      });
    }
    
    console.log('🐛 === END DEBUGGING ===\n');
  };

  return {
    quests,
    debugInfo,
    saveQuests,
    updateQuestsWithMedals,
    debugMedalSystem
  };
};