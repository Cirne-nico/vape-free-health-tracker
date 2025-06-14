import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';
import { useTranslation } from 'react-i18next';

interface QuestProgressProps {
  quest: EpicQuest;
  onAddCheck: (questId: string) => void;
  onRemoveCheck: (questId: string) => void;
}

const QuestProgress = ({ quest, onAddCheck, onRemoveCheck }: QuestProgressProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {t('epicQuests.questCard.progress')} {quest.currentChecks}/{quest.requiredChecks}
        </span>
        <div className="flex flex-wrap gap-1 justify-end">
          {Array.from({ length: quest.requiredChecks }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i < quest.currentChecks) {
                  onRemoveCheck(quest.id);
                } else if (i === quest.currentChecks) {
                  onAddCheck(quest.id);
                }
              }}
              className="transition-colors hover:scale-110"
            >
              {i < quest.currentChecks ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 hover:text-green-400" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <Progress 
        value={(quest.currentChecks / quest.requiredChecks) * 100} 
        className="h-2"
      />
    </div>
  );
};

export default QuestProgress;