
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const HistoryView = () => {
  const [emotionLogs, setEmotionLogs] = useState<any[]>([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('emotion-logs') || '[]');
    setEmotionLogs(logs.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);

  const emotionTypes = {
    euphoric: { text: 'Eufórico', type: 'positive', color: '#22C55E' },
    happy: { text: 'Alegre', type: 'positive', color: '#10B981' },
    calm: { text: 'Tranquilo', type: 'positive', color: '#3B82F6' },
    neutral: { text: 'Neutral', type: 'neutral', color: '#6B7280' },
    irritable: { text: 'Irritable', type: 'negative', color: '#F97316' },
    sad: { text: 'Triste', type: 'negative', color: '#EF4444' },
    depressed: { text: 'Deprimido', type: 'negative', color: '#DC2626' },
    disgusted: { text: 'Disgusto', type: 'negative', color: '#8B5CF6' },
  };

  const getEmotionBalance = () => {
    const balance = emotionLogs.map(log => {
      const positiveCount = log.emotions.filter((id: string) => 
        ['euphoric', 'happy', 'calm'].includes(id)
      ).length;
      const negativeCount = log.emotions.filter((id: string) => 
        ['irritable', 'sad', 'depressed', 'disgusted'].includes(id)
      ).length;
      const neutralCount = log.emotions.filter((id: string) => id === 'neutral').length;
      
      const total = positiveCount + negativeCount + neutralCount;
      
      return {
        date: new Date(log.date).toLocaleDateString(),
        day: log.day,
        positive: total > 0 ? Math.round((positiveCount / total) * 100) : 0,
        negative: total > 0 ? Math.round((negativeCount / total) * 100) : 0,
        neutral: total > 0 ? Math.round((neutralCount / total) * 100) : 0
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

  const emotionBalance = getEmotionBalance();
  const emotionDistribution = getEmotionDistribution();

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
                {emotionBalance.filter(b => b.positive > b.negative).length}
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

      {/* Gráficas */}
      {emotionBalance.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          
          {/* Balance emocional en el tiempo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Balance Emocional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
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
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                      labelFormatter={(value) => `Día ${value}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="positive"
                      stroke="#22C55E"
                      strokeWidth={2}
                      name="Positivo"
                    />
                    <Line
                      type="monotone"
                      dataKey="negative"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name="Negativo"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Distribución de emociones */}
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
        </div>
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
