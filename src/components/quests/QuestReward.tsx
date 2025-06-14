import { Trophy, Crown } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';

interface QuestRewardProps {
  quest: EpicQuest;
}

const QuestReward = ({ quest }: QuestRewardProps) => {
  if (!quest.isCompleted || !quest.reward) return null;

  return (
    <div className={`p-3 rounded-lg border mt-3 ${quest.id === 'ultimate_achievement' ? 'bg-purple-100 border-purple-200' : 'bg-green-100 border-green-200'}`}>
      <p className={`text-sm font-medium mb-1 ${quest.id === 'ultimate_achievement' ? 'text-purple-800' : 'text-green-800'}`}>
        {quest.id === 'ultimate_achievement' ? <Crown className="w-4 h-4 inline mr-1" /> : <Trophy className="w-4 h-4 inline mr-1" />}
        Recompensa obtenida:
      </p>
      <p className={`text-sm ${quest.id === 'ultimate_achievement' ? 'text-purple-700' : 'text-green-700'} break-words`}>
        {quest.reward}
      </p>
      {quest.medalIcon && (
        <p className="text-xs text-orange-700 mt-2 italic">
          ✨ Medalla épica visible en la pantalla principal
        </p>
      )}
    </div>
  );
};

export default QuestReward;