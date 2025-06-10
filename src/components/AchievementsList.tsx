import HerculaEpic from './HerculaEpic';

interface AchievementsListProps {
  days: number;
  savings: number;
}

const AchievementsList = ({ days, savings }: AchievementsListProps) => {
  return <HerculaEpic days={days} savings={savings} />;
};

export default AchievementsList;