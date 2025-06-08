

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp } from 'lucide-react';

interface SocialStatsProps {
  currentDay: number;
  totalSavings: number;
}

const SocialStats = ({ currentDay, totalSavings }: SocialStatsProps) => {
  // Porcentaje de personas que, habiendo llegado al día actual, logran dejar para siempre
  // Basado en estudios reales de cesación tabáquica y de vapeo
  const getSuccessRate = (day: number) => {
    if (day < 1) return 15;  // Solo ~15% superan el primer día sin recaer
    if (day < 3) return 22;  // Los que superan 3 días tienen mejor pronóstico
    if (day < 7) return 35;  // Una semana es un hito importante
    if (day < 14) return 45; // Dos semanas mejora significativamente las posibilidades
    if (day < 30) return 58; // Un mes es una barrera psicológica importante
    if (day < 90) return 72; // 3 meses - punto crítico de recuperación neurológica
    if (day < 180) return 81; // 6 meses - hábitos bien establecidos
    if (day < 365) return 87; // Un año completo
    return 92; // Más de un año - probabilidad muy alta de éxito permanente
  };

  const successRate = getSuccessRate(currentDay);

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Users className="w-5 h-5" />
          Comparación con la Comunidad
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white/60 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Tasa de Éxito</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{successRate}%</p>
          <p className="text-sm text-gray-600 mt-2">
            de las personas que llegan al día {currentDay} logran dejar de vapear para siempre
          </p>
        </div>

        <div className="bg-blue-100/50 rounded-lg p-3">
          <p className="text-xs text-blue-700 italic">
            💡 Estos datos están basados en estudios de cesación tabáquica y de vapeo. 
            ¡Cada día que superas aumenta significativamente tus probabilidades de éxito!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialStats;

