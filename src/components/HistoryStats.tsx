
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HistoryStatsProps {
  totalLogs: number;
  positiveDays: number;
  negativeDays: number;
  onExport: () => void;
}

const HistoryStats = ({ totalLogs, positiveDays, negativeDays, onExport }: HistoryStatsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>📊 Historial Emocional</CardTitle>
        <Button onClick={onExport} variant="outline" size="sm">
          Exportar Datos
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {totalLogs}
            </div>
            <div className="text-sm text-gray-600">registros totales</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {positiveDays}
            </div>
            <div className="text-sm text-gray-600">días agradables</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {negativeDays}
            </div>
            <div className="text-sm text-gray-600">días desagradables</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryStats;
