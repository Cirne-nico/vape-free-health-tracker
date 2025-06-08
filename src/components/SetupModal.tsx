
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SetupModalProps {
  onComplete: (date: Date) => void;
}

const SetupModal = ({ onComplete }: SetupModalProps) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));

  const handleSubmit = () => {
    try {
      const dateTime = new Date(`${date}T${time}`);
      if (dateTime > new Date()) {
        alert('La fecha no puede ser en el futuro');
        return;
      }
      onComplete(dateTime);
    } catch (error) {
      alert('Formato de fecha/hora inválido');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-700">
            🌟 ¡Comienza tu Viaje!
          </CardTitle>
          <p className="text-gray-600 mt-2">
            ¿Cuándo dejaste de vapear?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Hora</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            Iniciar Seguimiento
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Esta información se guardará localmente en tu dispositivo
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupModal;
