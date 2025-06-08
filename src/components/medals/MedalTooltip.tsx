
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Medal } from './medalTypes';

interface MedalTooltipProps {
  medal: Medal;
  children: React.ReactNode;
}

export const MedalTooltip = ({ medal, children }: MedalTooltipProps) => {
  const getMedalTypeLabel = () => {
    switch (medal.type) {
      case 'victory':
        return 'Medalla de Victoria - Nike';
      case 'athena':
        return 'Medalla de Sabiduría - Atenea';
      case 'health':
        return 'Medalla de Salud - Higiea';
      case 'vigor':
        return 'Medalla de Vigor - Dioniso';
      default:
        return '';
    }
  };

  const getMedalTypeColor = () => {
    switch (medal.type) {
      case 'victory':
        return 'text-yellow-600';
      case 'athena':
        return 'text-amber-600';
      case 'health':
        return 'text-green-600';
      case 'vigor':
        return 'text-purple-600';
      default:
        return '';
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-medium">{medal.title}</p>
        <p className="text-xs text-muted-foreground">{medal.description}</p>
        <p className={`text-xs font-medium ${getMedalTypeColor()}`}>
          {getMedalTypeLabel()}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};
