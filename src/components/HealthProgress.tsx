
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';
import { HealthCategoryKey, healthCategories } from './HealthCategories';
import { HealthDataType, getMedicalInfo } from './healthData';

interface HealthProgressProps {
  category: HealthCategoryKey;
  currentData: { value: number; description: string };
  daysSince: number;
  healthData: HealthDataType;
}

const HealthProgress = ({ category, currentData, daysSince, healthData }: HealthProgressProps) => {
  const categoryData = healthCategories[category];
  const medicalInfo = getMedicalInfo(category);

  // Próximo hito
  const nextMilestone = healthData[category].find(point => point.day > daysSince);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">{categoryData.icon}</span>
          {categoryData.title}
        </CardTitle>
        <p className="text-sm text-gray-600">{categoryData.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold" style={{ color: categoryData.color }}>
            {currentData.value}%
          </div>
          <div className="text-sm text-gray-600">recuperación actual</div>
        </div>
        
        <Progress 
          value={currentData.value} 
          className="h-3"
        />
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-700">
            Estado actual:
          </p>
          <p className="text-sm text-gray-600">
            {currentData.description}
          </p>
        </div>

        {/* Información médica */}
        {medicalInfo && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-blue-700">
                  {medicalInfo.basis}
                </p>
                <p className="text-xs text-blue-600">
                  Parámetros: {medicalInfo.parameters}
                </p>
                <p className="text-xs text-blue-500 italic">
                  Ref: {medicalInfo.source}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Próximo hito */}
        {nextMilestone && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-700">
              Próximo hito (Día {nextMilestone.day}):
            </p>
            <p className="text-sm text-green-600">
              {nextMilestone.description}
            </p>
            <p className="text-xs text-green-500 mt-1">
              En {nextMilestone.day - daysSince} días
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthProgress;
