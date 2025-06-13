import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Heart } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';
import { useQuestManager } from '@/hooks/useQuestManager';
import DebugPanel from './quests/DebugPanel';
import QuestStats from './quests/QuestStats';
import QuestForm from './quests/QuestForm';
import QuestCard from './quests/QuestCard';

const EpicQuestsManager = () => {
  const { quests, debugInfo, saveQuests, updateQuestsWithMedals, debugMedalSystem } = useQuestManager();

  // Añadir check a una gesta
  const addCheck = (questId: string) => {
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

  // Función para añadir un check extra (máximo 1)
  const addExtraCheck = (questId: string) => {
    const updatedQuests = quests.map(quest => {
      if (quest.id === questId) {
        const maxChecks = quest.requiredChecks + 1; // Solo permitir 1 check extra
        if (quest.requiredChecks < maxChecks) {
          return {
            ...quest,
            requiredChecks: quest.requiredChecks + 1,
            isCompleted: quest.currentChecks >= (quest.requiredChecks + 1)
          };
        }
      }
      return quest;
    });
    
    saveQuests(updatedQuests);
    toast.success('Check extra añadido');
  };

  // Eliminar gesta
  const deleteQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && !quest.isCustom) {
      toast.error('No puedes eliminar hazañas predefinidas');
      return;
    }
    
    const updatedQuests = quests.filter(q => q.id !== questId);
    saveQuests(updatedQuests);
    toast.success('Hazaña eliminada');
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

  return (
    <div className="space-y-6">
      <DebugPanel 
        debugInfo={debugInfo}
        onUpdateMedals={updateQuestsWithMedals}
        onDebugSystem={debugMedalSystem}
      />

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

      {/* Botón para añadir gesta personalizada */}
      <div className="flex justify-end">
        <QuestForm onAddQuest={addCustomQuest} />
      </div>

      {/* Lista de gestas */}
      <div className="grid gap-4">
        {quests.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            onAddCheck={addCheck}
            onRemoveCheck={removeCheck}
            onAddExtraCheck={addExtraCheck}
            onDeleteQuest={deleteQuest}
          />
        ))}
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