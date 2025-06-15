import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Medal } from './medalTypes';
import { useTranslation } from 'react-i18next';

interface MedalTooltipProps {
  medal: Medal;
  children: React.ReactNode;
}

export const MedalTooltip = ({ medal, children }: MedalTooltipProps) => {
  const { t } = useTranslation();
  
  const getMedalTypeLabel = () => {
    switch (medal.type) {
      case 'victory':
        return t('medals.types.victory', 'Medalla de Victoria - Nike');
      case 'athena':
        return t('medals.types.athena', 'Medalla de Sabiduría - Atenea');
      case 'chronos':
        return t('medals.types.chronos', 'Medalla de Tiempo - Cronos');
      case 'health':
        return t('medals.types.health', 'Medalla de Salud - Higiea');
      case 'vigor':
        return t('medals.types.vigor', 'Medalla de Vigor - Dioniso');
      case 'epic':
        return t('medals.types.epic', 'Medalla Épica - Gesta Heroica');
      case 'habit':
        return t('medals.types.habit', 'Medalla de Hábito Científico');
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
      case 'chronos':
        return 'text-orange-600';
      case 'health':
        return 'text-green-600';
      case 'vigor':
        return 'text-blue-600';
      case 'epic':
        return 'text-orange-600';
      case 'habit':
        return 'text-indigo-600';
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