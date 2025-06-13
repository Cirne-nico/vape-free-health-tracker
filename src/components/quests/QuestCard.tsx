import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Crown } from 'lucide-react';
import { EpicQuest, getCategoryColor, getCategoryName } from '@/data/epicQuests';
import QuestActions from './QuestActions';
import QuestProgress from './QuestProgress';
import QuestReward from './QuestReward';

interface QuestCardProps {
  quest: EpicQuest;
  onAddCheck: (questId: string) => void;
  onRemoveCheck: (questId: string) => void;
  onAddExtraCheck: (questId: string) => void;
  onDeleteQuest: (questId: string) => void;
}

const QuestCard = ({ quest, onAddCheck, onRemoveCheck, onAddExtraCheck, onDeleteQuest }: QuestCardProps) => {
  return (
    <Card className={`${quest.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'} ${quest.id === 'ultimate_achievement' ? 'border-2 border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-2xl">{quest.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-bold ${quest.isCompleted ? 'text-green-700' : 'text-gray-800'} ${quest.id === 'ultimate_achievement' ? 'text-purple-700' : ''}`}>
                  {quest.title}
                </h3>
                {quest.isCompleted && <Trophy className="w-4 h-4 text-yellow-500" />}
                {quest.isCompleted && quest.medalIcon && (
                  <Medal className="w-4 h-4 text-orange-500" title="Medalla épica obtenida" />
                )}
                {quest.id === 'ultimate_achievement' && (
                  <Crown className="w-4 h-4 text-purple-500" title="Medalla de Maestría Total" />
                )}
              </div>
              <p className="text-sm text-gray-600">{quest.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getCategoryColor(quest.category)}>
                  {getCategoryName(quest.category)}
                </Badge>
                {quest.isCustom && (
                  <Badge variant="outline" className="text-xs">
                    Personalizada
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <QuestActions 
            quest={quest}
            onAddExtraCheck={onAddExtraCheck}
            onDeleteQuest={onDeleteQuest}
          />
        </div>
        
        <QuestProgress 
          quest={quest}
          onAddCheck={onAddCheck}
          onRemoveCheck={onRemoveCheck}
        />
        
        <QuestReward quest={quest} />
      </CardContent>
    </Card>
  );
};

export default QuestCard;