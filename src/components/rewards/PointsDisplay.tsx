
import { Star } from 'lucide-react';

interface PointsDisplayProps {
  totalPoints: number;
}

const PointsDisplay = ({ totalPoints }: PointsDisplayProps) => {
  return (
    <div className="text-center space-y-2">
      <div className="flex items-center justify-center gap-2">
        <span className="text-3xl font-bold text-yellow-600">{totalPoints}</span>
        <Star className="w-6 h-6 text-yellow-500" />
      </div>
      <p className="text-sm text-gray-600">Puntos de Progreso Integral</p>
    </div>
  );
};

export default PointsDisplay;
