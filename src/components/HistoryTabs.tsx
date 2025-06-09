
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import EvolutionChart from './EvolutionChart';
import QuadrantChart from './QuadrantChart';
import WeeklyChart from './WeeklyChart';
import DistributionChart from './DistributionChart';

interface HistoryTabsProps {
  emotionBalance: any[];
  quadrantData: any[];
  weeklyData: any[];
  emotionDistribution: any[];
}

const HistoryTabs = ({ emotionBalance, quadrantData, weeklyData, emotionDistribution }: HistoryTabsProps) => {
  if (emotionBalance.length === 0) {
    return null;
  }

  const getTabTooltip = (tab: string) => {
    const tooltips = {
      evolution: {
        title: "Evolución día a día",
        description: "Muestra cómo ha cambiado tu balance emocional general a lo largo del tiempo.",
        science: "Basado en análisis de series temporales en psicología longitudinal."
      },
      quadrants: {
        title: "Mapa emocional",
        description: "Visualiza tus emociones en un espacio bidimensional de valencia (positiva/negativa) y activación (alta/baja energía).",
        science: "Basado en el modelo circumplejo de Russell (1980) para clasificación emocional."
      },
      weekly: {
        title: "Resumen semanal",
        description: "Agrupa tus datos por semanas para identificar patrones y tendencias a medio plazo.",
        science: "Análisis de agregación temporal usado en investigación de bienestar subjetivo."
      },
      distribution: {
        title: "Frecuencia de emociones",
        description: "Muestra qué emociones específicas experimentas con mayor frecuencia.",
        science: "Análisis de frecuencias basado en taxonomías emocionales de Ekman y Plutchik."
      }
    };
    return tooltips[tab as keyof typeof tooltips];
  };

  return (
    <TooltipProvider>
      <Tabs defaultValue="evolution" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white shadow-sm p-2 mb-16 h-auto">
          <TabsTrigger 
            value="evolution" 
            className="flex flex-col items-center gap-1 p-2 text-xs min-h-12 leading-tight text-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <span className="font-medium">Evolución</span>
            <span className="text-[10px] opacity-75">Día a día</span>
          </TabsTrigger>
          <TabsTrigger 
            value="quadrants" 
            className="flex flex-col items-center gap-1 p-2 text-xs min-h-12 leading-tight text-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <span className="font-medium">Mapa</span>
            <span className="text-[10px] opacity-75">Emocional</span>
          </TabsTrigger>
          <TabsTrigger 
            value="weekly" 
            className="flex flex-col items-center gap-1 p-2 text-xs min-h-12 leading-tight text-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <span className="font-medium">Resumen</span>
            <span className="text-[10px] opacity-75">Semanal</span>
          </TabsTrigger>
          <TabsTrigger 
            value="distribution" 
            className="flex flex-col items-center gap-1 p-2 text-xs min-h-12 leading-tight text-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <span className="font-medium">Frecuencia</span>
            <span className="text-[10px] opacity-75">Emociones</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="evolution" className="mt-16">
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                📈 Evolución Emocional
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-3">
                    <div className="space-y-2">
                      <p className="font-semibold">{getTabTooltip('evolution').title}</p>
                      <p className="text-sm">{getTabTooltip('evolution').description}</p>
                      <p className="font-semibold">Base científica:</p>
                      <p className="text-sm">{getTabTooltip('evolution').science}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
          </Card>
          <EvolutionChart data={emotionBalance} />
        </TabsContent>

        <TabsContent value="quadrants" className="mt-16">
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                🎯 Mapa Emocional
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-3">
                    <div className="space-y-2">
                      <p className="font-semibold">{getTabTooltip('quadrants').title}</p>
                      <p className="text-sm">{getTabTooltip('quadrants').description}</p>
                      <p className="font-semibold">Base científica:</p>
                      <p className="text-sm">{getTabTooltip('quadrants').science}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
          </Card>
          <QuadrantChart data={quadrantData} />
        </TabsContent>

        <TabsContent value="weekly" className="mt-16">
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                📅 Resumen Semanal
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-3">
                    <div className="space-y-2">
                      <p className="font-semibold">{getTabTooltip('weekly').title}</p>
                      <p className="text-sm">{getTabTooltip('weekly').description}</p>
                      <p className="font-semibold">Base científica:</p>
                      <p className="text-sm">{getTabTooltip('weekly').science}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
          </Card>
          <WeeklyChart data={weeklyData} />
        </TabsContent>

        <TabsContent value="distribution" className="mt-16">
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                📊 Frecuencia de Emociones
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm p-3">
                    <div className="space-y-2">
                      <p className="font-semibold">{getTabTooltip('distribution').title}</p>
                      <p className="text-sm">{getTabTooltip('distribution').description}</p>
                      <p className="font-semibold">Base científica:</p>
                      <p className="text-sm">{getTabTooltip('distribution').science}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
          </Card>
          <DistributionChart data={emotionDistribution} />
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
};

export default HistoryTabs;
