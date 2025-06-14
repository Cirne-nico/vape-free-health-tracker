import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipHelper } from '@/components/ui/tooltip-helper';
import { Calendar, CheckCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';

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
      toast.success(`✅ ${habitName} marcado como completado hoy`);
    } else {
      toast.info(`❌ ${habitName} desmarcado para hoy`);
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

    // Criterio especial para compromiso social: solo necesita 1 vez por semana
    if (habitId === 'social_commitment') {
      // Buscar 8 semanas consecutivas con al menos 1 día completado
      let consecutiveWeeks = 0;
      for (let i = recentWeeks.length - 1; i >= 0; i--) {
        if (recentWeeks[i].completedDays >= 1) {
          consecutiveWeeks++;
          if (consecutiveWeeks >= 8) {
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
        type: getHabitMedalType(habitId)
      };
      habitMedals.push(medalData);
      localStorage.setItem('habit-medals', JSON.stringify(habitMedals));

      toast.success(`🏆 ¡Hábito "${habitName}" consolidado!`, {
        description: 'Has obtenido una medalla por consolidar este hábito científico',
        duration: 5000
      });
    }
  };

  const getHabitMedalType = (habitId: string) => {
    switch (habitId) {
      case 'daily_exercise': return 'exercise';
      case 'strict_sleep_schedule': return 'sleep';
      case 'social_commitment': return 'social';
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
    
    // Para compromiso social, 1 día = 100%
    if (habitId === 'social_commitment') {
      return weekData.length >= 1 ? 100 : 0;
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
        description: 'Para compromiso social: 8 semanas consecutivas con 1+ día por semana',
        minDays: 1,
        weeksRequired: 8
      };
    }
    return {
      description: 'Para ejercicio y sueño: 4 semanas seguidas con 5+ días O 6 semanas con 4+ días',
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
          Seguimiento de {habitName}
          {isConsolidated && (
            <Badge className="bg-green-500 text-white">
              Consolidado
            </Badge>
          )}
          <TooltipHelper
            content={
              <div className="space-y-2">
                <p className="font-semibold">¿Cómo funciona?</p>
                <p className="text-sm">Marca como completado cada día que logres el hábito. Solo puedes marcar una vez por día.</p>
                <p className="font-semibold">Consolidación:</p>
                <p className="text-sm">{criteria.description}</p>
                <p className="font-semibold">Recuento semanal:</p>
                <p className="text-sm">
                  {habitId === 'social_commitment' 
                    ? 'Para compromiso social: 1 vez por semana = 100% completado'
                    : 'Se reinicia cada 7 días, pero guarda el historial de semanas previas.'
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
            <div className="text-xs text-gray-600">días seguidos</div>
          </div>
          <div className="bg-white p-2 rounded">
            <div className="text-lg font-bold text-green-600">{Math.round(weeklyProgress)}%</div>
            <div className="text-xs text-gray-600">
              {habitId === 'social_commitment' ? 'esta semana' : 'esta semana'}
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
                {todayCompleted ? 'Hecho hoy' : 'Marcar hoy'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Progreso semanal</span>
            <span>{Math.round(weeklyProgress)}%</span>
          </div>
          <Progress value={weeklyProgress} className="h-2" />
          {habitId === 'social_commitment' && (
            <div className="text-xs text-gray-600 text-center">
              {weeklyProgress === 100 ? '✅ Semana completada (1+ día)' : '⏳ Necesitas 1 día esta semana'}
            </div>
          )}
        </div>

        {/* Progreso hacia consolidación */}
        {!isConsolidated && recentWeeks.length > 0 && (
          <div className="bg-white p-3 rounded-lg border">
            <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
              Progreso hacia consolidación
            </h4>
            <div className="space-y-2">
              <div className="text-xs text-gray-600">
                Últimas {Math.min(recentWeeks.length, criteria.weeksRequired)} semanas:
              </div>
              <div className="flex gap-1 flex-wrap">
                {recentWeeks.slice(-criteria.weeksRequired).map((week, index) => {
                  const isGood = habitId === 'social_commitment' ? 
                    week.completedDays >= 1 : 
                    week.completedDays >= criteria.minDays;
                  const isOk = habitId === 'social_commitment' ? 
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
                🎯 {criteria.description}
              </div>
            </div>
          </div>
        )}

        {isConsolidated && (
          <div className="bg-green-100 p-3 rounded-lg border border-green-300">
            <div className="text-center">
              <p className="text-sm font-semibold text-green-800">¡Hábito Consolidado!</p>
              <p className="text-xs text-green-700">
                Has obtenido una medalla por consolidar este hábito científico
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HabitTracker;