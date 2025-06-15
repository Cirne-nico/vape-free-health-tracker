import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipHelper } from '@/components/ui/tooltip-helper';
import { ExternalLink } from 'lucide-react';
import { scientificHabits, createHabit, Habit } from '@/data/habitsData';
import HabitTracker from './habits/HabitTracker';
import { useTranslation } from 'react-i18next';

const HabitsManager = () => {
  const { t } = useTranslation();
  const [habits, setHabits] = useState<Habit[]>([]);

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

  // Hábitos que necesitan seguimiento
  const trackableHabits = ['daily_exercise', 'strict_sleep_schedule', 'social_commitment', 'nature_walks', 'programmed_hydration'];

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
    return t(`habitsManager.categories.${category}`, category);
  };

  const groupedHabits = habits.reduce((acc, habit) => {
    if (!acc[habit.category]) {
      acc[habit.category] = [];
    }
    acc[habit.category].push(habit);
    return acc;
  }, {} as Record<string, Habit[]>);

  // Función para obtener la URL del estudio científico
  const getStudyUrl = (reference: string) => {
    // Mapeo de referencias a URLs reales
    const referenceUrls: Record<string, string> = {
      'Taylor et al., 2007': 'https://pubmed.ncbi.nlm.nih.gov/17454548/',
      'Zope & Zope, 2013': 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3573542/',
      'Jaehne et al., 2009': 'https://pubmed.ncbi.nlm.nih.gov/19345999/',
      'Spring et al., 2008': 'https://pubmed.ncbi.nlm.nih.gov/18426563/',
      'American Lung Association': 'https://www.lung.org/quit-smoking/smoking-facts/health-effects/what-happens-when-you-quit',
      'Bratman et al., 2015': 'https://www.pnas.org/doi/10.1073/pnas.1510459112',
      'Stead et al., 2017': 'https://pubmed.ncbi.nlm.nih.gov/28417491/',
      'Bowen & Marlatt, 2009': 'https://pubmed.ncbi.nlm.nih.gov/19586163/',
      'NIH/NIDA': 'https://nida.nih.gov/publications/research-reports/tobacco-nicotine-e-cigarettes/nicotine-addictive'
    };

    return referenceUrls[reference] || '#';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center text-purple-700 flex items-center justify-center gap-2">
            ⚡ {t('habitsManager.title')}
            <TooltipHelper
              content={
                <div className="space-y-2 max-w-[250px]">
                  <p className="font-semibold">{t('habitsManager.tooltip.title')}</p>
                  <p className="text-sm">{t('habitsManager.tooltip.description')}</p>
                  <p className="font-semibold">{t('habitsManager.effectiveness')}</p>
                  <p className="text-sm">{t('habitsManager.tooltip.effectiveness')}</p>
                </div>
              }
            />
          </CardTitle>
          <p className="text-center text-purple-600">
            {t('habitsManager.subtitle')}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Estadísticas */}
          <div className="bg-white/70 p-4 rounded-lg">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-600">
                {activeHabitsCount}/{totalHabits}
              </div>
              <div className="text-sm text-purple-700">{t('habitsManager.stats.activeHabits')}</div>
              <Progress value={activationPercentage} className="h-2" />
            </div>
          </div>

          {activeHabitsCount >= 3 && (
            <div className="bg-green-100 p-3 rounded-lg border border-green-300">
              <p className="text-sm text-green-800 text-center">
                {t('habitsManager.stats.excellent', { count: activeHabitsCount })}
              </p>
            </div>
          )}

          <div className="bg-blue-100 p-3 rounded-lg border border-blue-300">
            <p className="text-sm text-blue-800 text-center">
              {t('habitsManager.stats.tip')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hábitos agrupados por categoría */}
      {Object.entries(groupedHabits).map(([category, categoryHabits]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">{getCategoryIcon(category)}</span>
              {t('habitsManager.categoryTitle', { category: getCategoryName(category) })}
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
                          <Badge className="bg-green-500 text-white">
                            {t('habitsManager.habitCard.active')}
                          </Badge>
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
                        <h4 className="font-medium text-blue-800 mb-2">{t('habitsManager.habitCard.routine')}</h4>
                        <p className="text-sm text-blue-700">{habit.routine}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <h4 className="font-medium text-purple-800 mb-2">{t('habitsManager.habitCard.scientificBasis')}</h4>
                          <p className="text-sm text-purple-700">{habit.scientificBasis}</p>
                        </div>
                        
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <h4 className="font-medium text-orange-800 mb-2">{t('habitsManager.habitCard.vapeAdjustment')}</h4>
                          <p className="text-sm text-orange-700">{habit.vapeAdjustment}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{t('habitsManager.habitCard.reference')} {habit.reference}</span>
                        <a 
                          href={getStudyUrl(habit.reference)} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          {t('habitsManager.habitCard.viewStudy')}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Seguimiento para hábitos específicos */}
                  {trackableHabits.includes(habit.id) && (
                    <HabitTracker 
                      habitId={habit.id}
                      habitName={habit.shortName}
                      isActive={habit.isActive}
                    />
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
            <h4 className="font-semibold text-amber-800">💡 {t('habitsManager.successKey.title')}</h4>
            <p className="text-sm text-amber-700">
              {t('habitsManager.successKey.description')}
            </p>
            <p className="text-xs text-amber-600">
              {t('habitsManager.successKey.source')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitsManager;