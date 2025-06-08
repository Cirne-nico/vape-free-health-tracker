
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getEmotionById } from '@/data/emotionsData';

interface EmotionLog {
  emotions: string[];
  day: number;
  date: string;
  timestamp: string;
}

interface RecentLogsProps {
  logs: EmotionLog[];
}

const RecentLogs = ({ logs }: RecentLogsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registros Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Aún no tienes registros emocionales.</p>
            <p className="text-sm mt-2">¡Empieza a registrar tus emociones en la pestaña correspondiente!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {logs.map((log, index) => (
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
                      const emotion = getEmotionById(emotionId);
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
  );
};

export default RecentLogs;
