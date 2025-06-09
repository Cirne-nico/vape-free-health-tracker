
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Calendar, TrendingUp, X } from 'lucide-react';
import MobileBackHandler from '../MobileBackHandler';
import { AthenaMedalContent } from './AthenaMedalContent';
import { ChronosMedalContent } from './ChronosMedalContent';
import { VictoryMedalContent } from './VictoryMedalContent';
import { VigorMedalContent } from './VigorMedalContent';
import { HealthMedalContent } from './HealthMedalContent';
import { MedalIcon } from './MedalIcon';
import { useState } from 'react';

interface MedalModalProps {
  selectedMedal: any;
  totalSavings: number;
  onClose: () => void;
}

const MedalModal = ({ selectedMedal, totalSavings, onClose }: MedalModalProps) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const medal = selectedMedal;
  const isOpen = !!selectedMedal;
  
  if (!medal) return null;

  // Función para convertir horas a días en textos
  const processText = (text: string, medalType: string) => {
    if (medalType === 'vigor' || (!medal.category && medal.days && medal.reward)) {
      return text.replace(/(\d+)\s*horas?/gi, (match, hours) => {
        const numHours = parseInt(hours);
        if (numHours >= 24) {
          const days = Math.floor(numHours / 24);
          return `${days === 1 ? 'un día' : `${days} días`}`;
        }
        return match;
      }).replace(/Primeras/gi, 'Primeros');
    }
    return text;
  };

  const getMedalContent = () => {
    // Primero verificar el tipo específico
    if (medal.type === 'health') {
      return <HealthMedalContent medal={medal} />;
    }
    
    if (medal.type === 'vigor') {
      return <VigorMedalContent medal={medal} totalSavings={totalSavings} />;
    }
    
    // Para el resto de categorías
    switch (medal.category || medal.type) {
      case 'athena':
        return <AthenaMedalContent medal={medal} totalSavings={totalSavings} />;
      case 'chronos':
        return <ChronosMedalContent medal={medal} totalSavings={totalSavings} />;
      case 'victory':
        return <VictoryMedalContent medal={medal} />;
      default:
        // Para medallas sin tipo específico que tienen días y reward (medallas de logros)
        if (!medal.category && medal.days && medal.reward) {
          return <VigorMedalContent medal={medal} totalSavings={totalSavings} />;
        }
        return null;
    }
  };

  const medalType = medal.type || (medal.category ? medal.category : (medal.days && medal.reward ? 'vigor' : 'unknown'));
  const processedTitle = processText(medal.title, medalType);
  const processedDescription = processText(medal.description, medalType);

  const handleMedalClick = () => {
    setIsEnlarged(true);
  };

  const handleCloseEnlarged = () => {
    setIsEnlarged(false);
  };

  return (
    <>
      <MobileBackHandler 
        isOpen={isOpen} 
        onClose={onClose} 
        id={`medal-modal-${medal.id}`} 
      />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg sm:max-w-3xl max-h-[95vh] overflow-y-auto">
          <DialogHeader className="space-y-6 pt-4">
            <div className="flex flex-col items-center space-y-6">
              {/* Medalla ampliada con espacio suficiente */}
              <div className="relative scale-[2.5] sm:scale-[3] my-8 sm:my-12">
                <button
                  onClick={handleMedalClick}
                  className="relative hover:scale-110 transition-transform duration-200 cursor-pointer"
                >
                  <MedalIcon medal={medal} onClick={() => {}} />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <Trophy className="w-2 h-2 text-yellow-800" />
                  </div>
                </button>
              </div>

              <DialogTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                {processedTitle}
              </DialogTitle>
              
              <p className="text-center text-gray-600 text-sm sm:text-base max-w-md px-4">
                {processedDescription}
              </p>
            </div>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 mt-6 pb-4">
            {/* Información de la medalla */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Obtenida el día</p>
                      <p className="font-semibold text-sm sm:text-base">{medal.requiredDays || medal.days}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 sm:col-span-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Categoría</p>
                      <Badge variant="outline" className="text-xs sm:text-sm">
                        {medal.type === 'health' ? 'Salud' :
                         medal.category === 'athena' ? 'Ahorros' : 
                         medal.category === 'chronos' ? 'Tiempo' : 
                         medal.category === 'victory' ? 'Victoria' : 
                         medal.type === 'vigor' || (!medal.category && medal.days) ? 'Vigor' : 'Logro'}
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

      {/* Modal ampliado para ver la medalla en detalle */}
      <Dialog open={isEnlarged} onOpenChange={handleCloseEnlarged}>
        <DialogContent className="max-w-2xl bg-black/90 border-0">
          <div className="flex flex-col items-center justify-center p-8">
            <button
              onClick={handleCloseEnlarged}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative scale-[4] sm:scale-[6] mb-12 mt-8">
              <MedalIcon medal={medal} onClick={() => {}} />
            </div>
            
            <h3 className="text-white text-xl sm:text-2xl font-bold text-center mb-4">
              {processedTitle}
            </h3>
            
            <p className="text-white/80 text-center text-sm sm:text-base max-w-md">
              Haz clic fuera de la medalla para cerrar
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MedalModal;
