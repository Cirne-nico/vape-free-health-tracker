
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import contenidosData from '@/data/contenidos.json';

interface EmotionLoggerProps {
  startDate: Date | null;
}

const emotions = [
  { id: 'euphoric', text: 'Eufórico', emoji: '🤩', type: 'positive', color: 'bg-green-500' },
  { id: 'happy', text: 'Alegre', emoji: '😊', type: 'positive', color: 'bg-green-400' },
  { id: 'calm', text: 'Tranquilo', emoji: '😌', type: 'positive', color: 'bg-blue-400' },
  { id: 'proud', text: 'Orgulloso', emoji: '💪', type: 'positive', color: 'bg-purple-400' },
  { id: 'hopeful', text: 'Esperanzado', emoji: '🌟', type: 'positive', color: 'bg-yellow-400' },
  { id: 'motivated', text: 'Motivado', emoji: '🚀', type: 'positive', color: 'bg-indigo-400' },
  { id: 'relaxed', text: 'Relajado', emoji: '🧘‍♂️', type: 'positive', color: 'bg-teal-400' },
  { id: 'satisfied', text: 'Satisfecho', emoji: '😌', type: 'positive', color: 'bg-emerald-400' },
  { id: 'optimistic', text: 'Optimista', emoji: '✨', type: 'positive', color: 'bg-pink-400' },
  { id: 'neutral', text: 'Neutral', emoji: '😐', type: 'neutral', color: 'bg-gray-400' },
  { id: 'anxious', text: 'Ansioso', emoji: '😰', type: 'negative', color: 'bg-yellow-600' },
  { id: 'irritable', text: 'Irritable', emoji: '😤', type: 'negative', color: 'bg-orange-500' },
  { id: 'sad', text: 'Triste', emoji: '😢', type: 'negative', color: 'bg-blue-600' },
  { id: 'frustrated', text: 'Frustrado', emoji: '😫', type: 'negative', color: 'bg-red-500' },
  { id: 'depressed', text: 'Deprimido', emoji: '😞', type: 'negative', color: 'bg-red-600' },
  { id: 'craving', text: 'Con antojos', emoji: '🤤', type: 'negative', color: 'bg-orange-600' },
  { id: 'disgusted', text: 'Disgusto', emoji: '🤢', type: 'negative', color: 'bg-purple-500' },
  { id: 'overwhelmed', text: 'Abrumado', emoji: '😵', type: 'negative', color: 'bg-red-700' },
  { id: 'restless', text: 'Inquieto', emoji: '😣', type: 'negative', color: 'bg-orange-400' },
  { id: 'foggy', text: 'Confuso', emoji: '🌫️', type: 'negative', color: 'bg-gray-500' }
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
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions(prev => [...prev, emotionId]);
    } else {
      toast.error('Solo puedes seleccionar máximo 3 emociones');
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

  const getCurrentDayContent = () => {
    if (!startDate) return null;
    
    const hoursSince = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60));
    
    // Buscar el contenido más reciente según las horas transcurridas
    const availableContent = contenidosData.filter(content => content.hora <= hoursSince);
    
    if (availableContent.length === 0) {
      return {
        sintesis: "¡Has comenzado tu viaje! Los primeros minutos son cruciales.",
        consejo: "Respira profundo y mantente hidratado. Cada minuto cuenta.",
        recordatorio: "Tu cuerpo está iniciando el proceso de recuperación.",
        contrareplica: "No es una pérdida. Es el comienzo de mi libertad."
      };
    }
    
    // Obtener el contenido más reciente
    return availableContent[availableContent.length - 1];
  };

  const dayContent = getCurrentDayContent();
  const hoursSince = startDate ? Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60)) : 0;

  return (
    <div className="space-y-6">
      {/* Información del momento actual */}
      {dayContent && (
        <Card className="bg-gradient-to-r from-blue-50 to-green-50">
          <CardHeader>
            <CardTitle className="text-blue-700">
              {hoursSince >= 24 ? `Día ${Math.floor(hoursSince / 24)}` : `${hoursSince} horas`} sin vapear
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-700 mb-1">📋 Síntesis:</p>
                <p className="text-gray-700">{dayContent.sintesis}</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-green-700 mb-1">💡 Consejo:</p>
                <p className="text-gray-700">{dayContent.consejo}</p>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-yellow-700 mb-1">🔔 Recordatorio:</p>
                <p className="text-gray-700">{dayContent.recordatorio}</p>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <p className="text-sm font-medium text-purple-700 mb-1">💪 Contrarréplica:</p>
                <p className="text-gray-700 font-medium italic">"{dayContent.contrareplica}"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Logger de emociones */}
      <Card>
        <CardHeader>
          <CardTitle>¿Cómo te sientes ahora?</CardTitle>
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
                className={`h-14 flex flex-col items-center justify-center gap-1 text-xs ${
                  selectedEmotions.includes(emotion.id) 
                    ? emotion.color + ' text-white' 
                    : 'hover:' + emotion.color.replace('bg-', 'bg-') + '/20'
                }`}
                onClick={() => toggleEmotion(emotion.id)}
              >
                <span className="text-lg">{emotion.emoji}</span>
                <span>{emotion.text}</span>
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {selectedEmotions.map((emotionId) => {
                const emotion = emotions.find(e => e.id === emotionId);
                return emotion ? (
                  <Badge key={emotionId} className={emotion.color + ' text-white'}>
                    {emotion.emoji} {emotion.text}
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
            Selecciona hasta 3 emociones que mejor describan cómo te sientes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionLogger;
