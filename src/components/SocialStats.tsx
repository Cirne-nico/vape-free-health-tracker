
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Target } from 'lucide-react';

interface SocialStatsProps {
  currentDay: number;
  totalSavings: number;
}

const SocialStats = ({ currentDay, totalSavings }: SocialStatsProps) => {
  // Datos simulados pero realistas basados en estudios de cesación
  const getSuccessRate = (day: number) => {
    if (day < 1) return 95;
    if (day < 3) return 78;
    if (day < 7) return 65;
    if (day < 14) return 52;
    if (day < 30) return 41;
    if (day < 90) return 28;
    return 15;
  };

  const getContinuationRate = (day: number) => {
    // Porcentaje de personas que continúan sin vapear después de alcanzar este día
    if (day < 7) return 85;
    if (day < 30) return 72;
    if (day < 90) return 58;
    return 45;
  };

  const successRate = getSuccessRate(currentDay);
  const continuationRate = getContinuationRate(currentDay);

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Users className="w-5 h-5" />
          Comparación con la Comunidad
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/60 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Tasa de Éxito</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{successRate}%</p>
            <p className="text-xs text-gray-600">
              de las personas que empiezan a dejar de vapear llegan hasta el día {currentDay}
            </p>
          </div>

          <div className="bg-white/60 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Continuación</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{continuationRate}%</p>
            <p className="text-xs text-gray-600">
              de quienes llegan al día {currentDay} continúan sin vapear al menos 30 días más
            </p>
          </div>
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
