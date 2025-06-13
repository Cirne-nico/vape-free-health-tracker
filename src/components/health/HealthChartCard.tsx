import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { HealthCategoryKey, healthCategories } from '@/components/HealthCategories';

interface HealthChartCardProps {
  category: HealthCategoryKey;
  chartData: any[];
  daysSince: number;
}

const HealthChartCard = ({ category, chartData, daysSince }: HealthChartCardProps) => {
  const categoryData = healthCategories[category];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Evolución hasta Hoy</CardTitle>
        <p className="text-sm text-gray-500">
          Progreso real basado en {daysSince} días de recuperación
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="dayLabel" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                fontSize={12}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Recuperación']}
                labelFormatter={(label) => label}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={categoryData.color}
                fill={categoryData.color}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-2 text-xs text-center text-gray-500">
          Gráfica basada en investigaciones médicas sobre recuperación post-vapeo
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthChartCard;