
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, ReferenceLine } from 'recharts';

const HistoryView = () => {
  const [emotionLogs, setEmotionLogs] = useState<any[]>([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('emotion-logs') || '[]');
    setEmotionLogs(logs.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const emotionTypes = {
    euphoric: { text: 'Eufórico', type: 'positive', color: '#22C55E', energy: 1, valence: 1 },
    happy: { text: 'Alegre', type: 'positive', color: '#10B981', energy: 1, valence: 1 },
    calm: { text: 'Tranquilo', type: 'positive', color: '#3B82F6', energy: -1, valence: 1 },
    proud: { text: 'Orgulloso', type: 'positive', color: '#8B5CF6', energy: 0.5, valence: 1 },
    hopeful: { text: 'Esperanzado', type: 'positive', color: '#F59E0B', energy: 0.5, valence: 1 },
    motivated: { text: 'Motivado', type: 'positive', color: '#6366F1', energy: 1, valence: 1 },
    relaxed: { text: 'Relajado', type: 'positive', color: '#14B8A6', energy: -1, valence: 1 },
    satisfied: { text: 'Satisfecho', type: 'positive', color: '#059669', energy: -0.5, valence: 1 },
    optimistic: { text: 'Optimista', type: 'positive', color: '#EC4899', energy: 0.5, valence: 1 },
    neutral: { text: 'Neutral', type: 'neutral', color: '#6B7280', energy: 0, valence: 0 },
    irritable: { text: 'Irritable', type: 'negative', color: '#F97316', energy: 1, valence: -1 },
    sad: { text: 'Triste', type: 'negative', color: '#EF4444', energy: -0.5, valence: -1 },
    depressed: { text: 'Deprimido', type: 'negative', color: '#DC2626', energy: -1, valence: -1 },
    disgusted: { text: 'Disgusto', type: 'negative', color: '#8B5CF6', energy: -0.5, valence: -1 },
    anxious: { text: 'Ansioso', type: 'negative', color: '#CA8A04', energy: 0.5, valence: -1 },
    frustrated: { text: 'Frustrado', type: 'negative', color: '#DC2626', energy: 0.5, valence: -1 },
    craving: { text: 'Con antojos', type: 'negative', color: '#EA580C', energy: 0.5, valence: -1 },
    overwhelmed: { text: 'Abrumado', type: 'negative', color: '#B91C1C', energy: 1, valence: -1 },
    restless: { text: 'Inquieto', type: 'negative', color: '#FB923C', energy: 1, valence: -1 },
    foggy: { text: 'Confuso', type: 'negative', color: '#6B7280', energy: -0.5, valence: -1 }
  };

  const getEmotionBalance = () => {
    const balance = emotionLogs.map(log => {
      const positiveCount = log.emotions.filter((id: string) => 
        emotionTypes[id as keyof typeof emotionTypes]?.type === 'positive'
      ).length;
      const negativeCount = log.emotions.filter((id: string) => 
        emotionTypes[id as keyof typeof emotionTypes]?.type === 'negative'
      ).length;
      
      // Lógica de jerarquía: alegría/euforia > cualquier negativa
      const hasStrongPositive = log.emotions.some((id: string) => ['euphoric', 'happy'].includes(id));
      const hasNegative = negativeCount > 0;
      
      let dayScore = 0;
      if (hasStrongPositive) {
        dayScore = 1; // Día positivo
      } else if (positiveCount > negativeCount) {
        dayScore = 1; // Mayoría positiva
      } else if (negativeCount > positiveCount) {
        dayScore = -1; // Día negativo
      }
      
      return {
        date: new Date(log.date).toLocaleDateString(),
        day: log.day,
        score: dayScore,
        positive: positiveCount,
        negative: negativeCount
      };
    }).reverse();

    return balance;
  };

  const getEmotionDistribution = () => {
    const distribution: { [key: string]: number } = {};
    
    emotionLogs.forEach(log => {
      log.emotions.forEach((emotionId: string) => {
        distribution[emotionId] = (distribution[emotionId] || 0) + 1;
      });
    });

    return Object.entries(distribution).map(([emotionId, count]) => ({
      name: emotionTypes[emotionId as keyof typeof emotionTypes]?.text || emotionId,
      value: count,
      color: emotionTypes[emotionId as keyof typeof emotionTypes]?.color || '#6B7280'
    }));
  };

  const getQuadrantData = () => {
    return emotionLogs.map(log => {
      // Calcular promedio de energía y valencia para el día
      let totalEnergy = 0;
      let totalValence = 0;
      let count = 0;

      log.emotions.forEach((emotionId: string) => {
        const emotion = emotionTypes[emotionId as keyof typeof emotionTypes];
        if (emotion && emotion.type !== 'neutral') {
          totalEnergy += emotion.energy;
          totalValence += emotion.valence;
          count++;
        }
      });

      if (count === 0) return null;

      return {
        day: log.day,
        date: new Date(log.date).toLocaleDateString(),
        energy: totalEnergy / count,
        valence: totalValence / count,
        emotions: log.emotions.map((id: string) => 
          emotionTypes[id as keyof typeof emotionTypes]?.text
        ).join(', ')
      };
    }).filter(Boolean).reverse();
  };

  const getWeeklyData = () => {
    const weeklyGroups: { [week: number]: any[] } = {};
    
    emotionLogs.forEach(log => {
      const week = Math.floor(log.day / 7) + 1;
      if (!weeklyGroups[week]) weeklyGroups[week] = [];
      weeklyGroups[week].push(log);
    });

    return Object.entries(weeklyGroups).map(([week, logs]) => {
      const positiveCount = logs.reduce((acc, log) => 
        acc + log.emotions.filter((id: string) => 
          emotionTypes[id as keyof typeof emotionTypes]?.type === 'positive'
        ).length, 0
      );
      const negativeCount = logs.reduce((acc, log) => 
        acc + log.emotions.filter((id: string) => 
          emotionTypes[id as keyof typeof emotionTypes]?.type === 'negative'
        ).length, 0
      );

      const total = positiveCount + negativeCount;
      const score = total > 0 ? (positiveCount - negativeCount) / total : 0;

      return {
        week: `Semana ${week}`,
        score: score,
        positive: positiveCount,
        negative: negativeCount
      };
    });
  };

  const emotionBalance = getEmotionBalance();
  const emotionDistribution = getEmotionDistribution();
  const quadrantData = getQuadrantData();
  const weeklyData = getWeeklyData();

  const exportData = () => {
    const dataStr = JSON.stringify(emotionLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'historial-emociones.json';
    link.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Resumen y controles */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>📊 Historial Emocional</CardTitle>
          <Button onClick={exportData} variant="outline" size="sm">
            Exportar Datos
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {emotionLogs.length}
              </div>
              <div className="text-sm text-gray-600">registros totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {emotionBalance.filter(b => b.score > 0).length}
              </div>
              <div className="text-sm text-gray-600">días positivos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {emotionLogs.length > 0 ? Math.max(...emotionLogs.map(l => l.day)) : 0}
              </div>
              <div className="text-sm text-gray-600">día máximo</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pestañas para las diferentes visualizaciones */}
      {emotionBalance.length > 0 && (
        <Tabs defaultValue="evolution" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="evolution">Evolución Bipolar</TabsTrigger>
            <TabsTrigger value="quadrants">4 Cuadrantes</TabsTrigger>
            <TabsTrigger value="weekly">Por Semanas</TabsTrigger>
            <TabsTrigger value="distribution">Distribución</TabsTrigger>
          </TabsList>

          <TabsContent value="evolution">
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
                    <LineChart data={emotionBalance}>
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
          </TabsContent>

          <TabsContent value="quadrants">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mapa Emocional de 4 Cuadrantes</CardTitle>
                <p className="text-sm text-gray-600">
                  Energía vs Valencia. Cada punto representa un día, el tamaño indica la intensidad
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={quadrantData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number"
                        dataKey="valence"
                        domain={[-1.2, 1.2]}
                        tickFormatter={(value) => value > 0 ? 'Positivo' : value < 0 ? 'Negativo' : ''}
                        fontSize={12}
                      />
                      <YAxis 
                        type="number"
                        dataKey="energy"
                        domain={[-1.2, 1.2]}
                        tickFormatter={(value) => value > 0 ? 'Activo' : value < 0 ? 'Tranquilo' : ''}
                        fontSize={12}
                      />
                      <Tooltip 
                        formatter={(value: number, name: string) => [value.toFixed(2), name]}
                        labelFormatter={() => ''}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-3 border rounded shadow-lg">
                                <p className="font-semibold">Día {data.day}</p>
                                <p className="text-sm text-gray-600">{data.date}</p>
                                <p className="text-sm">{data.emotions}</p>
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
                      {/* Etiquetas de cuadrantes */}
                      <text x="85%" y="15%" textAnchor="middle" fontSize={12} fill="#666">
                        Alegre
                      </text>
                      <text x="15%" y="15%" textAnchor="middle" fontSize={12} fill="#666">
                        Sereno
                      </text>
                      <text x="85%" y="90%" textAnchor="middle" fontSize={12} fill="#666">
                        Irritable
                      </text>
                      <text x="15%" y="90%" textAnchor="middle" fontSize={12} fill="#666">
                        Deprimido
                      </text>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
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
                    <LineChart data={weeklyData}>
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
          </TabsContent>

          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribución de Emociones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emotionDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {emotionDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Lista de registros */}
      <Card>
        <CardHeader>
          <CardTitle>Registros Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {emotionLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Aún no tienes registros emocionales.</p>
              <p className="text-sm mt-2">¡Empieza a registrar tus emociones en la pestaña correspondiente!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {emotionLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Día {log.day}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(log.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-400">
                        {log.timestamp}
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {log.emotions.map((emotionId: string, i: number) => {
                        const emotion = emotionTypes[emotionId as keyof typeof emotionTypes];
                        return emotion ? (
                          <Badge 
                            key={i} 
                            style={{ backgroundColor: emotion.color, color: 'white' }}
                            className="text-xs"
                          >
                            {emotion.text}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryView;
