
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { emotionsArray, getEmotionById } from '@/data/emotionsData';

interface EmotionSelectorProps {
  selectedEmotions: string[];
  onEmotionToggle: (emotionId: string) => void;
  onSave: () => void;
  todayLog: any;
}

const EmotionSelector = ({ selectedEmotions, onEmotionToggle, onSave, todayLog }: EmotionSelectorProps) => {
  const toggleEmotion = (emotionId: string) => {
    if (selectedEmotions.includes(emotionId)) {
      onEmotionToggle(emotionId);
    } else if (selectedEmotions.length < 3) {
      onEmotionToggle(emotionId);
    } else {
      toast.error('Solo puedes seleccionar máximo 3 emociones');
    }
  };

  const clearEmotions = () => {
    // Limpiar todas las emociones seleccionadas
    selectedEmotions.forEach(emotionId => {
      onEmotionToggle(emotionId);
    });
    toast.success('Emociones limpiadas');
  };

  return (
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
          {emotionsArray.map((emotion) => (
            <Button
              key={emotion.id}
              variant={selectedEmotions.includes(emotion.id) ? "default" : "outline"}
              className={`h-14 flex flex-col items-center justify-center gap-1 text-xs ${
                selectedEmotions.includes(emotion.id) 
                  ? emotion.bgColor + ' text-white' 
                  : 'hover:' + emotion.bgColor.replace('bg-', 'bg-') + '/20'
              } ${emotion.id === 'indifferent' ? 'text-[10px]' : ''}`}
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
              const emotion = getEmotionById(emotionId);
              return emotion ? (
                <Badge key={emotionId} className={emotion.bgColor + ' text-white'}>
                  {emotion.emoji} {emotion.text}
                </Badge>
              ) : null;
            })}
          </div>
          
          <div className="flex gap-2">
            {selectedEmotions.length > 0 && (
              <Button 
                onClick={clearEmotions}
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Limpiar emociones
              </Button>
            )}
            <Button 
              onClick={onSave}
              disabled={selectedEmotions.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Guardar Estado
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Selecciona hasta 3 emociones que mejor describan cómo te sientes
        </p>
      </CardContent>
    </Card>
  );
};

export default EmotionSelector;
