
import { AthenaMedal } from './medalTypes';

interface AthenaMedalContentProps {
  medal: AthenaMedal;
  totalSavings: number;
}

export const AthenaMedalContent = ({ medal, totalSavings }: AthenaMedalContentProps) => {
  return (
    <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200">
      <h3 className="text-xl font-bold text-amber-700 mb-4 text-center">🏛️ El Regalo de Atenea</h3>
      
      {/* Mostrar ahorros en grande */}
      <div className="bg-white p-6 rounded-lg border-2 border-amber-300 mb-4">
        <div className="text-center">
          <p className="text-6xl font-bold text-amber-600 mb-2">
            {totalSavings.toFixed(0)}€
          </p>
          <p className="text-2xl font-bold text-amber-700 mb-4">
            Ya puedes comprarte un viaje a Grecia
          </p>
          <p className="text-sm text-amber-600">
            🏛️ La diosa de la sabiduría te invita a conocer su tierra natal
          </p>
        </div>
      </div>

      <div className="space-y-4 text-sm text-amber-700">
        <p>
          <strong>Atenea, la diosa griega de la sabiduría</strong>, te otorga esta medalla especial 
          por haber demostrado sabiduría en tu decisión de dejar el vapeo y perseverancia 
          durante 90 días completos.
        </p>
        
        <div className="bg-amber-100 p-4 rounded border">
          <p className="font-medium mb-2">La claridad de Atenea:</p>
          <p>A los 90 días, tu mente está más clara que nunca. Como la diosa de la sabiduría, 
          has ganado perspectiva sobre tu vida y tus decisiones. El dinero ahorrado es solo 
          un símbolo de la libertad que has conquistado.</p>
        </div>

        <div className="bg-white p-4 rounded border border-amber-300">
          <p className="font-medium mb-2">🇬🇷 Sobre tu viaje a Grecia:</p>
          <p className="text-xs">
            Con {totalSavings.toFixed(0)}€ puedes permitirte un viaje memorable a Grecia, 
            la cuna de la filosofía y la sabiduría. Visita el Partenón, templo dedicado 
            a Atenea, y celebra tu victoria personal en el lugar donde nació la sabiduría occidental.
          </p>
        </div>
      </div>
    </div>
  );
};
