import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface AchievementsListProps {
  days: number;
  savings: number;
}

const AchievementsList = ({ days, savings }: AchievementsListProps) => {
  const achievements = [
    {
      id: 'first_day',
      title: 'Primer Día',
      description: 'Completaste tu primer día sin vapear',
      days: 1,
      icon: '🌅',
      reward: 'Nicotina eliminada del sistema'
    },
    {
      id: 'first_48h',
      title: 'Primeras 48 Horas',
      description: 'Superaste el período crítico inicial',
      days: 2,
      icon: '⚡',
      reward: 'Sentidos del gusto y olfato mejorando'
    },
    {
      id: 'first_week',
      title: 'Una Semana Completa',
      description: 'Completaste 7 días consecutivos',
      days: 7,
      icon: '🏆',
      reward: 'Respiración notablemente mejorada'
    },
    {
      id: 'two_weeks',
      title: 'Dos Semanas Sólidas',
      description: 'Mostraste consistencia y determinación',
      days: 14,
      icon: '💪',
      reward: 'Circulación sanguínea optimizada'
    },
    {
      id: 'one_month',
      title: 'Un Mes de Libertad',
      description: 'Alcanzaste el primer mes completo',
      days: 30,
      icon: '🎉',
      reward: 'Función pulmonar significativamente mejorada'
    },
    {
      id: 'two_months',
      title: 'Dos Meses de Progreso',
      description: 'Mantuviste el compromiso por 60 días',
      days: 60,
      icon: '🌟',
      reward: 'Riesgo de problemas respiratorios reducido'
    },
    {
      id: 'three_months',
      title: 'Trimestre Completo',
      description: '¡Alcanzaste la meta de 90 días!',
      days: 90,
      icon: '👑',
      reward: 'Recuperación casi completa del sistema respiratorio'
    },
    {
      id: 'half_year',
      title: 'Medio Año',
      description: 'Seis meses de vida libre de vapeo',
      days: 180,
      icon: '🎯',
      reward: 'Salud cardiovascular normalizada'
    },
    {
      id: 'one_year',
      title: 'Un Año Completo',
      description: '¡Un año entero de libertad!',
      days: 365,
      icon: '🏅',
      reward: 'Riesgo de enfermedades equiparado a no fumadores'
    }
  ];

  const unlockedAchievements = achievements.filter(achievement => days >= achievement.days);
  const nextAchievement = achievements.find(achievement => days < achievement.days);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        
        {/* Resumen de progreso */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-center text-orange-700 flex items-center justify-center gap-2">
              🏆 Hitos Alcanzados
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm p-3">
                  <div className="space-y-2">
                    <p className="font-semibold">¿Cómo funciona?</p>
                    <p className="text-sm">El sistema de hitos reconoce momentos importantes en tu proceso de cesación, cada uno con beneficios de salud específicos.</p>
                    <p className="font-semibold">Base científica:</p>
                    <p className="text-sm">Cronología basada en estudios de recuperación fisiológica post-cesación de nicotina (WHO, 2021).</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <div className="text-3xl font-bold text-orange-600">
                {unlockedAchievements.length}
              </div>
              <div className="text-gray-600">hitos desbloqueados</div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-blue-600">
                  {days} días
                </div>
                <div className="text-gray-600">libres de nicotina</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Próximo hito */}
        {nextAchievement && (
          <Card className="border-2 border-dashed border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg text-gray-600">
                🎯 Próximo Hito
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">{nextAchievement.title}</div>
                  <div className="text-sm text-gray-600">{nextAchievement.description}</div>
                </div>
                <div className="text-2xl">{nextAchievement.icon}</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso</span>
                  <span>{days}/{nextAchievement.days} días</span>
                </div>
                <Progress value={(days / nextAchievement.days) * 100} />
                <div className="text-xs text-gray-500">
                  {nextAchievement.days - days} días restantes
                </div>
              </div>
              
              <div className="bg-blue-50 p-2 rounded text-sm">
                <span className="font-medium">Beneficio: </span>
                {nextAchievement.reward}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hitos desbloqueados */}
        <div className="grid gap-4">
          <h3 className="text-xl font-bold">Hitos Desbloqueados</h3>
          
          {unlockedAchievements.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">
                  ¡Continúa para desbloquear tu primer hito!
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Cada día cuenta hacia tu próxima meta
                </p>
              </CardContent>
            </Card>
          ) : (
            unlockedAchievements.reverse().map((achievement) => (
              <Card key={achievement.id} className="bg-green-50 border-green-200">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div>
                      <div className="font-bold text-green-700">
                        {achievement.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Badge className="bg-green-500 text-white">
                      ✓ Completado
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      Día {achievement.days}
                    </div>
                  </div>
                </CardContent>
                
                <div className="px-4 pb-3">
                  <div className="bg-green-100 p-2 rounded text-sm">
                    <span className="font-medium text-green-700">Beneficio: </span>
                    <span className="text-green-600">{achievement.reward}</span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AchievementsList;