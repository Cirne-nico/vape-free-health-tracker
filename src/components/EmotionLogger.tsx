import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import DayContentCard from './DayContentCard';
import EmotionSelector from './EmotionSelector';
import DorsalStateAlert from './DorsalStateAlert';

interface EmotionLoggerProps {
  startDate: Date | null;
}

const EmotionLogger = ({ startDate }: EmotionLoggerProps) => {
  const { t } = useTranslation();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [todayLog, setTodayLog] = useState<any>(null);
  const [emotionLogs, setEmotionLogs] = useState<any[]>([]);
  const [consecutiveDorsalDays, setConsecutiveDorsalDays] = useState(0);

  useEffect(() => {
    loadTodayLog();
    loadEmotionLogs();
    loadConsecutiveDorsalDays();
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

  const loadEmotionLogs = () => {
    const logs = JSON.parse(localStorage.getItem('emotion-logs') || '[]');
    setEmotionLogs(logs);
  };

  const loadConsecutiveDorsalDays = () => {
    const count = parseInt(localStorage.getItem('consecutive-dorsal-days') || '0');
    setConsecutiveDorsalDays(count);
  };

  const handleEmotionToggle = (emotionId: string) => {
    if (selectedEmotions.includes(emotionId)) {
      setSelectedEmotions(prev => prev.filter(id => id !== emotionId));
    } else {
      if (selectedEmotions.length < 3) {
        setSelectedEmotions(prev => [...prev, emotionId]);
      } else {
        toast.error(t('emotionLogger.maxEmotions'));
      }
    }
  };

  const saveEmotions = () => {
    if (selectedEmotions.length === 0) {
      toast.error(t('emotionLogger.selectAtLeast'));
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
    setEmotionLogs(updatedLogs);
    toast.success(t('emotionLogger.success'));

    // Comprobar si el registro actual contiene emociones dorsales
    const hasDorsalEmotions = selectedEmotions.some(id => 
      ['depressed', 'sad', 'indifferent', 'foggy'].includes(id)
    );

    // Actualizar contador de días dorsales consecutivos
    if (hasDorsalEmotions) {
      const newCount = consecutiveDorsalDays + 1;
      setConsecutiveDorsalDays(newCount);
      localStorage.setItem('consecutive-dorsal-days', newCount.toString());
    } else {
      // Si no hay emociones dorsales, reiniciar el contador
      setConsecutiveDorsalDays(0);
      localStorage.setItem('consecutive-dorsal-days', '0');
    }
  };

  return (
    <div className="space-y-6">
      <DayContentCard startDate={startDate} />
      <EmotionSelector 
        selectedEmotions={selectedEmotions}
        onEmotionToggle={handleEmotionToggle}
        onSave={saveEmotions}
        todayLog={todayLog}
      />
      <DorsalStateAlert emotionLogs={emotionLogs} />
    </div>
  );
};

export default EmotionLogger;