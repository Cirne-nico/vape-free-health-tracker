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
      case 'epic':
        return 'Medalla Épica - Gesta Heroica';
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
      case 'epic':
        return 'text-orange-600';
      default:
        return '';
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-pointer">
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs p-3">
        <div className="space-y-1">
          <p className="font-medium text-sm">{medal.title}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{medal.description}</p>
          <p className={`text-xs font-medium ${getMedalTypeColor()}`}>
            {getMedalTypeLabel()}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};