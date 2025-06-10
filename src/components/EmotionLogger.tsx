import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import DayContentCard from './DayContentCard';
import EmotionSelector from './EmotionSelector';
import DorsalStateAlert from './DorsalStateAlert';

interface EmotionLoggerProps {
  startDate: Date | null;
}

const EmotionLogger = ({ startDate }: EmotionLoggerProps) => {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [todayLog, setTodayLog] = useState<any>(null);
  const [emotionLogs, setEmotionLogs] = useState<any[]>([]);

  useEffect(() => {
    loadTodayLog();
    loadEmotionLogs();
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

  const handleEmotionToggle = (emotionId: string) => {
    if (selectedEmotions.includes(emotionId)) {
      setSelectedEmotions(prev => prev.filter(id => id !== emotionId));
    } else {
      setSelectedEmotions(prev => [...prev, emotionId]);
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
    setEmotionLogs(updatedLogs);
    toast.success('Estado emocional registrado');
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