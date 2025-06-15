import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TooltipHelper } from '@/components/ui/tooltip-helper';
import { useHealthCategories, HealthCategoryKey } from './HealthCategories';
import { useHealthData } from '@/hooks/useHealthData';
import { useTranslation } from 'react-i18next';
import HealthProgressCard from './health/HealthProgressCard';
import HealthChartCard from './health/HealthChartCard';

interface HealthTrackerProps {
  startDate: Date | null;
}

const HealthTracker = ({ startDate }: HealthTrackerProps) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<HealthCategoryKey>('respiratory');
  const healthCategories = useHealthCategories();

  const daysSince = useMemo(() => {
    if (!startDate) return 0;
    return Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  }, [startDate]);

  const { getCurrentValue, getChartData, getNextMilestone } = useHealthData(daysSince);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-center text-green-700 flex items-center justify-center gap-2">
            📊 {t('healthTracker.title')}
            <TooltipHelper
              content={
                <div className="space-y-2">
                  <p className="font-semibold">{t('healthTracker.tooltip.title')}</p>
                  <p className="text-sm">{t('healthTracker.tooltip.description')}</p>
                  <p className="text-sm">{t('healthTracker.tooltip.detail')}</p>
                </div>
              }
            />
          </CardTitle>
          <p className="text-center text-gray-600">
            {t('healthTracker.dayProgress', { days: daysSince })}
          </p>
        </CardHeader>
      </Card>

      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as HealthCategoryKey)}>
        <TabsList className="grid w-full grid-cols-5 bg-white">
          {Object.entries(healthCategories).map(([key, cat]) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              <span className="mr-1">{cat.icon}</span>
              <span className="hidden sm:inline">{cat.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(healthCategories).map(([key]) => {
          const categoryKey = key as HealthCategoryKey;
          const currentData = getCurrentValue(categoryKey);
          const chartData = getChartData(categoryKey);
          const nextMilestone = getNextMilestone(categoryKey);
          
          return (
            <TabsContent key={key} value={key}>
              <div className="space-y-4">
                <Card className="bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span className="text-xl">{healthCategories[categoryKey].icon}</span>
                      {healthCategories[categoryKey].title}
                      <TooltipHelper
                        content={
                          <div className="space-y-2">
                            <p className="font-semibold">{t('healthTracker.categories.function')}:</p>
                            <p className="text-sm">{t(`healthTracker.categories.${categoryKey}.tooltip.function`)}</p>
                            <p className="font-semibold">{t('healthTracker.categories.sense')}:</p>
                            <p className="text-sm">{t(`healthTracker.categories.${categoryKey}.tooltip.sense`)}</p>
                            <p className="font-semibold">{t('healthTracker.categories.science')}:</p>
                            <p className="text-sm">{t(`healthTracker.categories.${categoryKey}.tooltip.science`)}</p>
                          </div>
                        }
                      />
                    </CardTitle>
                  </CardHeader>
                </Card>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <HealthProgressCard 
                    category={categoryKey}
                    currentData={currentData}
                    nextMilestone={nextMilestone}
                    daysSince={daysSince}
                  />
                  
                  <HealthChartCard 
                    category={categoryKey}
                    chartData={chartData}
                    daysSince={daysSince}
                  />
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default HealthTracker;