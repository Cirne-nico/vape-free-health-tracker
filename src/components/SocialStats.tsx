import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TooltipHelper } from '@/components/ui/tooltip-helper';
import { Users, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SocialStatsProps {
  currentDay: number;
  totalSavings: number;
}

const SocialStats = ({ currentDay, totalSavings }: SocialStatsProps) => {
  const { t } = useTranslation();
  
  // Porcentaje de personas que, habiendo llegado al día actual, logran dejar para siempre
  // Basado en estudios reales: solo 3-5% lo logra sin ayuda por un año completo
  const getSuccessRate = (day: number) => {
    if (day < 1) return 2;   // Solo ~2% superan el primer día y logran éxito permanente
    if (day < 3) return 3;   // Ligera mejora para quienes superan 3 días
    if (day < 7) return 5;   // Una semana es un hito, pero aún muy bajo
    if (day < 14) return 8;  // Dos semanas mejora las posibilidades
    if (day < 30) return 15; // Un mes es una barrera psicológica importante
    if (day < 90) return 25; // 3 meses - punto crítico de recuperación neurológica
    if (day < 180) return 40; // 6 meses - hábitos más establecidos
    if (day < 365) return 60; // Acercándose al año
    return 75; // Más de un año - alta probabilidad pero realista
  };

  const successRate = getSuccessRate(currentDay);

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Users className="w-5 h-5" />
          {t('socialStats.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white/60 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">{t('socialStats.successRate')}</span>
            <TooltipHelper
              content={
                <div className="space-y-1">
                  <p className="font-semibold">{t('socialStats.successRateTooltip.title')}</p>
                  <p className="text-sm">{t('socialStats.successRateTooltip.description')}</p>
                  <p className="text-sm">{t('socialStats.successRateTooltip.source')}</p>
                </div>
              }
            />
          </div>
          <p className="text-3xl font-bold text-green-600">{successRate}%</p>
          <p className="text-sm text-gray-600 mt-2">
            {t('socialStats.description', { days: currentDay })}
          </p>
        </div>

        <div className="bg-blue-100/50 rounded-lg p-3">
          <p className="text-xs text-blue-700">
            📊 {t('socialStats.source')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialStats;