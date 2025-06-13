import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';
import { HealthCategoryKey, healthCategories } from '@/components/HealthCategories';
import { scientificReferences } from '@/data/healthRecoveryData';

interface HealthProgressCardProps {
  category: HealthCategoryKey;
  currentData: {
    value: number;
    description: string;
    medicalBasis?: string;
    timeline?: string;
  };
  nextMilestone?: {
    day: number;
    description: string;
    timeline?: string;
  };
  daysSince: number;
}

const HealthProgressCard = ({ category, currentData, nextMilestone, daysSince }: HealthProgressCardProps) => {
  const categoryData = healthCategories[category];
  const reference = scientificReferences[category];

  // Función para añadir explicaciones sencillas a términos médicos
  const addSimpleExplanations = (text: string) => {
    return text
      .replace(/(\d+-\d+\s*mmHg)/g, '$1 (unidades de presión arterial)')
      .replace(/(\d+-\d+\s*lpm)/g, '$1 (latidos por minuto)')
      .replace(/vasoconstricción/g, 'vasoconstricción (estrechamiento de vasos sanguíneos)')
      .replace(/VO₂ máximo/g, 'VO₂ máximo (capacidad máxima de usar oxígeno)')
      .replace(/cilios respiratorios/g, 'cilios respiratorios (pequeños "pelitos" que limpian los pulmones)')
      .replace(/ALT\/GGT/g, 'ALT/GGT (enzimas que indican salud del hígado)')
      .replace(/neuroplasticidad/g, 'neuroplasticidad (capacidad del cerebro para cambiar)')
      .replace(/dopaminérgica/g, 'dopaminérgica (relacionada con la química del placer)');
  };

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
          {currentData.timeline && (
            <div className="text-xs text-gray-500 mt-1">{currentData.timeline}</div>
          )}
        </div>
        
        <Progress value={currentData.value} className="h-3" />
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Estado actual:</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {addSimpleExplanations(currentData.description)}
          </p>
          {currentData.medicalBasis && (
            <p className="text-xs text-gray-500 mt-2 italic">
              Base médica: {addSimpleExplanations(currentData.medicalBasis)}
            </p>
          )}
        </div>

        {/* Información científica */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-blue-600 italic">{reference}</p>
            </div>
          </div>
        </div>

        {/* Próximo hito */}
        {nextMilestone && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-700 mb-2">
              Próximo hito (Día {nextMilestone.day}):
            </p>
            <p className="text-sm text-green-600 leading-relaxed">
              {addSimpleExplanations(nextMilestone.description)}
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

export default HealthProgressCard;