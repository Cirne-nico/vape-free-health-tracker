
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, Shield, Eye, Brain } from 'lucide-react';

interface HealthMedalContentProps {
  medal: any;
}

export const HealthMedalContent = ({ medal }: HealthMedalContentProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cardiovascular':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'respiratory':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'liver':
        return <Shield className="w-4 h-4 text-orange-500" />;
      case 'skinEyes':
        return <Eye className="w-4 h-4 text-green-500" />;
      case 'mental':
        return <Brain className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'cardiovascular':
        return 'Sistema Cardiovascular';
      case 'respiratory':
        return 'Sistema Respiratorio';
      case 'liver':
        return 'Salud Hepática';
      case 'skinEyes':
        return 'Piel y Ojos';
      case 'mental':
        return 'Bienestar Mental';
      default:
        return 'Salud General';
    }
  };

  return (
    <>
      {/* Información médica específica */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {getCategoryIcon(medal.healthCategory)}
              <div>
                <h3 className="font-bold text-green-700">
                  {getCategoryName(medal.healthCategory)}
                </h3>
                <Badge variant="outline" className="text-xs mt-1">
                  Día {medal.days}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">🎯 Logro Alcanzado</h4>
                <p className="text-sm text-gray-600">{medal.reward}</p>
              </div>

              <div className="bg-white p-3 rounded-lg border">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">🔬 Base Médica</h4>
                <p className="text-sm text-gray-600">{medal.medicalBasis}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información adicional de salud */}
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
        <h3 className="text-lg font-bold text-blue-700 mb-3">🏥 Información Médica</h3>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-600">Categoría:</span>
            <span className="font-medium text-blue-800">{getCategoryName(medal.healthCategory)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-600">Tiempo de recuperación:</span>
            <span className="font-medium text-blue-800">{medal.days} días</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            📊 Información basada en estudios médicos sobre recuperación post-vapeo
          </p>
        </div>
      </div>
    </>
  );
};
