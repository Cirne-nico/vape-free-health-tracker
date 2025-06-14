import { Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { EmotionalProgressCriteria } from '../emotionalProgressAnalyzer';

interface NextBadgePreviewProps {
  nextBadge: EmotionalProgressCriteria | null;
}

const NextBadgePreview = ({ nextBadge }: NextBadgePreviewProps) => {
  const { t } = useTranslation();
  
  if (!nextBadge) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
      <h4 className="font-semibold mb-2 text-purple-700 flex items-center gap-2">
        <Zap className="w-4 h-4" />
        {t('virtualRewards.nextBadge')}
      </h4>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <span className="text-2xl">{nextBadge.icon}</span>
        </div>
        <div className="flex-1">
          <p className="font-medium text-purple-800">{nextBadge.name}</p>
          <p className="text-sm text-purple-700">{nextBadge.description}</p>
          <p className="text-xs text-purple-600 mt-1">
            {t('emotionLogger.minDaysRequired', { count: nextBadge.minDaysRequired })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NextBadgePreview;