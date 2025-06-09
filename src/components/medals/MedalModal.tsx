import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Calendar, Coins, TrendingUp } from 'lucide-react';
import MobileBackHandler from '../MobileBackHandler';
import { AthenaMedalContent } from './AthenaMedalContent';
import { ChronosMedalContent } from './ChronosMedalContent';
import { VictoryMedalContent } from './VictoryMedalContent';
import { VigorMedalContent } from './VigorMedalContent';
import { HealthMedalContent } from './HealthMedalContent';

interface MedalModalProps {
  isOpen: boolean;
  onClose: () => void;
  medal: any;
  totalSavings: number;
}

const MedalModal = ({ isOpen, onClose, medal, totalSavings }: MedalModalProps) => {
  if (!medal) return null;

  const getMedalContent = () => {
    switch (medal.category) {
      case 'athena':
        return <AthenaMedalContent medal={medal} totalSavings={totalSavings} />;
      case 'chronos':
        return <ChronosMedalContent medal={medal} />;
      case 'victory':
        return <VictoryMedalContent medal={medal} totalSavings={totalSavings} />;
      case 'vigor':
        return <VigorMedalContent medal={medal} />;
      case 'health':
        return <HealthMedalContent medal={medal} />;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <>
      <MobileBackHandler 
        isOpen={isOpen} 
        onClose={onClose} 
        id={`medal-modal-${medal.id}`} 
      />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              {/* Medalla grande */}
              <div className="relative">
                <div 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-2xl border-4 border-yellow-300"
                  style={{
                    background: `linear-gradient(135deg, ${medal.gradient.from} 0%, ${medal.gradient.to} 100%)`,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.3), inset 0 -2px 10px rgba(0,0,0,0.2)'
                  }}
                >
                  <span 
                    style={{
                      textShadow: `
                        2px 2px 4px rgba(0,0,0,0.8),
                        -1px -1px 2px rgba(255,255,255,0.3),
                        1px 1px 2px rgba(0,0,0,0.5),
                        0 0 8px rgba(0,0,0,0.4)
                      `,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                    }}
                  >
                    {medal.symbol}
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <Trophy className="w-3 h-3 text-yellow-800" />
                </div>
              </div>

              <DialogTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                {medal.title}
              </DialogTitle>
              
              <p className="text-center text-gray-600 text-sm sm:text-base max-w-md px-4">
                {medal.description}
              </p>
            </div>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 mt-4">
            {/* Información de la medalla */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Obtenida el día</p>
                      <p className="font-semibold text-sm sm:text-base">{medal.requiredDays}</p>
                    </div>
                  </div>
                  
                  {medal.category === 'athena' && (
                    <div className="flex items-center space-x-3">
                      <Coins className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-600">Ahorros hasta entonces</p>
                        <p className="font-semibold text-sm sm:text-base">
                          {formatCurrency(totalSavings)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 sm:col-span-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Categoría</p>
                      <Badge variant="outline" className="text-xs sm:text-sm">
                        {medal.category === 'athena' ? 'Ahorros' : 
                         medal.category === 'chronos' ? 'Tiempo' : 
                         medal.category === 'victory' ? 'Victoria' : 
                         medal.category === 'vigor' ? 'Vigor' : 'Salud'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contenido específico de la medalla */}
            {getMedalContent()}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MedalModal;
