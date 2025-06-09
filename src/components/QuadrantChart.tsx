
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface QuadrantData {
  day: number;
  date: string;
  energy: number;
  valence: number;
  emotions: string;
}

interface QuadrantChartProps {
  data: QuadrantData[];
}

const QuadrantChart = ({ data }: QuadrantChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Mapa Emocional</CardTitle>
        <p className="text-xs sm:text-sm text-gray-600">
          Cada punto representa un día. Actividad vs Positividad
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-60 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number"
                dataKey="valence"
                domain={[-1.2, 1.2]}
                tickFormatter={(value) => value > 0 ? 'Positivo' : value < 0 ? 'Negativo' : ''}
                fontSize={10}
              />
              <YAxis 
                type="number"
                dataKey="energy"
                domain={[-1.2, 1.2]}
                tickFormatter={(value) => value > 0 ? 'Activo' : value < 0 ? 'Tranquilo' : ''}
                fontSize={10}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [value.toFixed(2), name]}
                labelFormatter={() => ''}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 sm:p-3 border rounded shadow-lg text-xs sm:text-sm">
                        <p className="font-semibold">Día {data.day}</p>
                        <p className="text-gray-600">{data.date}</p>
                        <p className="text-xs">{data.emotions}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine x={0} stroke="#666" strokeDasharray="5 5" />
              <ReferenceLine y={0} stroke="#666" strokeDasharray="5 5" />
              <Scatter
                dataKey="energy"
                fill="#3B82F6"
                fillOpacity={0.7}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuadrantChart;
