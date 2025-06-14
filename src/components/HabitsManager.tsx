import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, ExternalLink, Zap } from 'lucide-react';
import { scientificHabits, createHabit, Habit } from '@/data/habitsData';
import PanicButton from './PanicButton';

const HabitsManager = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showPanicButton, setShowPanicButton] = useState(false);

  useEffect(() => {
    const savedHabits = localStorage.getItem('scientific-habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      const initialHabits = scientificHabits.map(createHabit);
      setHabits(initialHabits);
      localStorage.setItem('scientific-habits', JSON.stringify(initialHabits));
    }
  }, []);

  const toggleHabit = (habitId: string) => {
    const updatedHabits = habits.map(habit =>
      habit.id === habitId ? { ...habit, isActive: !habit.isActive } : habit
    );
    setHabits(updatedHabits);
    localStorage.setItem('scientific-habits', JSON.stringify(updatedHabits));
  };

  const activeHabitsCount = habits.filter(h => h.isActive).length;
  const totalHabits = habits.length;
  const activationPercentage = (activeHabitsCount / totalHabits) * 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical': return '💪';
      case 'mental': return '🧠';
      case 'social': return '👥';
      case 'behavioral': return '🔄';
      default: return '⚡';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'physical': return 'Físico';
      case 'mental': return 'Mental';
      case 'social': return 'Social';
      case 'behavioral': return 'Conductual';
      default: return 'General';
    }
  };

  const groupedHabits = habits.reduce((acc, habit) => {
    if (!acc[habit.category]) {
      acc[habit.category] = [];
    }
    acc[habit.category].push(habit);
    return acc;
  }, {} as Record<string, Habit[]>);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header con botón de pánico */}
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-center text-purple-700 flex items-center justify-center gap-2">
              ⚡ Poderío - Hábitos Científicos
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-80 p-3">
                  <div className="space-y-2">
                    <p className="font-semibold">Hábitos Basados en Ciencia</p>
                    <p className="text-sm">Rutinas validadas científicamente para superar la abstinencia de nicotina. Cuantos más actives, mayor será tu fortaleza.</p>
                    <p className="font-semibold">Efectividad:</p>
                    <p className="text-sm">La efectividad aumenta significativamente si combinas 3 o más rutinas (Hajek et al., 2019).</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <p className="text-center text-purple-600">
              Rutinas validadas para superar la abstinencia de nicotina
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Estadísticas y botón de pánico */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/70 p-4 rounded-lg">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-purple-600">
                    {activeHabitsCount}/{totalHabits}
                  </div>
                  <div className="text-sm text-purple-700">hábitos activos</div>
                  <Progress value={activationPercentage} className="h-2" />
                </div>
              </div>
              
              <div className="bg-white/70 p-4 rounded-lg">
                <Button 
                  onClick={() => setShowPanicButton(true)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold"
                  size="lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  🚨 BOTÓN DE PÁNICO
                </Button>
                <p className="text-xs text-center text-gray-600 mt-2">
                  Para momentos de antojo intenso
                </p>
              </div>
            </div>

            {activeHabitsCount >= 3 && (
              <div className="bg-green-100 p-3 rounded-lg border border-green-300">
                <p className="text-sm text-green-800 text-center">
                  🎉 ¡Excelente! Con {activeHabitsCount} hábitos activos tienes una base sólida para el éxito
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hábitos agrupados por categoría */}
        {Object.entries(groupedHabits).map(([category, categoryHabits]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">{getCategoryIcon(category)}</span>
                Hábitos {getCategoryName(category)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryHabits.map((habit) => (
                <Card key={habit.id} className={`${habit.isActive ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xl">{habit.icon}</span>
                          <h3 className="font-semibold text-gray-800">{habit.name}</h3>
                          {habit.isActive && (
                            <Badge className="bg-green-500 text-white">Activo</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{habit.description}</p>
                      </div>
                      
                      <Switch
                        checked={habit.isActive}
                        onCheckedChange={() => toggleHabit(habit.id)}
                        className="ml-4"
                      />
                    </div>

                    {habit.isActive && (
                      <div className="space-y-3 border-t pt-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">📋 Rutina:</h4>
                          <p className="text-sm text-blue-700">{habit.routine}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <h4 className="font-medium text-purple-800 mb-2">🔬 Base Científica:</h4>
                            <p className="text-sm text-purple-700">{habit.scientificBasis}</p>
                          </div>
                          
                          <div className="bg-orange-50 p-3 rounded-lg">
                            <h4 className="font-medium text-orange-800 mb-2">💨 Ajuste para Vapeo:</h4>
                            <p className="text-sm text-orange-700">{habit.vapeAdjustment}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Referencia: {habit.reference}</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Ver estudio
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Información final */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h4 className="font-semibold text-amber-800">💡 Clave del Éxito</h4>
              <p className="text-sm text-amber-700">
                Todos los hábitos están validados para abstinencia de nicotina en vapeadores. 
                La efectividad aumenta si combinas ≥3 rutinas.
              </p>
              <p className="text-xs text-amber-600">
                Fuente: Hajek et al., 2019 - Estudios específicos sobre cesación de vapeo
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Botón de pánico modal */}
        <PanicButton 
          isOpen={showPanicButton}
          onClose={() => setShowPanicButton(false)}
        />
      </div>
    </TooltipProvider>
  );
};

export default HabitsManager;