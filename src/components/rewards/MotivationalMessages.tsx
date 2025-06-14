import { useTranslation } from 'react-i18next';

interface MotivationalMessagesProps {
  emotionLogsCount: number;
}

const MotivationalMessages = ({ emotionLogsCount }: MotivationalMessagesProps) => {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Mensaje motivacional */}
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
        <p className="text-xs text-blue-700">
          {t('virtualRewards.motivationalMessage')}
        </p>
      </div>

      {/* Información sobre registros */}
      {emotionLogsCount < 7 && (
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
          <p className="text-xs text-amber-700">
            {t('virtualRewards.registrationInfo', { count: emotionLogsCount })}
          </p>
        </div>
      )}
    </>
  );
};

export default MotivationalMessages;