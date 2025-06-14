import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle, XCircle, Target } from 'lucide-react';

interface HabitTracking {
  habitId: string;
  date: string;
  completed: boolean;
}

interface HabitTrackerProps {
  habitId: string;
  habitName: string;
  isActive: boolean;
}

const HabitTracker = ({ habitId, habitName, isActive }: HabitTrackerProps) => {
  const [trackingData, setTrackingData] = useState<HabitTracking[]>([]);
  const [todayCompleted, setTodayCompleted] = useState(false);

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
  }, [habitId]);

  const toggleToday = () => {
    const today = new Date().toISOString();
    const todayString = new Date().toDateString();
    
    const updatedData = trackingData.filter(entry => 
      new Date(entry.date).toDateString() !== todayString
    );
    
    const newEntry: HabitTracking = {
      habitId,
      date: today,
      completed: !todayCompleted
    };
    
    updatedData.push(newEntry);
    
    setTrackingData(updatedData);
    setTodayCompleted(!todayCompleted);
    localStorage.setItem(`habit-tracking-${habitId}`, JSON.stringify(updatedData));
  };

  const getWeeklyProgress = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weekData = trackingData.filter(entry => 
      new Date(entry.date) >= oneWeekAgo && entry.completed
    );
    
    return (weekData.length / 7) * 100;
  };

  const getStreak = () => {
    const sortedData = [...trackingData]
      .filter(entry => entry.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let streak = 0;
    let currentDate = new Date();
    
    for (const entry of sortedData) {
      const entryDate = new Date(entry.date);
      const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  if (!isActive) return null;

  const weeklyProgress = getWeeklyProgress();
  const currentStreak = getStreak();

  return (
    <Card className="mt-3 bg-blue-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Seguimiento de {habitName}
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
        
        {todayCompleted && (
          <Badge className="w-full justify-center bg-green-500">
            ✅ Completado hoy
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default HabitTracker;