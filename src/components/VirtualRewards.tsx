
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Zap, Heart, Crown, Diamond } from 'lucide-react';

interface VirtualRewardsProps {
  currentDay: number;
  totalSavings: number;
  unlockedAchievements: any[];
}

const VirtualRewards = ({ currentDay, totalSavings, unlockedAchievements }: VirtualRewardsProps) => {
  // Sistema de puntos basado en días y logros
  const calculatePoints = () => {
    let points = currentDay * 10; // 10 puntos por día
    points += unlockedAchievements.length * 50; // 50 puntos por logro
    points += Math.floor(totalSavings / 10) * 5; // 5 puntos por cada 10€ ahorrados
    return points;
  };

  const totalPoints = calculatePoints();

  // Nueva progresión poética de insignias - 12 etapas
  const specialBadges = [
    {
      id: 'umbral',
      name: 'Umbral',
      icon: '🌫️',
      description: 'Supera 7 días consecutivos',
      unlocked: currentDay >= 7,
      points: 100,
      color: 'text-gray-600 bg-gray-100'
    },
    {
      id: 'goteo',
      name: 'Goteo',
      icon: '💧',
      description: 'Alcanza 14 días',
      unlocked: currentDay >= 14,
      points: 150,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'vibracion',
      name: 'Vibración',
      icon: '🌿',
      description: 'Completa 21 días',
      unlocked: currentDay >= 21,
      points: 200,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 'sintonia',
      name: 'Sintonía',
      icon: '🌀',
      description: 'Alcanza 28 días',
      unlocked: currentDay >= 28,
      points: 250,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 'corriente',
      name: 'Corriente',
      icon: '🌬️',
      description: 'Completa 35 días',
      unlocked: currentDay >= 35,
      points: 300,
      color: 'text-cyan-600 bg-cyan-100'
    },
    {
      id: 'reverso',
      name: 'Reverso',
      icon: '🔍',
      description: 'Alcanza 42 días',
      unlocked: currentDay >= 42,
      points: 350,
      color: 'text-amber-600 bg-amber-100'
    },
    {
      id: 'resonancia',
      name: 'Resonancia',
      icon: '🌊',
      description: 'Completa 49 días',
      unlocked: currentDay >= 49,
      points: 400,
      color: 'text-teal-600 bg-teal-100'
    },
    {
      id: 'suspension',
      name: 'Suspensión',
      icon: '🎐',
      description: 'Alcanza 56 días',
      unlocked: currentDay >= 56,
      points: 450,
      color: 'text-indigo-600 bg-indigo-100'
    },
    {
      id: 'tension_afinada',
      name: 'Tensión afinada',
      icon: '🔸',
      description: 'Completa 63 días',
      unlocked: currentDay >= 63,
      points: 500,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      id: 'ligereza',
      name: 'Ligereza',
      icon: '🫧',
      description: 'Alcanza 70 días',
      unlocked: currentDay >= 70,
      points: 550,
      color: 'text-pink-600 bg-pink-100'
    },
    {
      id: 'reflejo',
      name: 'Reflejo',
      icon: '🪞',
      description: 'Completa 77 días',
      unlocked: currentDay >= 77,
      points: 600,
      color: 'text-violet-600 bg-violet-100'
    },
    {
      id: 'presencia_minima',
      name: 'Presencia mínima',
      icon: '🧿',
      description: 'Alcanza 84 días',
      unlocked: currentDay >= 84,
      points: 650,
      color: 'text-blue-700 bg-blue-200'
    }
  ];

  const unlockedBadges = specialBadges.filter(badge => badge.unlocked);
  const nextBadge = specialBadges.find(badge => !badge.unlocked);

  // Nuevos niveles poéticos de usuario basados en insignias desbloqueadas
  const levels = [
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

  const currentLevel = levels.slice().reverse().find(level => unlockedBadges.length >= level.minBadges) || levels[0];
  const nextLevel = levels.find(level => unlockedBadges.length < level.minBadges);
  const progressToNext = nextLevel ? 
    ((unlockedBadges.length - currentLevel.minBadges) / (nextLevel.minBadges - currentLevel.minBadges)) * 100 : 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Sistema de Recompensas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Puntos y Nivel */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-yellow-600">{totalPoints}</span>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-sm text-gray-600">Puntos de Motivación</p>
          
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
                  <span>{nextLevel.minBadges - unlockedBadges.length} insignias restantes</span>
                </div>
                <Progress value={progressToNext} className="h-2" />
              </div>
            )}
          </div>
        </div>

        {/* Insignias Desbloqueadas */}
        <div>
          <h4 className="font-semibold mb-3">Estados Desbloqueados ({unlockedBadges.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {unlockedBadges.map(badge => (
              <div key={badge.id} className={`${badge.color} rounded-lg p-3 text-center`}>
                <div className="text-2xl mb-1">{badge.icon}</div>
                <p className="text-xs font-medium">{badge.name}</p>
                <p className="text-xs opacity-75">+{badge.points} pts</p>
              </div>
            ))}
          </div>
        </div>

        {/* Próximo Estado */}
        {nextBadge && (
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-semibold mb-2 text-gray-700">Próximo Estado</h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xl">{nextBadge.icon}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-700">{nextBadge.name}</p>
                <p className="text-sm text-gray-600">{nextBadge.description}</p>
                <p className="text-xs text-gray-500">+{nextBadge.points} puntos</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <p className="text-xs text-blue-700">
            🌊 Cada estado refleja una transformación interna real. No hay prisa, solo presencia y escucha del propio ritmo.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualRewards;
