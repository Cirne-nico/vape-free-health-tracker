
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Zap, Heart, Crown, Diamond, Brain } from 'lucide-react';
import { checkUnlockedBadges, getNextBadgeToUnlock, emotionalProgressBadges } from './emotionalProgressAnalyzer';

interface VirtualRewardsProps {
  currentDay: number;
  totalSavings: number;
  unlockedAchievements: any[];
}

const VirtualRewards = ({ currentDay, totalSavings, unlockedAchievements }: VirtualRewardsProps) => {
  const [emotionLogs, setEmotionLogs] = useState<any[]>([]);
  const [unlockedEmotionalBadges, setUnlockedEmotionalBadges] = useState<string[]>([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('emotion-logs') || '[]');
    setEmotionLogs(logs);
    
    if (logs.length > 0) {
      const unlocked = checkUnlockedBadges(logs);
      setUnlockedEmotionalBadges(unlocked);
    }
  }, []);

  // Sistema de puntos basado en días, logros y nuevas insignias emocionales
  const calculatePoints = () => {
    let points = currentDay * 10; // 10 puntos por día
    points += unlockedAchievements.length * 50; // 50 puntos por logro
    points += Math.floor(totalSavings / 10) * 5; // 5 puntos por cada 10€ ahorrados
    points += unlockedEmotionalBadges.length * 75; // 75 puntos por insignia emocional
    return points;
  };

  const totalPoints = calculatePoints();

  // Obtener insignias desbloqueadas con sus datos completos
  const unlockedBadgesData = emotionalProgressBadges.filter(badge => 
    unlockedEmotionalBadges.includes(badge.id)
  );

  const nextBadge = getNextBadgeToUnlock(emotionLogs, unlockedEmotionalBadges);

  // Niveles actualizados basados en insignias emocionales en lugar de logros regulares
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

  const currentLevel = levels.slice().reverse().find(level => unlockedBadgesData.length >= level.minBadges) || levels[0];
  const nextLevel = levels.find(level => unlockedBadgesData.length < level.minBadges);
  const progressToNext = nextLevel ? 
    ((unlockedBadgesData.length - currentLevel.minBadges) / (nextLevel.minBadges - currentLevel.minBadges)) * 100 : 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          Sistema de Progreso Emocional
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Puntos y Nivel */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-yellow-600">{totalPoints}</span>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-sm text-gray-600">Puntos de Progreso Integral</p>
          
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
                  <span>{nextLevel.minBadges - unlockedBadgesData.length} estados restantes</span>
                </div>
                <Progress value={progressToNext} className="h-2" />
              </div>
            )}
          </div>
        </div>

        {/* Estados Emocionales Desbloqueados */}
        {unlockedBadgesData.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Estados Emocionales Alcanzados ({unlockedBadgesData.length})
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {unlockedBadgesData.map(badge => (
                <div key={badge.id} className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3 text-center">
                  <div className="text-xl mb-1">{badge.icon}</div>
                  <p className="text-xs font-medium text-purple-700">{badge.name}</p>
                  <p className="text-xs text-purple-600 mt-1">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Próximo Estado */}
        {nextBadge && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-purple-700 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Próximo Estado Emocional
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{nextBadge.icon}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-purple-800">{nextBadge.name}</p>
                <p className="text-sm text-purple-700">{nextBadge.description}</p>
                <p className="text-xs text-purple-600 mt-1">
                  Requiere al menos {nextBadge.minDaysRequired} días de registros emocionales
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje motivacional */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <p className="text-xs text-blue-700">
            🧠 Tu progreso se basa en cambios emocionales reales, no solo en el tiempo transcurrido. 
            Cada estado desbloqueado refleja una transformación auténtica en tu bienestar.
          </p>
        </div>

        {/* Información sobre registros */}
        {emotionLogs.length < 7 && (
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <p className="text-xs text-amber-700">
              📊 Registra tus emociones regularmente para desbloquear estados emocionales. 
              Llevas {emotionLogs.length} registros hasta ahora.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VirtualRewards;
