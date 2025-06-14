import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Heart } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';
import { useQuestManager } from '@/hooks/useQuestManager';
import QuestStats from './quests/QuestStats';
import QuestForm from './quests/QuestForm';
import QuestCard from './quests/QuestCard';

const EpicQuestsManager = () => {
  const { quests, saveQuests } = useQuestManager();

  // Añadir check a una gesta
  const addCheck = (questId: string) => {
    // No permitir interacción manual con la gesta ultimate
    if (questId === 'ultimate_achievement') {
      toast.error('Esta medalla se desbloquea automáticamente al completar todas las demás gestas');
      return;
    }
    
    const updatedQuests = quests.map(quest => {
      if (quest.id === questId && quest.currentChecks < quest.requiredChecks) {
        const newChecks = quest.currentChecks + 1;
        const isCompleted = newChecks >= quest.requiredChecks;
        
        if (isCompleted && !quest.isCompleted) {
          // Mostrar notificación especial para gestas con medalla
          if (quest.medalIcon) {
            toast.success(`¡Medalla épica desbloqueada: ${quest.title}!`, {
              description: `${quest.reward} - Tu medalla aparecerá en la pantalla principal`,
              duration: 5000
            });
          } else {
            toast.success(`¡Hazaña completada: ${quest.title}!`, {
              description: quest.reward || 'Has superado un desafío épico'
            });
          }
        }
        
        return {
          ...quest,
          currentChecks: newChecks,
          isCompleted
        };
      }
      return quest;
    });
    
    saveQuests(updatedQuests);
  };

  // Quitar check de una gesta
  const removeCheck = (questId: string) => {
    // No permitir interacción manual con la gesta ultimate
    if (questId === 'ultimate_achievement') {
      toast.error('Esta medalla se gestiona automáticamente');
      return;
    }
    
    const updatedQuests = quests.map(quest => {
      if (quest.id === questId && quest.currentChecks > 0) {
        return {
          ...quest,
          currentChecks: quest.currentChecks - 1,
          isCompleted: false
        };
      }
      return quest;
    });
    
    saveQuests(updatedQuests);
  };

  // Eliminar gesta - MODIFICADO para permitir eliminar cualquier gesta excepto ultimate_achievement
  const deleteQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    
    // No permitir eliminar la medalla final
    if (quest && quest.id === 'ultimate_achievement') {
      toast.error('No puedes eliminar la medalla de Maestría Total');
      return;
    }
    
    // Confirmar eliminación
    const questTitle = quest?.title || 'esta gesta';
    if (!confirm(`¿Estás segura de que quieres eliminar "${questTitle}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    
    const updatedQuests = quests.filter(q => q.id !== questId);
    saveQuests(updatedQuests);
    
    if (quest?.isCustom) {
      toast.success('Gesta personalizada eliminada');
    } else {
      toast.success(`Gesta "${questTitle}" eliminada - No se aplicaba a tu situación`);
    }
  };

  // Añadir nueva gesta personalizada
  const addCustomQuest = (questData: Omit<EpicQuest, 'id' | 'currentChecks' | 'isCompleted'>) => {
    const newQuest: EpicQuest = {
      ...questData,
      id: `custom_${Date.now()}`,
      currentChecks: 0,
      isCompleted: false
    };

    const updatedQuests = [...quests, newQuest];
    saveQuests(updatedQuests);
    toast.success('Nueva hazaña añadida');
  };

  // Agrupar gestas por categoría
  const groupedQuests = {
    social: quests.filter(q => q.category === 'social'),
    emotional: quests.filter(q => q.category === 'emotional'),
    substance: quests.filter(q => q.category === 'substance'),
    psychological: quests.filter(q => q.category === 'psychological'),
    situational: quests.filter(q => q.category === 'situational')
  };

  const categoryInfo = {
    social: { title: 'Situaciones Sociales', icon: '👥', description: 'Interacciones con otras personas' },
    emotional: { title: 'Gestión Emocional', icon: '💭', description: 'Manejo de estados emocionales intensos' },
    substance: { title: 'Otras Sustancias', icon: '🍺', description: 'Situaciones con alcohol u otras sustancias' },
    psychological: { title: 'Desafíos Psicológicos', icon: '🧠', description: 'Patrones de pensamiento y contextos específicos' },
    situational: { title: 'Contextos Específicos', icon: '📍', description: 'Lugares y momentos particulares' }
  };

  const QuestGroup = ({ category, quests: categoryQuests }: { category: keyof typeof categoryInfo; quests: EpicQuest[] }) => {
    if (categoryQuests.length === 0) return null;
    
    const info = categoryInfo[category];
    
    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <span className="text-xl">{info.icon}</span>
              {info.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{info.description}</p>
          </div>
          
          <div className="space-y-4">
            {categoryQuests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onAddCheck={addCheck}
                onRemoveCheck={removeCheck}
                onDeleteQuest={deleteQuest}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Introducción explicativa */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="space-y-4 p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-blue-700 flex items-center justify-center gap-2 mb-4">
              <Brain className="w-5 h-5" />
              Memoria Corporal y Neuroplasticidad
              <Heart className="w-5 h-5" />
            </h3>
          </div>
          <div className="text-sm text-blue-800 leading-relaxed space-y-3">
            <p>
              <strong>¿Por qué repetir cada situación varias veces?</strong> Cuando superas una situación difícil 
              sin vapear <strong>3 veces</strong> (o las que corresponda), esa experiencia queda grabada en tu 
              <strong> memoria corporal y cerebral</strong> como un nuevo patrón neurológico.
            </p>
            
            <p>
              Tu sistema nervioso <strong>aprende</strong> que puede vivir esa experiencia y <strong>disfrutarla 
              incluso más</strong> sin necesidad de nicotina. La repetición consolida nuevas conexiones neuronales 
              que reemplazan las asociaciones adictivas.
            </p>
            
            <div className="bg-white/70 p-3 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 italic">
                💡 <strong>Neuroplasticidad en acción:</strong> Cada vez que repites una experiencia sin vapear, 
                fortaleces las redes neuronales de autonomía y debilitas las de dependencia. Después de completar 
                una gesta, esa situación ya no será un "disparador\" sino una demostración de tu nueva cartografía psicofísica.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <QuestStats quests={quests} />

      {/* Información sobre personalización */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-amber-800">✨ Personaliza tu Proceso</h4>
            <p className="text-sm text-amber-700">
              Puedes eliminar cualquier gesta que no se aplique a tu situación. Por ejemplo, 
              si no bebes alcohol, elimina las gestas relacionadas con bebidas alcohólicas.
            </p>
            <p className="text-xs text-amber-600">
              Solo la medalla de "Maestría Total" no se puede eliminar, ya que se desbloquea automáticamente.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Botón para añadir gesta personalizada */}
      <div className="flex justify-center">
        <QuestForm onAddQuest={addCustomQuest} />
      </div>

      {/* Gestas agrupadas por categoría */}
      <div className="space-y-4">
        <QuestGroup category="emotional" quests={groupedQuests.emotional} />
        <QuestGroup category="social" quests={groupedQuests.social} />
        <QuestGroup category="substance" quests={groupedQuests.substance} />
        <QuestGroup category="psychological" quests={groupedQuests.psychological} />
        <QuestGroup category="situational" quests={groupedQuests.situational} />
      </div>

      {quests.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">No tienes hazañas configuradas</p>
            <QuestForm onAddQuest={addCustomQuest} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EpicQuestsManager;