import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle, XCircle, Target, Trophy } from 'lucide-react';
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
    const recentWeeks = weeklyProgress.slice(-6); // Últimas 6 semanas

    // Criterio 1: 4 semanas seguidas con 5/7 días
    const fourWeeksWith5Days = checkConsecutiveWeeks(recentWeeks.slice(-4), 5);
    
    // Criterio 2: 6 semanas con 4/7 días
    const sixWeeksWith4Days = recentWeeks.length >= 6 && 
      recentWeeks.every(week => week.completedDays >= 4);

    if (fourWeeksWith5Days || sixWeeksWith4Days) {
      consolidateHabit();
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

  if (!isActive) return null;

  const weeklyProgress = getCurrentWeekProgress();
  const currentStreak = getStreak();
  const weeklyData = getWeeklyProgressData(trackingData);
  const recentWeeks = weeklyData.slice(-6);

  return (
    <Card className={`mt-3 ${isConsolidated ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-200'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Seguimiento de {habitName}
          {isConsolidated && (
            <Badge className="bg-green-500 text-white">
              <Trophy className="w-3 h-3 mr-1" />
              Consolidado
            </Badge>
          )}
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
            <div className="text-xs text-gray-600">esta semana</div>
          </div>
          <div className="bg-white p-2 rounded">
            <Button
              size="sm"
              variant={todayCompleted ? "default" : "outline"}
              onClick={toggleToday}
              className="w-full h-8"
              disabled={isConsolidated}
            >
              {todayCompleted ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Progreso semanal</span>
            <span>{Math.round(weeklyProgress)}%</span>
          </div>
          <Progress value={weeklyProgress} className="h-2" />
        </div>

        {/* Progreso hacia consolidación */}
        {!isConsolidated && recentWeeks.length > 0 && (
          <div className="bg-white p-3 rounded-lg border">
            <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <Target className="w-3 h-3" />
              Progreso hacia consolidación
            </h4>
            <div className="space-y-2">
              <div className="text-xs text-gray-600">
                Últimas {recentWeeks.length} semanas:
              </div>
              <div className="flex gap-1">
                {recentWeeks.map((week, index) => (
                  <div
                    key={`${week.year}-${week.week}`}
                    className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                      week.completedDays >= 5 ? 'bg-green-500 text-white' :
                      week.completedDays >= 4 ? 'bg-yellow-500 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}
                    title={`Semana ${week.week}: ${week.completedDays}/7 días`}
                  >
                    {week.completedDays}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                🎯 Objetivo: 4 semanas seguidas con 5+ días O 6 semanas con 4+ días
              </div>
            </div>
          </div>
        )}
        
        {todayCompleted && !isConsolidated && (
          <Badge className="w-full justify-center bg-green-500">
            ✅ Completado hoy
          </Badge>
        )}

        {isConsolidated && (
          <div className="bg-green-100 p-3 rounded-lg border border-green-300">
            <div className="text-center">
              <Trophy className="w-6 h-6 mx-auto text-green-600 mb-2" />
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