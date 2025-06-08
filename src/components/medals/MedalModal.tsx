
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Medal } from './medalTypes';
import { AthenaMedalContent } from './AthenaMedalContent';
import { HealthMedalContent } from './HealthMedalContent';
import { VigorMedalContent } from './VigorMedalContent';
import { VictoryMedalContent } from './VictoryMedalContent';

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

  const renderSpecificContent = () => {
    switch (selectedMedal.type) {
      case 'athena':
        return <AthenaMedalContent medal={selectedMedal} totalSavings={totalSavings} />;
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={`text-center text-xl font-bold ${typeInfo.color}`}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="relative">
                <img 
                  src={selectedMedal.icon} 
                  alt={selectedMedal.title}
                  className="w-16 h-16 rounded-full object-cover border-2 border-current"
                />
                {selectedMedal.type === 'health' && 'organIcon' in selectedMedal && selectedMedal.organIcon && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-green-400 shadow-sm">
                    <span className="text-sm">{selectedMedal.organIcon}</span>
                  </div>
                )}
              </div>
              <span>{selectedMedal.title}</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4 py-4">
          {/* Tipo de medalla */}
          <div className={`${typeInfo.bgColor} border rounded-lg p-3`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <img 
                src={selectedMedal.icon} 
                alt={typeInfo.title}
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className={`font-bold ${typeInfo.color.replace('text-', 'text-').replace('-600', '-700')}`}>
                Medalla de {typeInfo.title}
              </p>
            </div>
            <p className={`text-sm ${typeInfo.color}`}>
              {typeInfo.description}
            </p>
          </div>

          <p className="text-gray-600">{selectedMedal.description}</p>
          
          <div className={`${typeInfo.bgColor.replace('border-', 'bg-').replace('-200', '-50')} p-4 rounded-lg`}>
            <p className={`text-sm font-medium ${typeInfo.color.replace('-600', '-700')} mb-2`}>
              Beneficio conseguido:
            </p>
            <p className={typeInfo.color}>
              {selectedMedal.reward}
            </p>
            
            {selectedMedal.type === 'health' && 'medicalBasis' in selectedMedal && selectedMedal.medicalBasis && (
              <div className="mt-3 p-2 bg-white/50 rounded border border-green-300">
                <p className="text-xs text-green-700 font-medium mb-1">Base médica:</p>
                <p className="text-xs text-green-600 italic">
                  {selectedMedal.medicalBasis}
                </p>
              </div>
            )}

            {(selectedMedal.type === 'victory' || selectedMedal.type === 'athena') && 'specialMessage' in selectedMedal && selectedMedal.specialMessage && (
              <div className={`mt-3 p-2 bg-white/50 rounded border ${
                selectedMedal.type === 'athena' ? 'border-amber-300' : 'border-yellow-300'
              }`}>
                <p className={`text-xs italic ${
                  selectedMedal.type === 'athena' ? 'text-amber-700' : 'text-yellow-700'
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
