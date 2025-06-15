import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipHelper } from '@/components/ui/tooltip-helper';
import { Calendar, CheckCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface HabitTracking {
  habitId: string;
  date: string;
  completed: boolean;
  week: number;
  year: number;
}

interface WeeklyProgress {
  week: number;
  year: number;
  completedDays: number;
  totalDays: number;
}

interface HabitTrackerProps {
  habitId: string;
  habitName: string;
  isActive: boolean;
}

const HabitTracker = ({ habitId, habitName, isActive }: HabitTrackerProps) => {
  const { t } = useTranslation();
  const [trackingData, setTrackingData] = useState<HabitTracking[]>([]);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [isConsolidated, setIsConsolidated] = useState(false);

  useEffect(() => {
    const savedTracking = localStorage.getItem(`habit-tracking-${habitId}`);
    if (savedTracking) {
      const data = JSON.parse(savedTracking);
      setTrackingData(data);
      
      // Verificar si hoy está completado
      const today = new Date().toDateString();
      const todayEntry = data.find((entry: HabitTracking) => 
        new Date(entry.date).toDateString() === today
      );
      setTodayCompleted(todayEntry?.completed || false);
    }

    // Verificar si el hábito está consolidado
    const consolidatedHabits = JSON.parse(localStorage.getItem('consolidated-habits') || '[]');
    setIsConsolidated(consolidatedHabits.includes(habitId));
  }, [habitId]);

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const toggleToday = () => {
    if (isConsolidated) return; // No permitir cambios si ya está consolidado
    
    const today = new Date();
    const todayString = today.toDateString();
    const week = getWeekNumber(today);
    const year = today.getFullYear();
    
    const updatedData = trackingData.filter(entry => 
      new Date(entry.date).toDateString() !== todayString
    );
    
    if (!todayCompleted) {
      const newEntry: HabitTracking = {
        habitId,
        date: today.toISOString(),
        completed: true,
        week,
        year
      };
      updatedData.push(newEntry);
      toast.success(`✅ ${habitName} ${t('habitsManager.habitTracker.doneToday')}`);
    } else {
      toast.info(`❌ ${habitName} ${t('habitsManager.habitTracker.markToday')}`);
    }
    
    setTrackingData(updatedData);
    setTodayCompleted(!todayCompleted);
    localStorage.setItem(`habit-tracking-${habitId}`, JSON.stringify(updatedData));

    // Verificar consolidación después de actualizar
    checkConsolidation(updatedData);
  };

  const checkConsolidation = (data: HabitTracking[]) => {
    if (isConsolidated) return;

    const weeklyProgress = getWeeklyProgressData(data);
    const recentWeeks = weeklyProgress.slice(-8); // Últimas 8 semanas para tener margen

    // Criterio especial para compromiso social y paseos en naturaleza: solo necesitan 2 veces por semana
    if (habitId === 'social_commitment' || habitId === 'nature_walks') {
      // Buscar 8 semanas consecutivas con al menos 2 días completados para nature_walks
      // o 1 día para social_commitment
      let consecutiveWeeks = 0;
      const minDaysRequired = habitId === 'nature_walks' ? 2 : 1;
      
      for (let i = recentWeeks.length - 1; i >= 0; i--) {
        if (recentWeeks[i].completedDays >= minDaysRequired) {
          consecutiveWeeks++;
          if (consecutiveWeeks >= (habitId === 'nature_walks' ? 6 : 8)) {
            consolidateHabit();
            return;
          }
        } else {
          break; // Rompe la racha
        }
      }
    } else {
      // Criterio 1: 4 semanas seguidas con 5/7 días
      const fourWeeksWith5Days = checkConsecutiveWeeks(recentWeeks.slice(-4), 5);
      
      // Criterio 2: 6 semanas con 4/7 días
      const sixWeeksWith4Days = recentWeeks.length >= 6 && 
        recentWeeks.slice(-6).every(week => week.completedDays >= 4);

      if (fourWeeksWith5Days || sixWeeksWith4Days) {
        consolidateHabit();
      }
    }
  };

  const checkConsecutiveWeeks = (weeks: WeeklyProgress[], minDays: number) => {
    return weeks.length >= 4 && weeks.every(week => week.completedDays >= minDays);
  };

  const consolidateHabit = () => {
    const consolidatedHabits = JSON.parse(localStorage.getItem('consolidated-habits') || '[]');
    if (!consolidatedHabits.includes(habitId)) {
      consolidatedHabits.push(habitId);
      localStorage.setItem('consolidated-habits', JSON.stringify(consolidatedHabits));
      setIsConsolidated(true);

      // Guardar medalla obtenida
      const habitMedals = JSON.parse(localStorage.getItem('habit-medals') || '[]');
      const medalData = {
        id: `habit_${habitId}`,
        habitId,
        habitName,
        dateObtained: new Date().toISOString(),
        habitType: getHabitMedalType(habitId)
      };
      habitMedals.push(medalData);
      localStorage.setItem('habit-medals', JSON.stringify(habitMedals));

      toast.success(`🏆 ${t('habitsManager.habitTracker.habitConsolidated')}`, {
        description: t('habitsManager.habitTracker.medalObtained'),
        duration: 5000
      });
    }
  };

  const getHabitMedalType = (habitId: string) => {
    switch (habitId) {
      case 'daily_exercise': return 'exercise';
      case 'strict_sleep_schedule': return 'sleep';
      case 'social_commitment': return 'social';
      case 'nature_walks': return 'nature';
      default: return 'general';
    }
  };

  const getWeeklyProgressData = (data: HabitTracking[]): WeeklyProgress[] => {
    const weeklyMap = new Map<string, WeeklyProgress>();
    
    data.forEach(entry => {
      if (entry.completed) {
        const key = `${entry.year}-${entry.week}`;
        if (!weeklyMap.has(key)) {
          weeklyMap.set(key, {
            week: entry.week,
            year: entry.year,
            completedDays: 0,
            totalDays: 7
          });
        }
        const weekData = weeklyMap.get(key)!;
        weekData.completedDays++;
      }
    });

    return Array.from(weeklyMap.values()).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.week - b.week;
    });
  };

  const getCurrentWeekProgress = () => {
    const today = new Date();
    const currentWeek = getWeekNumber(today);
    const currentYear = today.getFullYear();
    
    const weekData = trackingData.filter(entry => 
      entry.week === currentWeek && 
      entry.year === currentYear && 
      entry.completed
    );
    
    // Para compromiso social y paseos en naturaleza, criterios especiales
    if (habitId === 'social_commitment') {
      return weekData.length >= 1 ? 100 : 0;
    }
    
    if (habitId === 'nature_walks') {
      return (weekData.length / 2) * 100; // 2 días = 100%
    }
    
    // Para otros hábitos, mantener el cálculo normal
    return (weekData.length / 7) * 100;
  };

  const getStreak = () => {
    const sortedData = [...trackingData]
      .filter(entry => entry.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const entry of sortedData) {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
        currentDate = new Date(entryDate.getTime() - 24 * 60 * 60 * 1000);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getConsolidationCriteria = () => {
    if (habitId === 'social_commitment') {
      return {
        description: t('habitsManager.habitTracker.tooltip.consolidation', { 
          description: 'For social commitment: 8 consecutive weeks with 1+ day per week'
        }),
        minDays: 1,
        weeksRequired: 8
      };
    }
    if (habitId === 'nature_walks') {
      return {
        description: t('habitsManager.habitTracker.tooltip.consolidation', { 
          description: 'For nature walks: 6 consecutive weeks with 2+ days per week'
        }),
        minDays: 2,
        weeksRequired: 6
      };
    }
    return {
      description: t('habitsManager.habitTracker.tooltip.consolidation', { 
        description: 'For exercise and sleep: 4 consecutive weeks with 5+ days OR 6 weeks with 4+ days'
      }),
      minDays: habitId === 'daily_exercise' || habitId === 'strict_sleep_schedule' ? 5 : 4,
      weeksRequired: 4
    };
  };

  if (!isActive) return null;

  const weeklyProgress = getCurrentWeekProgress();
  const currentStreak = getStreak();
  const weeklyData = getWeeklyProgressData(trackingData);
  const recentWeeks = weeklyData.slice(-8); // Mostrar más semanas para compromiso social
  const criteria = getConsolidationCriteria();

  return (
    <Card className={`mt-3 ${isConsolidated ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-200'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {t('habitsManager.habitTracker.tracking', { name: habitName })}
          {isConsolidated && (
            <Badge className="bg-green-500 text-white">
              {t('habitsManager.habitTracker.consolidated')}
            </Badge>
          )}
          <TooltipHelper
            content={
              <div className="space-y-2">
                <p className="font-semibold">{t('habitsManager.habitTracker.tooltip.title')}</p>
                <p className="text-sm">{t('habitsManager.habitTracker.tooltip.description')}</p>
                <p className="font-semibold">{t('habitsManager.habitTracker.tooltip.consolidation.title')}</p>
                <p className="text-sm">{criteria.description}</p>
                <p className="font-semibold">{t('habitsManager.habitTracker.tooltip.recountTitle')}</p>
                <p className="text-sm">
                  {habitId === 'social_commitment' 
                    ? t('habitsManager.habitTracker.tooltip.recountSocial')
                    : habitId === 'nature_walks'
                    ? "Para paseos en naturaleza: 2 días por semana = 100% completado"
                    : t('habitsManager.habitTracker.tooltip.recountOthers')
                  }
                </p>
              </div>
            }
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white p-2 rounded">
            <div className="text-lg font-bold text-blue-600">{currentStreak}</div>
            <div className="text-xs text-gray-600">{t('habitsManager.habitTracker.consecutiveDays')}</div>
          </div>
          <div className="bg-white p-2 rounded">
            <div className="text-lg font-bold text-green-600">{Math.round(weeklyProgress)}%</div>
            <div className="text-xs text-gray-600">
              {t('habitsManager.habitTracker.thisWeek')}
            </div>
          </div>
          <div className="bg-white p-2 rounded">
            <div className="space-y-1">
              <Button
                size="sm"
                variant={todayCompleted ? "default" : "outline"}
                onClick={toggleToday}
                className={`w-full h-8 ${
                  todayCompleted 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'border-green-300 text-green-700 hover:bg-green-50'
                }`}
                disabled={isConsolidated}
                title={isConsolidated ? "Hábito ya consolidado" : "Marcar como completado hoy"}
              >
                {todayCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </Button>
              <div className="text-xs text-gray-600">
                {todayCompleted ? t('habitsManager.habitTracker.doneToday') : t('habitsManager.habitTracker.markToday')}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>{t('habitsManager.habitTracker.weeklyProgress')}</span>
            <span>{Math.round(weeklyProgress)}%</span>
          </div>
          <Progress value={weeklyProgress} className="h-2" />
          {habitId === 'social_commitment' && (
            <div className="text-xs text-gray-600 text-center">
              {weeklyProgress === 100 ? t('habitsManager.habitTracker.weekCompleted') : t('habitsManager.habitTracker.needOneDay')}
            </div>
          )}
          {habitId === 'nature_walks' && (
            <div className="text-xs text-gray-600 text-center">
              {weeklyProgress === 100 ? "✅ Semana completada (2+ días)" : `⏳ Necesitas ${2 - Math.floor(weeklyProgress / 50)} día(s) más esta semana`}
            </div>
          )}
        </div>

        {/* Progreso hacia consolidación */}
        {!isConsolidated && recentWeeks.length > 0 && (
          <div className="bg-white p-3 rounded-lg border">
            <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
              {t('habitsManager.habitTracker.progressToConsolidation')}
            </h4>
            <div className="space-y-2">
              <div className="text-xs text-gray-600">
                {t('habitsManager.habitTracker.lastWeeks', { count: Math.min(recentWeeks.length, criteria.weeksRequired) })}
              </div>
              <div className="flex gap-1 flex-wrap">
                {recentWeeks.slice(-criteria.weeksRequired).map((week, index) => {
                  const minDaysRequired = habitId === 'nature_walks' ? 2 : 
                                         habitId === 'social_commitment' ? 1 : 
                                         criteria.minDays;
                  
                  const isGood = week.completedDays >= minDaysRequired;
                  const isOk = habitId === 'social_commitment' || habitId === 'nature_walks' ? 
                    false : 
                    week.completedDays >= 4;
                  
                  return (
                    <div
                      key={`${week.year}-${week.week}`}
                      className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                        isGood ? 'bg-green-500 text-white' :
                        isOk ? 'bg-yellow-500 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}
                      title={`Semana ${week.week}: ${week.completedDays}/7 días`}
                    >
                      {week.completedDays}
                    </div>
                  );
                })}
              </div>
              <div className="text-xs text-gray-500">
                {t('habitsManager.habitTracker.consolidationTarget', { description: criteria.description })}
              </div>
            </div>
          </div>
        )}

        {isConsolidated && (
          <div className="bg-green-100 p-3 rounded-lg border border-green-300">
            <div className="text-center">
              <p className="text-sm font-semibold text-green-800">{t('habitsManager.habitTracker.habitConsolidated')}</p>
              <p className="text-xs text-green-700">
                {t('habitsManager.habitTracker.medalObtained')}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HabitTracker;