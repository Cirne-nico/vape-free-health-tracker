import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { emotionsData, getEmotionById } from '@/data/emotionsData';

interface EmotionSelectorProps {
  selectedEmotions: string[];
  onEmotionToggle: (emotionId: string) => void;
  onSave: () => void;
  todayLog: any;
}

const EmotionSelector = ({ selectedEmotions, onEmotionToggle, onSave, todayLog }: EmotionSelectorProps) => {
  const { t } = useTranslation();
  
  const toggleEmotion = (emotionId: string) => {
    if (selectedEmotions.includes(emotionId)) {
      onEmotionToggle(emotionId);
    } else if (selectedEmotions.length < 3) {
      onEmotionToggle(emotionId);
    } else {
      toast.error(t('emotionLogger.maxEmotions'));
    }
  };

  const clearEmotions = () => {
    // Limpiar todas las emociones seleccionadas
    selectedEmotions.forEach(emotionId => {
      onEmotionToggle(emotionId);
    });
    toast.success(t('emotionLogger.clearEmotions'));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('emotionLogger.title')}</CardTitle>
        {todayLog && (
          <p className="text-sm text-green-600">
            {t('emotionLogger.alreadyLogged', { time: todayLog.timestamp })}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {emotionsData.map((emotion) => (
            <Button
              key={emotion.id}
              variant={selectedEmotions.includes(emotion.id) ? "default" : "outline"}
              className={`h-14 flex flex-col items-center justify-center gap-1 text-xs ${
                selectedEmotions.includes(emotion.id) 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-blue-50'
              }`}
              onClick={() => toggleEmotion(emotion.id)}
            >
              <span className="text-lg">{emotion.icon}</span>
              <span>{t(`emotions.${emotion.id}`)}</span>
            </Button>
          ))}
        </div>

        {/* Emociones seleccionadas */}
        {selectedEmotions.length > 0 && (
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {selectedEmotions.map((emotionId) => {
                const emotion = getEmotionById(emotionId);
                return emotion ? (
                  <Badge key={emotionId} className="bg-blue-600 text-white">
                    {emotion.icon} {t(`emotions.${emotionId}`)}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
        
        {/* Botones de acción - Reorganizados verticalmente */}
        <div className="space-y-2">
          {/* Botón principal de guardar */}
          <Button 
            onClick={onSave}
            disabled={selectedEmotions.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {t('emotionLogger.saveState')}
          </Button>
          
          {/* Botón secundario de limpiar */}
          {selectedEmotions.length > 0 && (
            <Button 
              onClick={clearEmotions}
              variant="outline"
              className="w-full text-red-600 border-red-300 hover:bg-red-50"
            >
              {t('emotionLogger.clearEmotions')}
            </Button>
          )}
        </div>

        <p className="text-sm text-gray-500">
          {t('emotionLogger.selectLimit', 'Selecciona hasta 3 emociones que mejor describan cómo te has sentido a lo largo del día')}
        </p>
      </CardContent>
    </Card>
  );
};

export default EmotionSelector;