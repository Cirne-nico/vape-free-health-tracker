
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  return (
    <Tabs defaultValue="evolution" className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white shadow-sm p-1 mb-16">
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
        <EvolutionChart data={emotionBalance} />
      </TabsContent>

      <TabsContent value="quadrants" className="mt-16">
        <QuadrantChart data={quadrantData} />
      </TabsContent>

      <TabsContent value="weekly" className="mt-16">
        <WeeklyChart data={weeklyData} />
      </TabsContent>

      <TabsContent value="distribution" className="mt-16">
        <DistributionChart data={emotionDistribution} />
      </TabsContent>
    </Tabs>
  );
};

export default HistoryTabs;
