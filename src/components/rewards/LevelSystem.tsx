
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Level {
  name: string;
  icon: string;
  minBadges: number;
  color: string;
  description: string;
}

interface LevelSystemProps {
  unlockedBadgesCount: number;
}

const levels: Level[] = [
  { 
    name: 'Estado dorsal', 
    icon: '🪨',
    minBadges: 0, 
    color: 'text-gray-600',
    description: 'Supervivencia. El sistema está colapsado, desconectado del mundo.'
  },
  { 
    name: 'Despertar dorsal', 
    icon: '🌫️',
    minBadges: 2, 
    color: 'text-gray-500',
    description: 'Primeros movimientos. Algo empieza a salir del letargo.'
  },
  { 
    name: 'Transición simpática', 
    icon: '💧',
    minBadges: 4, 
    color: 'text-blue-600',
    description: 'La hiperactivación se calma. Menor reactividad al entorno.'
  },
  { 
    name: 'Equilibrio emergente', 
    icon: '🌿',
    minBadges: 6, 
    color: 'text-green-600',
    description: 'Serenidad como nueva base. Los sistemas se regulan.'
  },
  { 
    name: 'Ventral temprano', 
    icon: '🌀',
    minBadges: 8, 
    color: 'text-cyan-600',
    description: 'Conexión auténtica. Calma y vitalidad danzan juntas.'
  },
  { 
    name: 'Ventral maduro', 
    icon: '🌬️',
    minBadges: 10, 
    color: 'text-purple-600',
    description: 'Flexibilidad emocional. Navegación fluida entre estados positivos.'
  },
  { 
    name: 'Presencia total', 
    icon: '🪶',
    minBadges: 12, 
    color: 'text-golden-600',
    description: 'Estado ventral pleno. La calma radiante que abraza la alegría.'
  }
];

const LevelSystem = ({ unlockedBadgesCount }: LevelSystemProps) => {
  const currentLevel = levels.slice().reverse().find(level => unlockedBadgesCount >= level.minBadges) || levels[0];
  const nextLevel = levels.find(level => unlockedBadgesCount < level.minBadges);
  const progressToNext = nextLevel ? 
    ((unlockedBadgesCount - currentLevel.minBadges) / (nextLevel.minBadges - currentLevel.minBadges)) * 100 : 100;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-lg">{currentLevel.icon}</span>
        <Badge className={`${currentLevel.color}`}>
          {currentLevel.name}
        </Badge>
      </div>
      
      <p className="text-xs text-gray-600 italic mb-3 px-2 text-center">
        {currentLevel.description}
      </p>
      
      {nextLevel && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progreso al siguiente nivel</span>
            <span>{nextLevel.minBadges - unlockedBadgesCount} estados restantes</span>
          </div>
          <Progress value={progressToNext} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default LevelSystem;
