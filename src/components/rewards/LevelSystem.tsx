
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
    name: 'Cuerpo opaco', 
    icon: '🪨',
    minBadges: 0, 
    color: 'text-gray-600',
    description: 'El cuerpo sigue ocupado. Lo que pide no se distingue del ruido.'
  },
  { 
    name: 'Umbral latente', 
    icon: '🌫️',
    minBadges: 2, 
    color: 'text-gray-500',
    description: 'Algo se desplaza. No es claridad, pero deja de ser costumbre.'
  },
  { 
    name: 'Poros abiertos', 
    icon: '💧',
    minBadges: 4, 
    color: 'text-blue-600',
    description: 'La excitación baja. El entorno ya no golpea, apenas roza.'
  },
  { 
    name: 'Cuerpo en tránsito', 
    icon: '🌬️',
    minBadges: 6, 
    color: 'text-cyan-600',
    description: 'No hay equilibrio aún, pero ya no todo se sostiene en la urgencia.'
  },
  { 
    name: 'Sensible sin esfuerzo', 
    icon: '🫧',
    minBadges: 8, 
    color: 'text-pink-600',
    description: 'Lo que antes alteraba, ahora pasa. El cuerpo hace espacio sin rendirse.'
  },
  { 
    name: 'Presencia mínima', 
    icon: '🪶',
    minBadges: 10, 
    color: 'text-purple-600',
    description: 'Ya no hay que reaccionar a todo. El cuerpo se queda, sin necesitar excusa.'
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
      
      <p className="text-xs text-gray-600 italic mb-3 px-2">
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
