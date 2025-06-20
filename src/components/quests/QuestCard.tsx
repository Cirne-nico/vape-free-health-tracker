import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Crown, Trash2 } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';
import QuestProgress from './QuestProgress';
import QuestReward from './QuestReward';
import { useTranslation } from 'react-i18next';

interface QuestCardProps {
  quest: EpicQuest;
  onAddCheck: (questId: string) => void;
  onRemoveCheck: (questId: string) => void;
  onDeleteQuest: (questId: string) => void;
}

const QuestCard = ({ quest, onAddCheck, onRemoveCheck, onDeleteQuest }: QuestCardProps) => {
  const { t } = useTranslation();
  
  // La gesta ultimate_achievement no debe permitir interacción manual
  const isUltimateQuest = quest.id === 'ultimate_achievement';
  
  return (
    <Card className={`${quest.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'} ${isUltimateQuest ? 'border-2 border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2 min-w-0 flex-1">
            <div className="text-2xl flex-shrink-0">{quest.icon}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 flex-wrap mb-1">
                <h3 className={`font-bold ${quest.isCompleted ? 'text-green-700' : 'text-gray-800'} ${isUltimateQuest ? 'text-purple-700' : ''} break-words`}>
                  {quest.title}
                </h3>
                {quest.isCompleted && <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />}
                {quest.isCompleted && quest.medalIcon && (
                  <Medal className="w-4 h-4 text-orange-500 flex-shrink-0" title="Medalla épica obtenida" />
                )}
                {isUltimateQuest && (
                  <Crown className="w-4 h-4 text-purple-500 flex-shrink-0" title="Medalla de Maestría Total" />
                )}
              </div>
              <p className="text-sm text-gray-600 break-words">{quest.description}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {quest.isCustom && (
                  <Badge variant="outline" className="text-xs">
                    {t('epicQuests.questCard.custom')}
                  </Badge>
                )}
                {isUltimateQuest && (
                  <Badge className="bg-purple-500 text-white text-xs">
                    {t('epicQuests.questCard.automatic')}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Botón para eliminar - SOLO para gestas que NO sean ultimate_achievement */}
          {!isUltimateQuest && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteQuest(quest.id)}
              className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50 flex items-center gap-1 ml-2 flex-shrink-0 h-8"
              title="Esta gesta no me representa - Eliminar"
            >
              <Trash2 className="w-3 h-3" />
              <span className="text-xs hidden sm:inline">{t('epicQuests.questCard.notRepresent')}</span>
            </Button>
          )}
        </div>
        
        {/* Solo mostrar progreso si NO es la gesta ultimate */}
        {!isUltimateQuest && (
          <QuestProgress 
            quest={quest}
            onAddCheck={onAddCheck}
            onRemoveCheck={onRemoveCheck}
          />
        )}
        
        {/* Mostrar información especial para la gesta ultimate */}
        {isUltimateQuest && (
          <div className="space-y-3">
            <div className="bg-purple-100 p-3 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-800 text-center">
                <Crown className="w-4 h-4 inline mr-1" />
                <strong>{t('epicQuests.questCard.ultimateDescription')}</strong>
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {t('epicQuests.questCard.status')} {quest.isCompleted ? t('epicQuests.questCard.unlocked') : t('epicQuests.questCard.locked')}
              </span>
              <div className="flex gap-1">
                {quest.isCompleted ? (
                  <Crown className="w-6 h-6 text-purple-500" />
                ) : (
                  <Crown className="w-6 h-6 text-gray-300" />
                )}
              </div>
            </div>
          </div>
        )}
        
        <QuestReward quest={quest} />
      </CardContent>
    </Card>
  );
};

export default QuestCard;