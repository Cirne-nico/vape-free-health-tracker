
import { ProcessedHealthAchievement } from './medalTypes';
import { getDetailedHealthInfo } from './healthMedalData';
import { healthCategories } from '../HealthCategories';

interface HealthMedalContentProps {
  medal: ProcessedHealthAchievement;
}

export const HealthMedalContent = ({ medal }: HealthMedalContentProps) => {
  const detailedHealthInfo = getDetailedHealthInfo(medal.id);

  if (!detailedHealthInfo) return null;

  return (
    <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200 text-left space-y-6">
      <h3 className="text-xl font-bold text-green-700 mb-4 text-center">🏛️ Análisis Médico Detallado - Higiea</h3>
      
      {/* Base científica */}
      <div className="bg-white p-4 rounded-lg border border-green-300">
        <h4 className="text-lg font-semibold text-green-800 mb-2">📚 Base Científica</h4>
        <p className="text-sm text-green-700 leading-relaxed">
          {detailedHealthInfo.scientificBasis}
        </p>
      </div>

      {/* Proceso fisiológico */}
      <div className="bg-white p-4 rounded-lg border border-green-300">
        <h4 className="text-lg font-semibold text-green-800 mb-2">🔬 Proceso Fisiológico</h4>
        <p className="text-sm text-green-700 leading-relaxed">
          {detailedHealthInfo.physiologicalProcess}
        </p>
      </div>

      {/* Impacto medible */}
      <div className="bg-white p-4 rounded-lg border border-green-300">
        <h4 className="text-lg font-semibold text-green-800 mb-2">📊 Impacto Medible</h4>
        <p className="text-sm text-green-700 leading-relaxed">
          {detailedHealthInfo.measurableImpact}
        </p>
      </div>

      {/* Cronología */}
      <div className="bg-green-100 p-4 rounded-lg border border-green-400">
        <h4 className="text-lg font-semibold text-green-800 mb-2">⏰ Cronología de Recuperación</h4>
        <p className="text-sm text-green-700 font-medium">
          {detailedHealthInfo.timeline}
        </p>
      </div>

      {/* Referencias */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">📖 Referencias Científicas</h4>
        <p className="text-xs text-gray-600 italic">
          {detailedHealthInfo.references}
        </p>
      </div>

      {/* Logro específico alcanzado */}
      <div className="bg-green-200 p-4 rounded-lg border-2 border-green-400">
        <h4 className="text-lg font-semibold text-green-800 mb-2 text-center">🎯 Tu Logro Específico</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white p-3 rounded border text-center">
            <p className="font-medium text-green-700">Hito alcanzado:</p>
            <p className="text-green-600">Día {medal.days}</p>
          </div>
          <div className="bg-white p-3 rounded border text-center">
            <p className="font-medium text-green-700">Categoría:</p>
            <p className="text-green-600 capitalize">{medal.healthCategory}</p>
          </div>
        </div>
        <div className="mt-3 bg-white p-3 rounded border text-center">
          <p className="font-medium text-green-700 mb-1">Beneficio específico obtenido:</p>
          <p className="text-green-600 font-semibold">{medal.reward}</p>
        </div>
      </div>
    </div>
  );
};
