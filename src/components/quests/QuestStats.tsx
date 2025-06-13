import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Medal } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';

interface QuestStatsProps {
  quests: EpicQuest[];
}

const QuestStats = ({ quests }: QuestStatsProps) => {
  const completedQuests = quests.filter(q => q.isCompleted).length;
  const totalQuests = quests.length;
  const completedQuestsWithMedals = quests.filter(q => q.isCompleted && q.medalIcon).length;

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
      <CardHeader>
        <CardTitle className="text-center text-amber-700 flex items-center justify-center gap-2">
          ⚔️ Grandes hazañas
          <Trophy className="w-5 h-5" />
        </CardTitle>
        <p className="text-center text-amber-600">
          Situaciones difíciles superadas sin vapear
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/70 p-3 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">{completedQuests}</div>
            <div className="text-sm text-amber-700">hazañas completadas</div>
          </div>
          <div className="bg-white/70 p-3 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">{totalQuests}</div>
            <div className="text-sm text-amber-700">hazañas totales</div>
          </div>
          <div className="bg-white/70 p-3 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-1">
              <Medal className="w-5 h-5" />
              {completedQuestsWithMedals}
            </div>
            <div className="text-sm text-orange-700">medallas épicas</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progreso general</span>
            <span>{Math.round((completedQuests / totalQuests) * 100)}%</span>
          </div>
          <Progress value={(completedQuests / totalQuests) * 100} className="h-3" />
        </div>

        {completedQuestsWithMedals > 0 && (
          <div className="mt-4 bg-orange-100 p-3 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800 text-center">
              🏆 Tienes {completedQuestsWithMedals} medalla{completedQuestsWithMedals > 1 ? 's' : ''} épica{completedQuestsWithMedals > 1 ? 's' : ''} visible{completedQuestsWithMedals > 1 ? 's' : ''} en la pantalla principal
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestStats;