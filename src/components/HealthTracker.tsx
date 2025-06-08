
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { healthCategories, HealthCategoryKey } from './HealthCategories';
import { calculateHealthProgress, getCurrentValue, getChartData } from './healthData';
import HealthProgress from './HealthProgress';
import HealthChart from './HealthChart';

interface HealthTrackerProps {
  startDate: Date | null;
}

const HealthTracker = ({ startDate }: HealthTrackerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<HealthCategoryKey>('respiratory');

  const daysSince = useMemo(() => {
    if (!startDate) return 0;
    return Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  }, [startDate]);

  const healthData = calculateHealthProgress(daysSince);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-center text-green-700">
            📊 Tu Recuperación de Salud
          </CardTitle>
          <p className="text-center text-gray-600">
            Día {daysSince} - Progreso basado en estudios médicos sobre recuperación post-vapeo
          </p>
        </CardHeader>
      </Card>

      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as HealthCategoryKey)}>
        <TabsList className="grid w-full grid-cols-5 bg-white">
          {Object.entries(healthCategories).map(([key, cat]) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              <span className="mr-1">{cat.icon}</span>
              <span className="hidden sm:inline">{cat.title.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(healthCategories).map(([key]) => {
          const categoryKey = key as HealthCategoryKey;
          const currentData = getCurrentValue(categoryKey, daysSince, healthData);
          const chartData = getChartData(categoryKey, daysSince, healthData);
          
          return (
            <TabsContent key={key} value={key}>
              <div className="grid gap-4 md:grid-cols-2">
                <HealthProgress 
                  category={categoryKey}
                  currentData={currentData}
                  daysSince={daysSince}
                  healthData={healthData}
                />
                
                <HealthChart 
                  category={categoryKey}
                  chartData={chartData}
                  daysSince={daysSince}
                />
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default HealthTracker;
