import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, Target } from 'lucide-react';

interface HabitMedalContentProps {
  medal: any;
}

export const HabitMedalContent = ({ medal }: HabitMedalContentProps) => {
  const getHabitTypeDescription = (habitType: string) => {
    switch (habitType) {
      case 'exercise':
        return {
          title: 'Ejercicio Diario',
          description: 'Actividad física como herramienta anti-antojo',
          benefits: [
            'Libera endorfinas naturales que reducen antojos',
            'Acelera la recuperación de vías respiratorias',
            'Mejora el estado de ánimo y reduce el estrés',
            'Fortalece la disciplina y autocontrol'
          ],
          scientificBasis: 'Taylor et al., 2007 - Ejercicio reduce antojos de nicotina al liberar endorfinas'
        };
      case 'sleep':
        return {
          title: 'Horario Estricto de Sueño',
          description: 'Rutina de sueño para control de impulsos',
          benefits: [
            'Mejora significativamente el control de impulsos',
            'Reduce las probabilidades de recaída',
            'Rompe el hábito de vapear en la cama',
            'Optimiza la recuperación neurológica nocturna'
          ],
          scientificBasis: 'Jaehne et al., 2009 - Sueño regular mejora control de impulsos y reduce recaídas'
        };
      case 'social':
        return {
          title: 'Compromiso Social Semanal',
          description: 'Red de apoyo para accountability',
          benefits: [
            'Aumenta el éxito en un 50% vs intentos solitarios',
            'Combate el aislamiento típico del vapeo',
            'Proporciona accountability y motivación externa',
            'Fortalece vínculos sociales saludables'
          ],
          scientificBasis: 'Stead et al., 2017 - Apoyo social aumenta éxito en cesación de nicotina'
        };
      default:
        return {
          title: 'Hábito Científico',
          description: 'Rutina validada para superar abstinencia',
          benefits: ['Hábito consolidado permanentemente'],
          scientificBasis: 'Validado científicamente para cesación de nicotina'
        };
    }
  };

  const habitInfo = getHabitTypeDescription(medal.habitType);

  return (
    <>
      {/* Información específica del hábito */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="font-bold text-purple-700 text-lg">
                  Hábito Científico Consolidado
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {habitInfo.title}
                  </Badge>
                  <Badge className="bg-purple-500 text-white text-xs">
                    Maestría Alcanzada
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border">
                <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Logro Alcanzado
                </h4>
                <p className="text-sm text-gray-600">{habitInfo.description}</p>
              </div>

              <div className="bg-white p-3 rounded-lg border">
                <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Criterio de Consolidación
                </h4>
                <p className="text-sm text-gray-600">
                  4 semanas consecutivas con 5+ días completados O 6 semanas con 4+ días completados
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Beneficios científicos */}
      <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
        <h3 className="text-lg font-bold text-green-700 mb-3">🔬 Beneficios Científicos</h3>
        <ul className="space-y-2">
          {habitInfo.benefits.map((benefit, index) => (
            <li key={index} className="text-sm text-green-700 flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-4 p-3 bg-green-100 rounded-lg">
          <p className="text-xs text-green-700">
            <strong>Base científica:</strong> {habitInfo.scientificBasis}
          </p>
        </div>
      </div>

      {/* Información sobre consolidación */}
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
        <h3 className="text-lg font-bold text-blue-700 mb-3">🏆 Consolidación Permanente</h3>
        <div className="space-y-2 text-sm">
          <p className="text-blue-700">
            <strong>¿Qué significa "consolidado"?</strong> Has demostrado consistencia suficiente 
            para que este hábito se convierta en parte permanente de tu rutina anti-antojo.
          </p>
          <p className="text-blue-600">
            La neuroplasticidad ha creado nuevos circuitos neuronales que hacen este comportamiento 
            automático y natural, proporcionándote una herramienta permanente contra los antojos.
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            🧠 Este hábito ahora forma parte de tu "arsenal neurológico" permanente contra la adicción
          </p>
        </div>
      </div>
    </>
  );
};

export default HabitMedalContent;