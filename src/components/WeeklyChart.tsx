
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface WeeklyData {
  week: string;
  score: number;
  positive: number;
  negative: number;
}

interface WeeklyChartProps {
  data: WeeklyData[];
}

const WeeklyChart = ({ data }: WeeklyChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Progreso Semanal</CardTitle>
        <p className="text-sm text-gray-600">
          Evolución del estado emocional agrupado por semanas
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="week" 
                fontSize={12}
              />
              <YAxis 
                fontSize={12}
                domain={[-1, 1]}
                tickFormatter={(value) => value > 0 ? 'Buena' : value < 0 ? 'Mala' : 'Neutral'}
              />
              <Tooltip 
                formatter={(value: number) => [
                  value > 0 ? 'Semana Buena' : value < 0 ? 'Semana Mala' : 'Neutral', 
                  'Tendencia'
                ]}
              />
              <ReferenceLine y={0} stroke="#666" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                name="Tendencia semanal"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyChart;
