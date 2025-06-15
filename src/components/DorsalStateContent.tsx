import { useTranslation } from 'react-i18next';

interface DorsalStateContentProps {
  contentIndex: number;
}

const DorsalStateContent = ({ contentIndex }: DorsalStateContentProps) => {
  const { t } = useTranslation();
  
  // Obtener el contenido según el índice
  const getContent = () => {
    const titleKey = `dorsalStateMessages.title${contentIndex + 1}`;
    const messageKey = `dorsalStateMessages.message${contentIndex + 1}`;
    
    return {
      title: t(titleKey),
      message: t(messageKey)
    };
  };
  
  const content = getContent();
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-blue-800">{content.title}</h3>
      <p className="text-blue-700 text-sm leading-relaxed">{content.message}</p>
      
      <div className="bg-blue-100 p-3 rounded-lg">
        <p className="text-xs text-blue-800 italic">
          {t('healthTracker.progressCard.basedOnStudies')}
        </p>
      </div>
    </div>
  );
};

export default DorsalStateContent;