import EmotionLogger from '../EmotionLogger';
import SocialStats from '../SocialStats';

interface GeneralTabProps {
  startDate: Date | null;
  currentDay: number;
  totalSavings: number;
}

const GeneralTab = ({ startDate, currentDay, totalSavings }: GeneralTabProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <EmotionLogger startDate={startDate} />
      <SocialStats 
        currentDay={currentDay}
        totalSavings={totalSavings}
      />
    </div>
  );
};

export default GeneralTab;