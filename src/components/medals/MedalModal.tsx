
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Medal } from './medalTypes';
import { AthenaMedalContent } from './AthenaMedalContent';
import { HealthMedalContent } from './HealthMedalContent';
import { VigorMedalContent } from './VigorMedalContent';
import { VictoryMedalContent } from './VictoryMedalContent';
import { ChronosMedalContent } from './ChronosMedalContent';

interface MedalModalProps {
  selectedMedal: Medal | null;
  totalSavings: number;
  onClose: () => void;
}

export const MedalModal = ({ selectedMedal, totalSavings, onClose }: MedalModalProps) => {
  if (!selectedMedal) return null;

  const getMedalTypeInfo = () => {
    switch (selectedMedal.type) {
      case 'victory':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50 border-yellow-200',
          title: 'Victoria - Nike',
          description: 'Símbolo de triunfo contra las adversidades estadísticas'
        };
      case 'athena':
        return {
          color: 'text-amber-600',
          bgColor: 'bg-amber-50 border-amber-200',
          title: 'Sabiduría - Atenea',
          description: 'Símbolo de sabiduría y visión clara tras superar las adicciones'
        };
      case 'chronos':
        return {
          color: 'text-orange-600',
          bgColor: 'bg-orange-50 border-orange-200',
          title: 'Tiempo - Cronos',
          description: 'Símbolo del dominio absoluto del tiempo y la persistencia'
        };
      case 'health':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50 border-green-200',
          title: 'Salud - Higiea',
          description: 'Símbolo de recuperación y sanación corporal'
        };
      case 'vigor':
        return {
          color: 'text-purple-600',
          bgColor: 'bg-purple-50 border-purple-200',
          title: 'Vigor - Dioniso',
          description: 'Símbolo de vitalidad, salud y beneficios de vida'
        };
    }
  };

  const typeInfo = getMedalTypeInfo();

  const getEngravedTextStyle = (type: string) => {
    const baseStyle = {
      textShadow: `
        0 2px 0 #8B4513,
        0 4px 0 #654321,
        0 6px 0 #543622,
        0 8px 0 #432815,
        0 10px 0 #321A08,
        0 12px 2px rgba(0,0,0,.2),
        0 0 10px rgba(0,0,0,.2),
        0 2px 6px rgba(0,0,0,.4),
        0 6px 10px rgba(0,0,0,.3),
        0 10px 20px rgba(0,0,0,.35),
        inset 0 2px 0 rgba(255,255,255,0.4),
        inset 0 -2px 0 rgba(0,0,0,0.6)
      `,
      filter: 'drop-shadow(0 0 4px rgba(139, 69, 19, 1))',
      background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
    };

    switch (type) {
      case 'athena':
        return {
          ...baseStyle,
          backgroundImage: 'linear-gradient(145deg, #FEF3C7 0%, #F59E0B 30%, #D97706  60%, #92400E 100%)',
        };
      case 'chronos':
        return {
          ...baseStyle,
          backgroundImage: 'linear-gradient(145deg, #FED7AA 0%, #FB923C 30%, #EA580C  60%, #C2410C 100%)',
        };
      case 'health':
        return {
          ...baseStyle,
          backgroundImage: 'linear-gradient(145deg, #A7F3D0 0%, #6EE7B7 30%, #34D399  60%, #10B981 100%)',
        };
      default:
        return {
          ...baseStyle,
          backgroundImage: 'linear-gradient(145deg, #F5E6A3 0%, #D4AF37 30%, #B8860B  60%, #8B6914 100%)',
        };
    }
  };

  const renderSpecificContent = () => {
    switch (selectedMedal.type) {
      case 'athena':
        return <AthenaMedalContent medal={selectedMedal} totalSavings={totalSavings} />;
      case 'chronos':
        return <ChronosMedalContent medal={selectedMedal} totalSavings={totalSavings} />;
      case 'health':
        return <HealthMedalContent medal={selectedMedal} />;
      case 'vigor':
        return <VigorMedalContent medal={selectedMedal} totalSavings={totalSavings} />;
      case 'victory':
        return <VictoryMedalContent medal={selectedMedal} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={!!selectedMedal} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className={`text-center text-xl sm:text-2xl font-bold ${typeInfo.color}`}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="relative">
                <img 
                  src={selectedMedal.icon} 
                  alt={selectedMedal.title}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-current shadow-lg"
                />
                
                {/* Número grabado mejorado para medallas de Vigor (Dioniso) */}
                {selectedMedal.type === 'vigor' && 'days' in selectedMedal && selectedMedal.days && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-amber-100 font-black text-2xl sm:text-3xl tracking-wider select-none pointer-events-none"
                      style={getEngravedTextStyle('vigor')}
                    >
                      {selectedMedal.days}
                    </span>
                  </div>
                )}

                {/* Número 90 grabado mejorado para medalla de Atenea */}
                {selectedMedal.type === 'athena' && 'days' in selectedMedal && selectedMedal.days && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-amber-200 font-black text-2xl sm:text-3xl tracking-wider select-none pointer-events-none"
                      style={getEngravedTextStyle('athena')}
                    >
                      {selectedMedal.days}
                    </span>
                  </div>
                )}

                {/* Número 2 grabado mejorado para medalla de Cronos */}
                {selectedMedal.type === 'chronos' && 'days' in selectedMedal && selectedMedal.days && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-orange-200 font-black text-3xl sm:text-4xl tracking-wider select-none pointer-events-none"
                      style={getEngravedTextStyle('chronos')}
                    >
                      2
                    </span>
                  </div>
                )}

                {/* Inscripción grabada mejorada para medallas de Salud (Higiea) */}
                {selectedMedal.type === 'health' && 'inscription' in selectedMedal && selectedMedal.inscription && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-green-100 font-black text-sm sm:text-base tracking-wider select-none pointer-events-none"
                      style={getEngravedTextStyle('health')}
                    >
                      {selectedMedal.inscription}
                    </span>
                  </div>
                )}

                {/* Ícono del órgano para medallas de Salud (Higiea) en la esquina */}
                {selectedMedal.type === 'health' && 'organIcon' in selectedMedal && selectedMedal.organIcon && (
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-2 border-green-300 shadow-lg">
                    <span className="text-lg sm:text-xl">{selectedMedal.organIcon}</span>
                  </div>
                )}
              </div>
              <div className="text-left">
                <span className="text-xl sm:text-2xl">{selectedMedal.title}</span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6 py-4">
          {/* Tipo de medalla */}
          <div className={`${typeInfo.bgColor} border rounded-lg p-4`}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <img 
                src={selectedMedal.icon} 
                alt={typeInfo.title}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <p className={`font-bold text-lg ${typeInfo.color.replace('text-', 'text-').replace('-600', '-700')}`}>
                Medalla de {typeInfo.title}
              </p>
            </div>
            <p className={`text-base ${typeInfo.color}`}>
              {typeInfo.description}
            </p>
          </div>

          <p className="text-gray-600 text-lg">{selectedMedal.description}</p>
          
          <div className={`${typeInfo.bgColor.replace('border-', 'bg-').replace('-200', '-50')} p-6 rounded-lg`}>
            <p className={`text-base font-medium ${typeInfo.color.replace('-600', '-700')} mb-3`}>
              Beneficio conseguido:
            </p>
            <p className={`${typeInfo.color} text-lg`}>
              {selectedMedal.reward}
            </p>
            
            {selectedMedal.type === 'health' && 'medicalBasis' in selectedMedal && selectedMedal.medicalBasis && (
              <div className="mt-4 p-3 bg-white/50 rounded border border-green-300">
                <p className="text-sm text-green-700 font-medium mb-2">Base médica:</p>
                <p className="text-sm text-green-600 italic">
                  {selectedMedal.medicalBasis}
                </p>
              </div>
            )}

            {(selectedMedal.type === 'victory' || selectedMedal.type === 'athena' || selectedMedal.type === 'chronos') && 'specialMessage' in selectedMedal && selectedMedal.specialMessage && (
              <div className={`mt-4 p-3 bg-white/50 rounded border ${
                selectedMedal.type === 'athena' ? 'border-amber-300' : 
                selectedMedal.type === 'chronos' ? 'border-orange-300' : 
                'border-yellow-300'
              }`}>
                <p className={`text-sm italic ${
                  selectedMedal.type === 'athena' ? 'text-amber-700' : 
                  selectedMedal.type === 'chronos' ? 'text-orange-700' : 
                  'text-yellow-700'
                }`}>
                  {selectedMedal.specialMessage}
                </p>
              </div>
            )}
          </div>
          
          {/* Contenido específico por tipo de medalla */}
          {renderSpecificContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
