
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProcessedAchievement } from './medalTypes';
import { calculateHealthProgress, getCurrentValue } from '../healthData';
import { healthCategories } from '../HealthCategories';

interface VigorMedalContentProps {
  medal: ProcessedAchievement;
  totalSavings: number;
}

export const VigorMedalContent = ({ medal, totalSavings }: VigorMedalContentProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const getHealthDataForDay = (days: number) => {
    const healthData = calculateHealthProgress(days);
    return {
      respiratory: getCurrentValue('respiratory', days, healthData),
      cardiovascular: getCurrentValue('cardiovascular', days, healthData),
      liver: getCurrentValue('liver', days, healthData),
      skinEyes: getCurrentValue('skinEyes', days, healthData),
      mental: getCurrentValue('mental', days, healthData)
    };
  };

  const getMotivationalMessage = (amount: number) => {
    if (amount < 6) return "Las próximas birras sin alcohol las paga la abstinencia.";
    if (amount < 8) return "Ya te has fumado... ¡una barra de pan de centeno eco integral con semillas!";
    if (amount < 10) return "Podrías pagar Netflix un mes... o mejor, vivir algo que no sea por streaming.";
    if (amount < 15) return "Te has ahorrado el menú diario + postre + propina al camarero.";
    if (amount < 20) return "Tu estómago ya no está solo: puedes invitarle a un ramen decente.";
    if (amount < 40) return "Por este precio te montas una cenita digna.";
    if (amount < 70) return "Un masaje, una peli buena, o diez tés con alguien interesante.";
    if (amount < 80) return "Valora pillarte un día libre en el curro.";
    if (amount < 100) return "Bienvenido al club de la gente que paga el alquiler y además respira.";
    if (amount < 150) return "Este pulmón ya merece una escapada de finde.";
    if (amount < 200) return "Ya no solo has dejado de vapear. También podrías dejar de compartir piso.";
    if (amount < 300) return "Tres siglos de churros.";
    if (amount < 500) return "Medio kilo. En tu bolsillo. No en tus pulmones.";
    if (amount < 600) return "Hay quien se compra una bici.";
    if (amount < 1250) return "Viaje a Grecia más alojamiento de un mes pagado, flipa.";
    if (amount < 1750) return "Podrías tatuarte el total ahorrado.";
    if (amount < 2000) return "Dos mil euros. Dos mil días menos de humo. Esto ya no es un logro: es una vida nueva.";
    return "Has alcanzado un nivel épico de ahorro. ¡Increíble!";
  };

  return (
    <>
      {/* Sección del ahorro con botón descubrir */}
      <div className="bg-blue-50 p-4 rounded-lg relative overflow-hidden">
        {!isRevealed ? (
          <div className="text-center space-y-4">
            <div className="bg-blue-100/80 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-blue-800 font-medium mb-4">
                ¿Quieres saber cuánto has ahorrado?
              </p>
              <Button 
                onClick={() => setIsRevealed(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Descubrir
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold text-blue-600">{totalSavings.toFixed(2)}€</p>
            <p className="text-sm text-blue-700 mb-2">ahorrados en total</p>
            <p className="text-sm text-gray-600 italic">
              "{getMotivationalMessage(totalSavings)}"
            </p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-gray-50 p-2 rounded">
          <p className="font-medium">Logro alcanzado:</p>
          <p>Día {medal.days}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="font-medium">Ahorro del hito:</p>
          <p>{(medal.days * ((20/7) + (4/10))).toFixed(2)}€</p>
        </div>
      </div>

      {/* Logros en salud acumulados para medallas de Vigor */}
      <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
        <h3 className="text-lg font-bold text-purple-700 mb-3">🏥 Logros en Salud Acumulados</h3>
        <p className="text-sm text-purple-600 mb-4">Recuperación alcanzada al día {medal.days}:</p>
        
        <div className="grid gap-3">
          {Object.entries(getHealthDataForDay(medal.days)).map(([key, data]) => {
            const category = healthCategories[key as keyof typeof healthCategories];
            return (
              <div key={key} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{category.title}</p>
                    <p className="text-xs text-gray-500">{data.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div 
                    className="text-lg font-bold"
                    style={{ color: category.color }}
                  >
                    {data.value}%
                  </div>
                  <div className="text-xs text-gray-500">recuperado</div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-purple-100 rounded-lg">
          <p className="text-xs text-purple-700 text-center">
            📊 Datos basados en estudios médicos sobre recuperación post-vapeo
          </p>
        </div>
      </div>
    </>
  );
};
