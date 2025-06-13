import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Medal } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  days: number;
  icon: string;
  reward: string;
  type?: string;
  healthCategory?: string;
  medicalBasis?: string;
  organIcon?: string;
}

interface AchievementPopupProps {
  achievement: Achievement | null;
  savings: number;
  onClose: () => void;
}

const AchievementPopup = ({ achievement, savings, onClose }: AchievementPopupProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (achievement) {
      setImageError(false);
      setImageLoaded(false);
    }
  }, [achievement]);

  if (!achievement) return null;

  const achievementSavings = (achievement.days * ((20/7) + (4/10))).toFixed(2);
  const isHealthAchievement = achievement.type === 'health' || achievement.healthCategory;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Función para renderizar el icono/imagen
  const renderAchievementIcon = () => {
    // Si es un logro de salud y tiene un icono de imagen
    if (isHealthAchievement && achievement.icon && achievement.icon.startsWith('/')) {
      return (
        <div className="relative w-24 h-24 mx-auto">
          {!imageError ? (
            <>
              <img 
                src={achievement.icon}
                alt={achievement.title}
                className={`w-full h-full object-contain rounded-lg transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}
            </>
          ) : (
            // Fallback si la imagen falla
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-green-300">
              <div className="text-center">
                <div className="text-4xl mb-2">{achievement.organIcon || '🏥'}</div>
                <div className="text-xs text-green-700 font-medium">SALUD</div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Para logros regulares o si no hay imagen, usar emoji/icono
    return (
      <div className="text-6xl">{achievement.icon || '🏆'}</div>
    );
  };

  return (
    <Dialog open={!!achievement} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-green-600">
            🎉 ¡Nuevo Logro Desbloqueado!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6 py-4">
          {renderAchievementIcon()}
          
          <div>
            <h3 className="text-xl font-bold text-gray-800">{achievement.title}</h3>
            <p className="text-gray-600 mt-2 break-words">{achievement.description}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-green-700 mb-2">
              {isHealthAchievement ? '🏥 Beneficio de salud:' : '🏆 Beneficio conseguido:'}
            </p>
            <p className="text-green-600 break-words">{achievement.reward}</p>
          </div>

          {/* Información médica adicional para logros de salud */}
          {isHealthAchievement && achievement.medicalBasis && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-700 mb-2">🔬 Base médica:</p>
              <p className="text-blue-600 text-sm break-words">{achievement.medicalBasis}</p>
            </div>
          )}
          
          {/* Solo mostrar ahorros si NO es un logro de salud */}
          {!isHealthAchievement && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{achievementSavings}€</p>
              <p className="text-sm text-blue-700">ahorrados hasta este hito</p>
              <p className="text-xs text-gray-500 mt-2 italic">
                "Cómprate algo con esto o valora pillarte un día libre en el curro"
              </p>
            </div>
          )}
          
          <Button onClick={onClose} className="w-full">
            ¡Continuar!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementPopup;