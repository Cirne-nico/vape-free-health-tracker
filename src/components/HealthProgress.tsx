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

  // Función para añadir explicaciones sencillas a términos médicos
  const addSimpleExplanations = (text: string) => {
    return text
      // Términos cardiovasculares
      .replace(/(\d+-\d+\s*mmHg)/g, '$1 (unidades de presión arterial)')
      .replace(/(\d+-\d+\s*lpm)/g, '$1 (latidos por minuto)')
      .replace(/vasoconstricción/g, 'vasoconstricción (estrechamiento de los vasos sanguíneos)')
      .replace(/función endotelial/g, 'función endotelial (salud del interior de las arterias)')
      .replace(/elasticidad arterial/g, 'elasticidad arterial (flexibilidad de las arterias)')
      .replace(/variabilidad cardíaca/g, 'variabilidad cardíaca (capacidad del corazón de adaptarse)')
      .replace(/flujo periférico/g, 'flujo periférico (circulación en brazos y piernas)')
      
      // Términos respiratorios
      .replace(/VO₂ máximo/g, 'VO₂ máximo (capacidad máxima de usar oxígeno)')
      .replace(/capacidad vital forzada/g, 'capacidad vital forzada (cantidad máxima de aire que puedes exhalar)')
      .replace(/flujo espiratorio/g, 'flujo espiratorio (velocidad al expulsar aire)')
      .replace(/cilios respiratorios/g, 'cilios respiratorios (pequeños "pelitos" que limpian los pulmones)')
      .replace(/epitelio bronquial/g, 'epitelio bronquial (revestimiento interno de los bronquios)')
      .replace(/surfactante/g, 'surfactante (sustancia que ayuda a que los pulmones se expandan)')
      .replace(/inflamación alveolar/g, 'inflamación alveolar (hinchazón en las bolsitas de aire de los pulmones)')
      .replace(/resistencia de vías aéreas/g, 'resistencia de vías aéreas (dificultad para que pase el aire)')
      
      // Términos hepáticos
      .replace(/ALT\/GGT/g, 'ALT/GGT (enzimas que indican salud del hígado)')
      .replace(/ALT\/AST/g, 'ALT/AST (enzimas que indican salud del hígado)')
      .replace(/enzimas CYP450/g, 'enzimas CYP450 (proteínas que ayudan a procesar sustancias)')
      .replace(/esteatosis hepática/g, 'esteatosis hepática (acumulación de grasa en el hígado)')
      .replace(/síntesis proteica/g, 'síntesis proteica (producción de proteínas importantes)')
      .replace(/metabolismo lipídico/g, 'metabolismo lipídico (procesamiento de grasas)')
      .replace(/capacidad detoxificante/g, 'capacidad detoxificante (habilidad para eliminar toxinas)')
      
      // Términos de piel y ojos
      .replace(/deshidratación transdérmica/g, 'deshidratación transdérmica (pérdida de agua a través de la piel)')
      .replace(/retención de humedad/g, 'retención de humedad (capacidad de mantener la piel hidratada)')
      .replace(/producción lagrimal/g, 'producción lagrimal (fabricación natural de lágrimas)')
      .replace(/película lagrimal/g, 'película lagrimal (capa protectora de lágrimas sobre el ojo)')
      .replace(/síntesis de colágeno/g, 'síntesis de colágeno (producción de proteína que da firmeza a la piel)')
      .replace(/función barrera cutánea/g, 'función barrera cutánea (capacidad de la piel para protegerse)')
      .replace(/microcirculación dérmica/g, 'microcirculación dérmica (flujo sanguíneo en los pequeños vasos de la piel)')
      
      // Términos neurológicos/mentales
      .replace(/disregulación dopaminérgica/g, 'disregulación dopaminérgica (desequilibrio en la química del placer)')
      .replace(/eje hipotálamo-hipófisis/g, 'eje hipotálamo-hipófisis (sistema que controla hormonas del estrés)')
      .replace(/receptores nicotínicos/g, 'receptores nicotínicos (puntos donde actúa la nicotina en el cerebro)')
      .replace(/circuitos dopaminérgicos mesolímbicos/g, 'circuitos dopaminérgicos mesolímbicos (sistema de recompensa del cerebro)')
      .replace(/arquitectura REM/g, 'arquitectura REM (estructura de las fases del sueño)')
      .replace(/función ejecutiva/g, 'función ejecutiva (capacidad de planificar y tomar decisiones)')
      .replace(/memoria de trabajo/g, 'memoria de trabajo (capacidad de recordar información a corto plazo)')
      .replace(/neuroplasticidad/g, 'neuroplasticidad (capacidad del cerebro para cambiar y adaptarse)')
      .replace(/sistema de recompensa/g, 'sistema de recompensa (circuito cerebral que genera sensación de placer)')
      
      // Sustancias específicas del vapeo
      .replace(/propilenglicol/g, 'propilenglicol (solvente usado en líquidos de vapeo)')
      .replace(/glicerina/g, 'glicerina (sustancia que produce el vapor visible)')
      .replace(/saborizantes/g, 'saborizantes (químicos que dan sabor a los líquidos)');
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
        </div>
        
        <Progress 
          value={currentData.value} 
          className="h-3"
        />
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Estado actual:
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {addSimpleExplanations(currentData.description)}
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
                  Parámetros: {addSimpleExplanations(medicalInfo.parameters)}
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

export default HealthProgress;