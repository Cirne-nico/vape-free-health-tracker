
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

  // Insignias especiales desbloqueables
  const specialBadges = [
    {
      id: 'warrior',
      name: 'Guerrero',
      icon: Crown,
      description: 'Supera 7 días consecutivos',
      unlocked: currentDay >= 7,
      points: 100,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 'champion',
      name: 'Campeón',
      icon: Diamond,
      description: 'Alcanza 30 días',
      unlocked: currentDay >= 30,
      points: 300,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'legend',
      name: 'Leyenda',
      icon: Star,
      description: 'Completa 90 días',
      unlocked: currentDay >= 90,
      points: 500,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 'saver',
      name: 'Ahorrador',
      icon: Gift,
      description: 'Ahorra más de 100€',
      unlocked: totalSavings >= 100,
      points: 200,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 'achiever',
      name: 'Coleccionista',
      icon: Zap,
      description: 'Desbloquea 10 logros',
      unlocked: unlockedAchievements.length >= 10,
      points: 250,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      id: 'persistent',
      name: 'Persistente',
      icon: Heart,
      description: 'Registra emociones 15 días',
      unlocked: currentDay >= 15, // Simplificado para demo
      points: 150,
      color: 'text-red-600 bg-red-100'
    }
  ];

  const unlockedBadges = specialBadges.filter(badge => badge.unlocked);
  const nextBadge = specialBadges.find(badge => !badge.unlocked);

  // Niveles de usuario
  const levels = [
    { name: 'Principiante', minPoints: 0, color: 'text-gray-600' },
    { name: 'Determinado', minPoints: 200, color: 'text-green-600' },
    { name: 'Comprometido', minPoints: 500, color: 'text-blue-600' },
    { name: 'Experto', minPoints: 1000, color: 'text-purple-600' },
    { name: 'Maestro', minPoints: 2000, color: 'text-orange-600' },
    { name: 'Leyenda', minPoints: 3500, color: 'text-red-600' }
  ];

  const currentLevel = levels.slice().reverse().find(level => totalPoints >= level.minPoints) || levels[0];
  const nextLevel = levels.find(level => totalPoints < level.minPoints);
  const progressToNext = nextLevel ? 
    ((totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100 : 100;

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
            <Badge className={`${currentLevel.color} mb-2`}>
              Nivel: {currentLevel.name}
            </Badge>
            
            {nextLevel && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso al siguiente nivel</span>
                  <span>{nextLevel.minPoints - totalPoints} puntos restantes</span>
                </div>
                <Progress value={progressToNext} className="h-2" />
              </div>
            )}
          </div>
        </div>

        {/* Insignias Desbloqueadas */}
        <div>
          <h4 className="font-semibold mb-3">Insignias Desbloqueadas ({unlockedBadges.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {unlockedBadges.map(badge => {
              const IconComponent = badge.icon;
              return (
                <div key={badge.id} className={`${badge.color} rounded-lg p-3 text-center`}>
                  <IconComponent className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-xs font-medium">{badge.name}</p>
                  <p className="text-xs opacity-75">+{badge.points} pts</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Próxima Insignia */}
        {nextBadge && (
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-semibold mb-2 text-gray-700">Próxima Insignia</h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <nextBadge.icon className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-700">{nextBadge.name}</p>
                <p className="text-sm text-gray-600">{nextBadge.description}</p>
                <p className="text-xs text-gray-500">+{nextBadge.points} puntos</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <p className="text-xs text-yellow-700">
            🎉 Las recompensas son completamente gratuitas y están diseñadas para mantenerte motivado. 
            ¡Cada punto refleja tu progreso real hacia una vida más saludable!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualRewards;
