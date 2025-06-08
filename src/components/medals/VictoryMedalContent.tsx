
import { SpecialMedal } from './medalTypes';
import { getSuccessRate } from './medalUtils';

interface VictoryMedalContentProps {
  medal: SpecialMedal;
}

export const VictoryMedalContent = ({ medal }: VictoryMedalContentProps) => {
  const medalHasDays = (medal: SpecialMedal): medal is SpecialMedal & { days: number } => {
    return 'days' in medal && typeof medal.days === 'number';
  };

  return (
    <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
      <h3 className="text-lg font-bold text-yellow-700 mb-3">🏛️ Significado de la Victoria</h3>
      <div className="space-y-3 text-sm text-yellow-700">
        <p>
          <strong>Nike, la diosa griega de la victoria</strong>, representa tu triunfo 
          sobre las estadísticas. Esta medalla no otorga beneficios materiales, 
          sino el reconocimiento de tu fortaleza excepcional.
        </p>
        {medalHasDays(medal) && (
          <div className="bg-yellow-100 p-3 rounded border">
            <p className="font-medium mb-2">Estadística actual:</p>
            <p>Solo el {getSuccessRate(medal.days)}% de las personas llegan donde tú has llegado.</p>
            <p className="text-xs mt-2 italic">
              Has demostrado ser parte de una minoría resiliente y determinada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
