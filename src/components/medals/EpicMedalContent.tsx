import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sword, Trophy, Target } from 'lucide-react';
import { getCategoryName } from '@/data/epicQuests';

interface EpicMedalContentProps {
  medal: any;
}

export const EpicMedalContent = ({ medal }: EpicMedalContentProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social':
        return <span className="text-blue-500">👥</span>;
      case 'emotional':
        return <span className="text-red-500">💭</span>;
      case 'substance':
        return <span className="text-orange-500">🍺</span>;
      case 'psychological':
        return <span className="text-purple-500">🧠</span>;
      case 'situational':
        return <span className="text-green-500">📍</span>;
      default:
        return <span className="text-gray-500">⚔️</span>;
    }
  };

  return (
    <>
      {/* Información épica específica */}
      <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sword className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="font-bold text-orange-700 text-lg">
                  Gesta Épica Completada
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {getCategoryIcon(medal.category)}
                  <Badge variant="outline" className="text-xs">
                    {getCategoryName(medal.category)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border">
                <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Hazaña Superada
                </h4>
                <p className="text-sm text-gray-600">{medal.description}</p>
              </div>

              <div className="bg-white p-3 rounded-lg border">
                <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Recompensa Obtenida
                </h4>
                <p className="text-sm text-gray-600">{medal.reward}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información sobre neuroplasticidad */}
      <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
        <h3 className="text-lg font-bold text-purple-700 mb-3">🧠 Neuroplasticidad en Acción</h3>
        <div className="space-y-2 text-sm">
          <p className="text-purple-700">
            <strong>Memoria corporal consolidada:</strong> Has repetido esta experiencia las veces necesarias 
            para que quede grabada en tu sistema nervioso como un nuevo patrón neurológico.
          </p>
          <p className="text-purple-600">
            Tu cerebro ahora <strong>sabe</strong> que puede vivir esta situación sin vapear, 
            y incluso disfrutarla más plenamente.
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-purple-100 rounded-lg">
          <p className="text-xs text-purple-700 text-center">
            🏆 Esta situación ya no es un "disparador" sino una demostración de tu nueva cartografía psicofísica
          </p>
        </div>
      </div>
    </>
  );
};

export default EpicMedalContent;