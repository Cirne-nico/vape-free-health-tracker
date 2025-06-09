
interface MotivationalMessagesProps {
  emotionLogsCount: number;
}

const MotivationalMessages = ({ emotionLogsCount }: MotivationalMessagesProps) => {
  return (
    <>
      {/* Mensaje motivacional */}
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
        <p className="text-xs text-blue-700">
          🧠 Tu progreso se basa en cambios emocionales reales, no solo en el tiempo transcurrido. 
          Cada estado desbloqueado refleja una transformación auténtica en tu bienestar.
        </p>
      </div>

      {/* Información sobre registros */}
      {emotionLogsCount < 7 && (
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
          <p className="text-xs text-amber-700">
            📊 Registra tus emociones regularmente para desbloquear estados emocionales. 
            Llevas {emotionLogsCount} registros hasta ahora.
          </p>
        </div>
      )}
    </>
  );
};

export default MotivationalMessages;
