
import { Brain } from 'lucide-react';
import { EmotionalProgressCriteria } from '../emotionalProgressAnalyzer';

interface UnlockedBadgesProps {
  unlockedBadgesData: EmotionalProgressCriteria[];
}

const UnlockedBadges = ({ unlockedBadgesData }: UnlockedBadgesProps) => {
  if (unlockedBadgesData.length === 0) return null;

  return (
    <div>
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <Brain className="w-4 h-4" />
        Estados Emocionales Alcanzados ({unlockedBadgesData.length})
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {unlockedBadgesData.map(badge => (
          <div key={badge.id} className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3 text-center">
            <div className="text-xl mb-1">{badge.icon}</div>
            <p className="text-xs font-medium text-purple-700">{badge.name}</p>
            <p className="text-xs text-purple-600 mt-1">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnlockedBadges;
