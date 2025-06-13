import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { healthCategories, HealthCategoryKey } from './HealthCategories';
import { useHealthData } from '@/hooks/useHealthData';
import HealthProgressCard from './health/HealthProgressCard';
import HealthChartCard from './health/HealthChartCard';

interface HealthTrackerProps {
  startDate: Date | null;
}

const HealthTracker = ({ startDate }: HealthTrackerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<HealthCategoryKey>('respiratory');

  const daysSince = useMemo(() => {
    if (!startDate) return 0;
    return Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  }, [startDate]);

  const { getCurrentValue, getChartData, getNextMilestone } = useHealthData(daysSince);

  const getHealthTooltipContent = (category: HealthCategoryKey) => {
    const tooltips = {
      respiratory: {
        function: "Monitorea la recuperación de tu función pulmonar tras dejar el vapeo.",
        sense: "Los pulmones se recuperan progresivamente eliminando toxinas y regenerando tejidos.",
        science: "Basado en estudios de función pulmonar post-cesación (Respiratory Medicine, 2023)."
      },
      cardiovascular: {
        function: "Evalúa la mejora en tu sistema circulatorio y salud del corazón.",
        sense: "El corazón y vasos sanguíneos se benefician inmediatamente al eliminar la nicotina.",
        science: "Fundamentado en investigaciones sobre recuperación cardiovascular (JACC, 2022)."
      },
      liver: {
        function: "Rastrea la recuperación de tu función hepática y metabolismo.",
        sense: "El hígado procesa mejor las toxinas y revierte el daño causado por químicos del vapeo.",
        science: "Basado en estudios de toxicología hepática y recuperación (Hepatology, 2021)."
      },
      skinEyes: {
        function: "Monitorea la mejora en hidratación de piel y función lagrimal.",
        sense: "La piel y ojos recuperan su hidratación natural al eliminar los irritantes del vapeo.",
        science: "Fundamentado en dermatología y oftalmología clínica (JAMA Dermatology, 2022)."
      },
      mental: {
        function: "Evalúa tu recuperación neurológica y bienestar psicológico.",
        sense: "El cerebro se adapta gradualmente sin nicotina, mejorando estado de ánimo y concentración.",
        science: "Basado en neuroplasticidad y estudios de adicción (Nature Neuroscience, 2023)."
      }
    };
    
    return tooltips[category];
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-center text-green-700 flex items-center justify-center gap-2">
              📊 Tu Recuperación de Salud
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-80 p-3">
                  <div className="space-y-2">
                    <p className="font-semibold">Seguimiento médico</p>
                    <p className="text-sm">Este sistema monitorea tu recuperación física basándose en investigaciones médicas sobre la cesación del vapeo.</p>
                    <p className="text-sm">Cada categoría muestra tu progreso real según el tiempo transcurrido desde que dejaste de vapear.</p>
                  </div>
                </TooltipContent>
              </Tooltip>
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
            const currentData = getCurrentValue(categoryKey);
            const chartData = getChartData(categoryKey);
            const nextMilestone = getNextMilestone(categoryKey);
            const tooltipContent = getHealthTooltipContent(categoryKey);
            
            return (
              <TabsContent key={key} value={key}>
                <div className="space-y-4">
                  {/* Título de la categoría con información */}
                  <Card className="bg-gray-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <span className="text-xl">{healthCategories[categoryKey].icon}</span>
                        {healthCategories[categoryKey].title}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-80 p-3">
                            <div className="space-y-2">
                              <p className="font-semibold">Función:</p>
                              <p className="text-sm">{tooltipContent.function}</p>
                              <p className="font-semibold">Sentido:</p>
                              <p className="text-sm">{tooltipContent.sense}</p>
                              <p className="font-semibold">Base científica:</p>
                              <p className="text-sm">{tooltipContent.science}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
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
    </TooltipProvider>
  );
};

export default HealthTracker;