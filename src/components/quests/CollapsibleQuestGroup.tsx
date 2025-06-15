import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';
import QuestCard from './QuestCard';
import { useTranslation } from 'react-i18next';

interface CollapsibleQuestGroupProps {
  category: string;
  quests: EpicQuest[];
  categoryInfo: {
    title: string;
    icon: string;
    description: string;
  };
  onAddCheck: (questId: string) => void;
  onRemoveCheck: (questId: string) => void;
  onDeleteQuest: (questId: string) => void;
}

const CollapsibleQuestGroup = ({ 
  category, 
  quests, 
  categoryInfo, 
  onAddCheck, 
  onRemoveCheck, 
  onDeleteQuest 
}: CollapsibleQuestGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { t } = useTranslation();

  if (quests.length === 0) return null;

  // Verificar si todas las gestas de la categoría están completadas
  const allCompleted = quests.every(quest => quest.isCompleted);
  const completedCount = quests.filter(quest => quest.isCompleted).length;

  return (
    <Card className="mb-6 overflow-hidden">
      <CardContent className="p-0">
        {/* Header desplegable */}
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 justify-between hover:bg-gray-50 rounded-none border-b"
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-xl flex-shrink-0">{categoryInfo.icon}</span>
            <div className="text-left min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-800 truncate">
                  {categoryInfo.title}
                </h3>
                {allCompleted && quests.length > 0 && (
                  <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-700 font-medium">
                      {t('epicQuests.completed')}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="truncate">{completedCount}/{quests.length} {t('epicQuests.stats.completed')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </Button>
        
        {/* Contenido desplegable */}
        {isExpanded && (
          <div className="px-4 pb-4 pt-2 space-y-4">
            {quests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onAddCheck={onAddCheck}
                onRemoveCheck={onRemoveCheck}
                onDeleteQuest={onDeleteQuest}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CollapsibleQuestGroup;