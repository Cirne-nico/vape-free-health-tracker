
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface HealthTrackerProps {
  startDate: Date | null;
}

const HealthTracker = ({ startDate }: HealthTrackerProps) => {
  const [selectedCategory, setSelectedCategory] = useState('respiratory');

  const calculateHealthProgress = (days: number) => {
    // Datos basados en estudios sobre recuperación post-vapeo
    const respiratory = [
      { day: 0, value: 0, description: "Punto de partida" },
      { day: 1, value: 5, description: "Reducción inicial de irritación" },
      { day: 3, value: 15, description: "Menos tos matutina" },
      { day: 7, value: 25, description: "Mejora notable en respiración" },
      { day: 14, value: 40, description: "Capacidad pulmonar aumenta" },
      { day: 30, value: 60, description: "Función ciliar mejorada" },
      { day: 60, value: 80, description: "Resistencia física notable" },
      { day: 90, value: 90, description: "Recuperación casi completa" },
      { day: 180, value: 95, description: "Función pulmonar normalizada" }
    ];

    const cardiovascular = [
      { day: 0, value: 0, description: "Frecuencia cardíaca elevada" },
      { day: 1, value: 10, description: "Estabilización inicial" },
      { day: 7, value: 30, description: "Presión arterial mejora" },
      { day: 14, value: 50, description: "Circulación optimizada" },
      { day: 30, value: 70, description: "Riesgo cardiovascular reducido" },
      { day: 60, value: 85, description: "Función cardíaca normalizada" },
      { day: 90, value: 92, description: "Salud cardiovascular óptima" }
    ];

    const liver = [
      { day: 0, value: 0, description: "Valores ALT/GGT elevados" },
      { day: 7, value: 15, description: "Reducción de inflamación" },
      { day: 14, value: 25, description: "Procesamiento mejorado" },
      { day: 30, value: 45, description: "Valores ALT normalizándose" },
      { day: 60, value: 70, description: "Función hepática mejorada" },
      { day: 90, value: 85, description: "Hígado graso en regresión" },
      { day: 180, value: 95, description: "Función hepática óptima" }
    ];

    const skinEyes = [
      { day: 0, value: 0, description: "Sequedad e irritación" },
      { day: 3, value: 15, description: "Hidratación inicial" },
      { day: 7, value: 30, description: "Menos sequedad ocular" },
      { day: 14, value: 50, description: "Elasticidad de piel mejora" },
      { day: 30, value: 70, description: "Producción de lágrimas normalizada" },
      { day: 60, value: 85, description: "Piel visiblemente más saludable" },
      { day: 90, value: 92, description: "Hidratación óptima" }
    ];

    const mental = [
      { day: 0, value: 0, description: "Ansiedad e irritabilidad" },
      { day: 1, value: 5, description: "Primeros síntomas de abstinencia" },
      { day: 3, value: 10, description: "Pico de ansiedad" },
      { day: 7, value: 25, description: "Estabilización emocional" },
      { day: 14, value: 45, description: "Mejor calidad del sueño" },
      { day: 30, value: 65, description: "Concentración mejorada" },
      { day: 60, value: 80, description: "Estabilidad emocional" },
      { day: 90, value: 90, description: "Bienestar mental óptimo" }
    ];

    return {
      respiratory,
      cardiovascular,
      liver,
      skinEyes,
      mental
    };
  };

  const daysSince = useMemo(() => {
    if (!startDate) return 0;
    return Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  }, [startDate]);

  const healthData = calculateHealthProgress(daysSince);

  const getCurrentValue = (category: keyof typeof healthData) => {
    const data = healthData[category];
    const currentPoint = data.reduce((prev, curr) => 
      curr.day <= daysSince ? curr : prev
    , data[0]);
    
    // Interpolación para días intermedios
    const nextPoint = data.find(point => point.day > daysSince);
    if (nextPoint && currentPoint) {
      const daysSincePoint = daysSince - currentPoint.day;
      const daysBetweenPoints = nextPoint.day - currentPoint.day;
      const interpolationFactor = daysSincePoint / daysBetweenPoints;
      const interpolatedValue = currentPoint.value + 
        (nextPoint.value - currentPoint.value) * interpolationFactor;
      
      return {
        value: Math.round(interpolatedValue),
        description: currentPoint.description
      };
    }
    
    return currentPoint;
  };

  const getChartData = (category: keyof typeof healthData) => {
    return healthData[category]
      .filter(point => point.day <= Math.max(daysSince + 7, 30))
      .map(point => ({
        ...point,
        dayLabel: point.day === 0 ? 'Inicio' : `Día ${point.day}`
      }));
  };

  const categories = {
    respiratory: {
      title: 'Sistema Respiratorio',
      icon: '🫁',
      description: 'Capacidad pulmonar y función respiratoria',
      color: '#3B82F6'
    },
    cardiovascular: {
      title: 'Sistema Cardiovascular', 
      icon: '❤️',
      description: 'Presión arterial y función cardíaca',
      color: '#EF4444'
    },
    liver: {
      title: 'Salud Hepática',
      icon: '🔶',
      description: 'Función hepática y valores ALT/GGT',
      color: '#F59E0B'
    },
    skinEyes: {
      title: 'Piel y Ojos',
      icon: '👁️',
      description: 'Hidratación y salud dermatológica',
      color: '#10B981'
    },
    mental: {
      title: 'Bienestar Mental',
      icon: '🧠',
      description: 'Estabilidad emocional y calidad del sueño',
      color: '#8B5CF6'
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-center text-green-700">
            📊 Tu Recuperación de Salud
          </CardTitle>
          <p className="text-center text-gray-600">
            Día {daysSince} - Progreso acumulativo de mejora en salud
          </p>
        </CardHeader>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5 bg-white">
          {Object.entries(categories).map(([key, cat]) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              <span className="mr-1">{cat.icon}</span>
              <span className="hidden sm:inline">{cat.title.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(categories).map(([key, category]) => {
          const currentData = getCurrentValue(key as keyof typeof healthData);
          const chartData = getChartData(key as keyof typeof healthData);
          
          return (
            <TabsContent key={key} value={key}>
              <div className="grid gap-4 md:grid-cols-2">
                
                {/* Panel de progreso actual */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold" style={{ color: category.color }}>
                        {currentData.value}%
                      </div>
                      <div className="text-sm text-gray-600">recuperación actual</div>
                    </div>
                    
                    <Progress 
                      value={currentData.value} 
                      className="h-3"
                    />
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">
                        Estado actual:
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentData.description}
                      </p>
                    </div>

                    {/* Próximo hito */}
                    {(() => {
                      const nextMilestone = healthData[key as keyof typeof healthData]
                        .find(point => point.day > daysSince);
                      if (nextMilestone) {
                        return (
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="text-sm font-medium text-blue-700">
                              Próximo hito (Día {nextMilestone.day}):
                            </p>
                            <p className="text-sm text-blue-600">
                              {nextMilestone.description}
                            </p>
                            <p className="text-xs text-blue-500 mt-1">
                              En {nextMilestone.day - daysSince} días
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </CardContent>
                </Card>

                {/* Gráfica de progreso */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Evolución Temporal</CardTitle>
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
                            stroke={category.color}
                            fill={category.color}
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                          {/* Línea vertical para día actual */}
                          {chartData.map((point, index) => {
                            if (point.day === daysSince || 
                                (index > 0 && chartData[index-1].day < daysSince && point.day > daysSince)) {
                              return (
                                <Line
                                  key={`current-${index}`}
                                  type="monotone"
                                  dataKey={() => null}
                                  stroke="#FF6B6B"
                                  strokeWidth={2}
                                  strokeDasharray="5 5"
                                />
                              );
                            }
                            return null;
                          })}
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-2 text-xs text-center text-gray-500">
                      La línea muestra tu progreso acumulativo de recuperación
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default HealthTracker;
