
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmotionLogger from '@/components/EmotionLogger';
import HealthTracker from '@/components/HealthTracker';
import AchievementsList from '@/components/AchievementsList';
import HistoryView from '@/components/HistoryView';
import SettingsPanel from '@/components/SettingsPanel';
import SetupModal from '@/components/SetupModal';
import { Clock, Trophy, Heart, Calendar, Settings } from 'lucide-react';

const Index = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Verificar si existe fecha de inicio guardada
  useEffect(() => {
    const savedStartDate = localStorage.getItem('vaping-quit-date');
    if (savedStartDate) {
      setStartDate(new Date(savedStartDate));
    } else {
      setShowSetup(true);
    }
  }, []);

  // Actualizar tiempo cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSetupComplete = (date: Date) => {
    setStartDate(date);
    localStorage.setItem('vaping-quit-date', date.toISOString());
    setShowSetup(false);
  };

  const calculateTimeSince = () => {
    if (!startDate) return { days: 0, hours: 0, minutes: 0 };
    
    const diff = currentTime.getTime() - startDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  const calculateSavings = () => {
    if (!startDate) return 0;
    const days = Math.floor((currentTime.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    // Estimación: 20€ líquido/semana + 4€ resistencias/10 días
    const dailyCost = (20/7) + (4/10);
    return days * dailyCost;
  };

  const time = calculateTimeSince();
  const savings = calculateSavings();
  const progressPercentage = Math.min((time.days / 90) * 100, 100);

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar tu progreso? Se perderán todos los datos.')) {
      localStorage.removeItem('vaping-quit-date');
      localStorage.removeItem('emotion-logs');
      localStorage.removeItem('app-settings');
      setStartDate(null);
      setShowSetup(true);
    }
  };

  if (showSetup) {
    return <SetupModal onComplete={handleSetupComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header con estadísticas principales */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              🌟 Tu Viaje Libre de Vapeo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {time.days} días {time.hours}h {time.minutes}m
              </div>
              <div className="text-xl opacity-90">
                Ahorro estimado: {savings.toFixed(2)}€
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso hacia 90 días</span>
                <span>{progressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={progressPercentage} className="bg-white/20" />
            </div>

            <div className="flex justify-center gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleReset}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Reiniciar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navegación principal */}
        <Tabs defaultValue="emotions" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="emotions" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Emociones
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Salud
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Logros
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Historial
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Ajustes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emotions">
            <EmotionLogger startDate={startDate} />
          </TabsContent>

          <TabsContent value="health">
            <HealthTracker startDate={startDate} />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsList days={time.days} savings={savings} />
          </TabsContent>

          <TabsContent value="history">
            <HistoryView />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
