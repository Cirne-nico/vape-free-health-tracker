import { Trophy, Crown } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';
import { useTranslation } from 'react-i18next';

interface QuestRewardProps {
  quest: EpicQuest;
}

const QuestReward = ({ quest }: QuestRewardProps) => {
  const { t } = useTranslation();
  
  if (!quest.isCompleted || !quest.reward) return null;

  return (
    <div className={`p-3 rounded-lg border mt-3 ${quest.id === 'ultimate_achievement' ? 'bg-purple-100 border-purple-200' : 'bg-green-100 border-green-200'}`}>
      <p className={`text-sm font-medium mb-1 ${quest.id === 'ultimate_achievement' ? 'text-purple-800' : 'text-green-800'}`}>
        {quest.id === 'ultimate_achievement' ? <Crown className="w-4 h-4 inline mr-1" /> : <Trophy className="w-4 h-4 inline mr-1" />}
        {t('epicQuests.questCard.rewardObtained')}
      </p>
      <p className={`text-sm ${quest.id === 'ultimate_achievement' ? 'text-purple-700' : 'text-green-700'} break-words`}>
        {quest.reward}
      </p>
      {quest.medalIcon && (
        <p className="text-xs text-orange-700 mt-2 italic">
          {t('epicQuests.questCard.medalVisible')}
        </p>
      )}
    </div>
  );
};

export default QuestReward;