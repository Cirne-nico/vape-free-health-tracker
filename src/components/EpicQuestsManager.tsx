import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Heart } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';
import { useQuestManager } from '@/hooks/useQuestManager';
import QuestStats from './quests/QuestStats';
import QuestForm from './quests/QuestForm';
import CollapsibleQuestGroup from './quests/CollapsibleQuestGroup';

const EpicQuestsManager = () => {
  const { quests, saveQuests } = useQuestManager();

  const addCheck = (questId: string) => {
    if (questId === 'ultimate_achievement') {
      toast.error('Esta medalla se desbloquea automáticamente al completar todas las demás gestas');
      return;
    }
    
    const updatedQuests = quests.map(quest => {
      if (quest.id === questId && quest.currentChecks < quest.requiredChecks) {
        const newChecks = quest.currentChecks + 1;
        const isCompleted = newChecks >= quest.requiredChecks;
        
        if (isCompleted && !quest.isCompleted) {
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

  const removeCheck = (questId: string) => {
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

  const deleteQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    
    if (quest && quest.id === 'ultimate_achievement') {
      toast.error('No puedes eliminar la medalla de Maestría Total');
      return;
    }
    
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

  // Agrupar gestas por categoría - INCLUYENDO ULTIMATE
  const groupedQuests = {
    social: quests.filter(q => q.category === 'social'),
    emotional: quests.filter(q => q.category === 'emotional'),
    substance: quests.filter(q => q.category === 'substance'),
    psychological: quests.filter(q => q.category === 'psychological'),
    ultimate: quests.filter(q => q.category === 'ultimate')
  };

  const categoryInfo = {
    social: { title: 'Situaciones Sociales', icon: '👥', description: 'Interacciones con otras personas' },
    emotional: { title: 'Gestión Emocional', icon: '💭', description: 'Manejo de estados emocionales intensos' },
    substance: { title: 'Otras Sustancias', icon: '🍺', description: 'Situaciones con alcohol u otras sustancias' },
    psychological: { title: 'Desafíos Psicológicos', icon: '🧠', description: 'Patrones de pensamiento y contextos específicos' },
    ultimate: { title: 'Maestría Total', icon: '💥', description: 'Medalla final que se desbloquea automáticamente' }
  };

  return (
    <div className="space-y-6">
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

      <div className="flex justify-center">
        <QuestForm onAddQuest={addCustomQuest} />
      </div>

      <div className="space-y-4">
        <CollapsibleQuestGroup 
          category="emotional" 
          quests={groupedQuests.emotional}
          categoryInfo={categoryInfo.emotional}
          onAddCheck={addCheck}
          onRemoveCheck={removeCheck}
          onDeleteQuest={deleteQuest}
        />
        <CollapsibleQuestGroup 
          category="social" 
          quests={groupedQuests.social}
          categoryInfo={categoryInfo.social}
          onAddCheck={addCheck}
          onRemoveCheck={removeCheck}
          onDeleteQuest={deleteQuest}
        />
        <CollapsibleQuestGroup 
          category="substance" 
          quests={groupedQuests.substance}
          categoryInfo={categoryInfo.substance}
          onAddCheck={addCheck}
          onRemoveCheck={removeCheck}
          onDeleteQuest={deleteQuest}
        />
        <CollapsibleQuestGroup 
          category="psychological" 
          quests={groupedQuests.psychological}
          categoryInfo={categoryInfo.psychological}
          onAddCheck={addCheck}
          onRemoveCheck={removeCheck}
          onDeleteQuest={deleteQuest}
        />
        <CollapsibleQuestGroup 
          category="ultimate" 
          quests={groupedQuests.ultimate}
          categoryInfo={categoryInfo.ultimate}
          onAddCheck={addCheck}
          onRemoveCheck={removeCheck}
          onDeleteQuest={deleteQuest}
        />
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