import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Heart } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';
import { useQuestManager } from '@/hooks/useQuestManager';
import { useTranslation } from 'react-i18next';
import QuestStats from './quests/QuestStats';
import QuestForm from './quests/QuestForm';
import CollapsibleQuestGroup from './quests/CollapsibleQuestGroup';

const EpicQuestsManager = () => {
  const { t } = useTranslation();
  const { quests, saveQuests } = useQuestManager();

  const addCheck = (questId: string) => {
    if (questId === 'ultimate_achievement') {
      toast.error(t('epicQuests.questCard.automaticMedalError'));
      return;
    }
    
    const updatedQuests = quests.map(quest => {
      if (quest.id === questId && quest.currentChecks < quest.requiredChecks) {
        const newChecks = quest.currentChecks + 1;
        const isCompleted = newChecks >= quest.requiredChecks;
        
        if (isCompleted && !quest.isCompleted) {
          if (quest.medalIcon) {
            toast.success(`🏆 ${t('epicQuests.questCard.medalUnlocked')}: ${quest.title}!`, {
              description: `${quest.reward} - ${t('epicQuests.questCard.medalVisible')}`,
              duration: 5000
            });
          } else {
            toast.success(`${t('epicQuests.questCard.featCompleted')}: ${quest.title}!`, {
              description: quest.reward || t('epicQuests.questCard.epicChallengeOvercome')
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
      toast.error(t('epicQuests.questCard.automaticMedalManagement'));
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
      toast.error(t('epicQuests.questCard.cannotDeleteUltimate'));
      return;
    }
    
    const questTitle = quest?.title || t('epicQuests.questCard.thisFeat');
    if (!confirm(t('epicQuests.questCard.confirmDelete', { title: questTitle }))) {
      return;
    }
    
    const updatedQuests = quests.filter(q => q.id !== questId);
    saveQuests(updatedQuests);
    
    if (quest?.isCustom) {
      toast.success(t('epicQuests.questCard.customDeleted'));
    } else {
      toast.success(t('epicQuests.questCard.featDeleted', { title: questTitle }));
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
    toast.success(t('epicQuests.questCard.newFeatAdded'));
  };

  // Verificar si se deben mostrar todas las gestas con medallas completadas
  const questsWithMedals = quests.filter(q => q.medalIcon && q.id !== 'ultimate_achievement');
  const allMedalQuestsCompleted = questsWithMedals.length > 0 && questsWithMedals.every(q => q.isCompleted);
  
  // Filtrar la gesta ultimate_achievement si no se han completado todas las demás gestas con medallas
  const filteredQuests = quests.filter(q => {
    if (q.id === 'ultimate_achievement') {
      return allMedalQuestsCompleted || q.isCompleted;
    }
    return true;
  });

  // Agrupar gestas por categoría - EXCLUYENDO ultimate si no corresponde
  const groupedQuests = {
    social: filteredQuests.filter(q => q.category === 'social'),
    emotional: filteredQuests.filter(q => q.category === 'emotional'),
    substance: filteredQuests.filter(q => q.category === 'substance'),
    psychological: filteredQuests.filter(q => q.category === 'psychological'),
    situational: filteredQuests.filter(q => q.category === 'situational'),
    ultimate: filteredQuests.filter(q => q.category === 'ultimate')
  };

  const categoryInfo = {
    social: { 
      title: t('epicQuests.categories.social.title'), 
      icon: '👥', 
      description: t('epicQuests.categories.social.description') 
    },
    emotional: { 
      title: t('epicQuests.categories.emotional.title'), 
      icon: '💭', 
      description: t('epicQuests.categories.emotional.description') 
    },
    substance: { 
      title: t('epicQuests.categories.substance.title'), 
      icon: '🍺', 
      description: t('epicQuests.categories.substance.description') 
    },
    psychological: { 
      title: t('epicQuests.categories.psychological.title'), 
      icon: '🧠', 
      description: t('epicQuests.categories.psychological.description') 
    },
    situational: { 
      title: t('epicQuests.categories.situational.title'), 
      icon: '📍', 
      description: t('epicQuests.categories.situational.description') 
    },
    ultimate: { 
      title: t('epicQuests.categories.ultimate.title'), 
      icon: '💥', 
      description: t('epicQuests.categories.ultimate.description') 
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="space-y-4 p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-blue-700 flex items-center justify-center gap-2 mb-4">
              <Brain className="w-5 h-5" />
              {t('epicQuests.title')}
              <Heart className="w-5 h-5" />
            </h3>
          </div>
          <div className="text-sm text-blue-800 leading-relaxed space-y-3">
            <p>
              <strong>{t('epicQuests.explanation.question')}</strong> {t('epicQuests.explanation.answer')}
            </p>
            
            <p>
              {t('epicQuests.explanation.detail')}
            </p>
            
            <div className="bg-white/70 p-3 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 italic">
                💡 <strong>{t('epicQuests.explanation.science')}</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <QuestStats quests={quests} />

      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-amber-800">{t('epicQuests.customization.title')}</h4>
            <p className="text-sm text-amber-700">
              {t('epicQuests.customization.description')}
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
          category="situational" 
          quests={groupedQuests.situational}
          categoryInfo={categoryInfo.situational}
          onAddCheck={addCheck}
          onRemoveCheck={removeCheck}
          onDeleteQuest={deleteQuest}
        />
        
        {/* Solo mostrar la categoría ultimate si hay gestas en ella (después de filtrar) */}
        {groupedQuests.ultimate.length > 0 && (
          <CollapsibleQuestGroup 
            category="ultimate" 
            quests={groupedQuests.ultimate}
            categoryInfo={categoryInfo.ultimate}
            onAddCheck={addCheck}
            onRemoveCheck={removeCheck}
            onDeleteQuest={deleteQuest}
          />
        )}
      </div>

      {quests.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">{t('epicQuests.noFeatsConfigured')}</p>
            <QuestForm onAddQuest={addCustomQuest} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EpicQuestsManager;