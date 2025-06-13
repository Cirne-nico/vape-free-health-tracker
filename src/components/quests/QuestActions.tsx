import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';

interface QuestActionsProps {
  quest: EpicQuest;
  onAddExtraCheck: (questId: string) => void;
  onDeleteQuest: (questId: string) => void;
}

const QuestActions = ({ quest, onAddExtraCheck, onDeleteQuest }: QuestActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* Botón para añadir check extra */}
      {!quest.isCustom && quest.requiredChecks < 6 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddExtraCheck(quest.id)}
          className="text-blue-600 hover:text-blue-700"
          title="Añadir un check extra (máximo 1)"
        >
          +1
        </Button>
      )}
      
      {quest.isCustom && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteQuest(quest.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default QuestActions;