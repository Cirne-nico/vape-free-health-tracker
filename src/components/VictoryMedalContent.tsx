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
          sobre las estadísticas epidemiológicas. Esta medalla reconoce tu logro 
          neurobiológico excepcional.
        </p>
        {medalHasDays(medal) && (
          <div className="bg-yellow-100 p-3 rounded border">
            <p className="font-medium mb-2">Estadística epidemiológica:</p>
            <p>Solo el {getSuccessRate(medal.days)}% de las personas alcanzan este hito temporal.</p>
            <p className="text-xs mt-2 italic">
              Has demostrado ser parte de una minoría estadísticamente resiliente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};