
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
}

interface AchievementPopupProps {
  achievement: Achievement | null;
  savings: number;
  onClose: () => void;
}

const AchievementPopup = ({ achievement, savings, onClose }: AchievementPopupProps) => {
  if (!achievement) return null;

  const achievementSavings = (achievement.days * ((20/7) + (4/10))).toFixed(2);

  return (
    <Dialog open={!!achievement} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-green-600">
            🎉 ¡Nuevo Logro Desbloqueado!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6 py-4">
          <div className="text-6xl">{achievement.icon}</div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-800">{achievement.title}</h3>
            <p className="text-gray-600 mt-2">{achievement.description}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-green-700 mb-2">Beneficio conseguido:</p>
            <p className="text-green-600">{achievement.reward}</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{achievementSavings}€</p>
            <p className="text-sm text-blue-700">ahorrados hasta este hito</p>
            <p className="text-xs text-gray-500 mt-2 italic">
              "Cómprate algo con esto o valora pillarte un día libre en el curro"
            </p>
          </div>
          
          <Button onClick={onClose} className="w-full">
            ¡Continuar!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementPopup;
