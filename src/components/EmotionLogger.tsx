
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface EmotionLoggerProps {
  startDate: Date | null;
}

const emotions = [
  { id: 'euphoric', text: 'Eufórico', type: 'positive', color: 'bg-green-500' },
  { id: 'happy', text: 'Alegre', type: 'positive', color: 'bg-green-400' },
  { id: 'calm', text: 'Tranquilo', type: 'positive', color: 'bg-blue-400' },
  { id: 'neutral', text: 'Neutral', type: 'neutral', color: 'bg-gray-400' },
  { id: 'irritable', text: 'Irritable', type: 'negative', color: 'bg-orange-500' },
  { id: 'sad', text: 'Triste', type: 'negative', color: 'bg-red-400' },
  { id: 'depressed', text: 'Deprimido', type: 'negative', color: 'bg-red-600' },
  { id: 'disgusted', text: 'Disgusto', type: 'negative', color: 'bg-purple-500' },
];

const EmotionLogger = ({ startDate }: EmotionLoggerProps) => {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [todayLog, setTodayLog] = useState<any>(null);

  useEffect(() => {
    loadTodayLog();
  }, []);

  const loadTodayLog = () => {
    const logs = JSON.parse(localStorage.getItem('emotion-logs') || '[]');
    const today = new Date().toDateString();
    const todayEntry = logs.find((log: any) => 
      new Date(log.date).toDateString() === today
    );
    setTodayLog(todayEntry);
    if (todayEntry) {
      setSelectedEmotions(todayEntry.emotions);
    }
  };

  const toggleEmotion = (emotionId: string) => {
    if (selectedEmotions.includes(emotionId)) {
      setSelectedEmotions(prev => prev.filter(id => id !== emotionId));
    } else if (selectedEmotions.length < 2) {
      setSelectedEmotions(prev => [...prev, emotionId]);
    } else {
      toast.error('Solo puedes seleccionar máximo 2 emociones');
    }
  };

  const saveEmotions = () => {
    if (selectedEmotions.length === 0) {
      toast.error('Selecciona al menos una emoción');
      return;
    }

    const logs = JSON.parse(localStorage.getItem('emotion-logs') || '[]');
    const today = new Date().toDateString();
    
    // Filtrar logs de hoy y agregar el nuevo
    const otherLogs = logs.filter((log: any) => 
      new Date(log.date).toDateString() !== today
    );
    
    const daysSince = startDate ? 
      Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;

    const newLog = {
      date: new Date().toISOString(),
      day: daysSince,
      emotions: selectedEmotions,
      timestamp: new Date().toLocaleTimeString()
    };

    const updatedLogs = [...otherLogs, newLog];
    localStorage.setItem('emotion-logs', JSON.stringify(updatedLogs));
    
    setTodayLog(newLog);
    toast.success('Estado emocional guardado');
  };

  const getCurrentDayInfo = () => {
    if (!startDate) return null;
    
    const daysSince = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Contenido motivacional por días
    const dayContent = {
      1: {
        title: "Primer Día - ¡Has comenzado!",
        message: "Los primeros síntomas de abstinencia pueden aparecer. Es normal sentir ansiedad o irritabilidad.",
        tip: "Mantente hidratado y busca actividades que te distraigan."
      },
      2: {
        title: "48 Horas - Primer hito importante",
        message: "La nicotina ya ha salido de tu sistema. Es un momento crucial.",
        tip: "Respira profundo y recuerda por qué decidiste dejar el vapeo."
      },
      7: {
        title: "Una Semana Completa",
        message: "¡Increíble! Has superado la primera semana. Los antojos empiezan a disminuir.",
        tip: "Celebra este logro. Tu cuerpo ya está empezando a recuperarse."
      },
      30: {
        title: "¡Un Mes de Libertad!",
        message: "Tu capacidad pulmonar ha mejorado significativamente. Los antojos son menos frecuentes.",
        tip: "Nota cómo respiras mejor y tienes más energía."
      }
    };

    return dayContent[daysSince as keyof typeof dayContent] || {
      title: `Día ${daysSince} - Sigue adelante`,
      message: "Cada día sin vapear es una victoria. Tu salud mejora continuamente.",
      tip: "Mantén el rumbo. Cada día libre de vapeo cuenta."
    };
  };

  const dayInfo = getCurrentDayInfo();

  return (
    <div className="space-y-6">
      {/* Información del día */}
      {dayInfo && (
        <Card className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardHeader>
            <CardTitle className="text-blue-700">{dayInfo.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-700">{dayInfo.message}</p>
            <p className="text-sm text-green-600 font-medium">💡 {dayInfo.tip}</p>
          </CardContent>
        </Card>
      )}

      {/* Logger de emociones */}
      <Card>
        <CardHeader>
          <CardTitle>¿Cómo te sientes hoy?</CardTitle>
          {todayLog && (
            <p className="text-sm text-green-600">
              ✓ Ya registraste tus emociones hoy a las {todayLog.timestamp}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {emotions.map((emotion) => (
              <Button
                key={emotion.id}
                variant={selectedEmotions.includes(emotion.id) ? "default" : "outline"}
                className={`h-12 ${
                  selectedEmotions.includes(emotion.id) 
                    ? emotion.color + ' text-white' 
                    : 'hover:' + emotion.color.replace('bg-', 'bg-') + '/20'
                }`}
                onClick={() => toggleEmotion(emotion.id)}
              >
                {emotion.text}
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {selectedEmotions.map((emotionId) => {
                const emotion = emotions.find(e => e.id === emotionId);
                return emotion ? (
                  <Badge key={emotionId} className={emotion.color + ' text-white'}>
                    {emotion.text}
                  </Badge>
                ) : null;
              })}
            </div>
            
            <Button 
              onClick={saveEmotions}
              disabled={selectedEmotions.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Guardar Estado
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Selecciona hasta 2 emociones que mejor describan cómo te sientes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionLogger;
