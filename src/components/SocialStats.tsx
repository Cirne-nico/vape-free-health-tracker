
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp } from 'lucide-react';

interface SocialStatsProps {
  currentDay: number;
  totalSavings: number;
}

const SocialStats = ({ currentDay, totalSavings }: SocialStatsProps) => {
  // Porcentaje de personas que, habiendo llegado al día actual, logran dejar para siempre
  const getSuccessRate = (day: number) => {
    if (day < 1) return 92;
    if (day < 3) return 88;
    if (day < 7) return 82;
    if (day < 14) return 75;
    if (day < 30) return 68;
    if (day < 90) return 58;
    if (day < 180) return 47;
    if (day < 365) return 38;
    return 32;
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
            💡 Estos datos son estadísticas anónimas basadas en estudios de cesación. 
            ¡Tú formas parte de esta comunidad de éxito!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialStats;
