
import { ChronosMedal } from './medalTypes';
import { getSuccessRate } from './medalUtils';

interface ChronosMedalContentProps {
  medal: ChronosMedal;
  totalSavings: number;
}

export const ChronosMedalContent = ({ medal, totalSavings }: ChronosMedalContentProps) => {
  const successRate = getSuccessRate(medal.days);

  return (
    <div className="space-y-4">
      {/* Estadísticas impresionantes */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-bold text-amber-700 mb-3 text-center">🏛️ Logro Épico Alcanzado</h4>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/70 rounded-lg p-3">
            <div className="text-2xl font-bold text-amber-600">{medal.days}</div>
            <div className="text-xs text-amber-700">días consecutivos</div>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">{totalSavings.toFixed(0)}€</div>
            <div className="text-xs text-green-700">total ahorrado</div>
          </div>
        </div>
        
        <div className="mt-3 bg-white/70 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600">{successRate.toFixed(1)}%</div>
          <div className="text-xs text-purple-700">de personas no llegan aquí</div>
          <div className="text-xs text-gray-600 mt-1">¡Eres parte de una élite!</div>
        </div>
      </div>

      {/* Cronos y el tiempo */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-bold text-amber-700 mb-2">⏳ Cronos - El Maestro del Tiempo</h4>
        <p className="text-sm text-amber-600 mb-3">
          En la mitología griega, Cronos era el titán que gobernaba el tiempo. 
          Has demostrado que puedes dominar tu tiempo y tus decisiones.
        </p>
        <div className="bg-white/70 rounded p-2">
          <p className="text-xs text-amber-700 italic">
            "El tiempo no es oro, es vida. Y tú has recuperado la tuya."
          </p>
        </div>
      </div>

      {/* Beneficios de los dos años */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-bold text-green-700 mb-2">🌿 Transformación Completa</h4>
        <ul className="text-sm text-green-600 space-y-1">
          <li>• Riesgo de cáncer de pulmón reducido al 50%</li>
          <li>• Sistema cardiovascular completamente normalizado</li>
          <li>• Función inmunológica optimizada</li>
          <li>• Capacidad pulmonar al 100% de tu potencial</li>
          <li>• Riesgo de enfermedades equiparado a no fumadores</li>
        </ul>
      </div>

      {/* Mensaje especial griego */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-bold text-blue-700 mb-2">🇬🇷 Tu Recompensa Helénica</h4>
        <p className="text-sm text-blue-600 italic leading-relaxed">
          "Amorgós te espera. Las aguas cristalinas del Egeo, el viento de las Cícladas, 
          y el sabor del rakí compartido bajo las estrellas. Has ganado el derecho a 
          celebrar tu victoria en la cuna de la civilización."
        </p>
        <div className="mt-3 bg-white/70 rounded p-2">
          <p className="text-xs text-blue-700 font-medium">
            🍽️ Psarotaberna de Aigiali: Donde los pescadores celebran sus mejores capturas, 
            y tú celebrarás la tuya.
          </p>
        </div>
      </div>
    </div>
  );
};
