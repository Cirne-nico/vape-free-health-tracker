import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';

interface QuestActionsProps {
  quest: EpicQuest;
  onAddExtraCheck: (questId: string) => void;
  onDeleteQuest: (questId: string) => void;
}

const QuestActions = ({ quest, onAddExtraCheck, onDeleteQuest }: QuestActionsProps) => {
  console.log('QuestActions - Quest:', quest.title, 'isCustom:', quest.isCustom); // Debug

  return (
    <div className="flex items-center gap-2">
      {/* Botón para añadir check extra - SOLO para gestas predefinidas */}
      {!quest.isCustom && quest.requiredChecks < 6 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddExtraCheck(quest.id)}
          className="text-blue-600 hover:text-blue-700 border-blue-300"
          title="Añadir un check extra (máximo 1)"
        >
          +1
        </Button>
      )}
      
      {/* Botón para eliminar - SOLO para gestas personalizadas */}
      {quest.isCustom && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDeleteQuest(quest.id)}
          className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50 flex items-center gap-1"
          title="Esta gesta no me representa - Eliminar"
        >
          <Trash2 className="w-3 h-3" />
          <span className="text-xs">No me representa</span>
        </Button>
      )}
    </div>
  );
};

export default QuestActions;