import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';
import QuestCard from './QuestCard';

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

  if (quests.length === 0) return null;

  // Verificar si todas las gestas de la categoría están completadas
  const allCompleted = quests.every(quest => quest.isCompleted);
  const completedCount = quests.filter(quest => quest.isCompleted).length;

  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        {/* Header desplegable */}
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 justify-between hover:bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-xl flex-shrink-0">{categoryInfo.icon}</span>
            <div className="text-left min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-gray-800">
                  {categoryInfo.title}
                </h3>
                {allCompleted && quests.length > 0 && (
                  <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-700 font-medium">Completado</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{categoryInfo.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {completedCount}/{quests.length} gestas completadas
              </p>
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
          <div className="px-4 pb-4 space-y-4">
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