
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface EvolutionData {
  date: string;
  day: number;
  score: number;
  positive: number;
  negative: number;
}

interface EvolutionChartProps {
  data: EvolutionData[];
}

const EvolutionChart = ({ data }: EvolutionChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Evolución Emocional: Días Buenos vs Malos</CardTitle>
        <p className="text-sm text-gray-600">
          Los valores positivos representan días buenos, los negativos días malos
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                fontSize={12}
                tickFormatter={(value) => `Día ${value}`}
              />
              <YAxis 
                fontSize={12}
                domain={[-1, 1]}
                tickFormatter={(value) => value > 0 ? 'Bueno' : value < 0 ? 'Malo' : 'Neutral'}
              />
              <Tooltip 
                formatter={(value: number) => [
                  value > 0 ? 'Día Bueno' : value < 0 ? 'Día Malo' : 'Neutral', 
                  'Estado'
                ]}
                labelFormatter={(value) => `Día ${value}`}
              />
              <ReferenceLine y={0} stroke="#666" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Estado del día"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvolutionChart;
