import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, CalendarIcon, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import ConsumptionSurvey from './ConsumptionSurvey';

interface SetupModalProps {
  onComplete: (date: Date) => void;
}

const SetupModal = ({ onComplete }: SetupModalProps) => {
  const [showSurvey, setShowSurvey] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    // Pequeña animación inicial
    setTimeout(() => {
      setShowMain(true);
    }, 500);
  }, []);
  
  const handleDateTimeSubmit = () => {
    if (!date || !time) return;
    
    const selectedDate = new Date(`${date}T${time}`);
    onComplete(selectedDate);
  };

  const handleSurveyComplete = (data: any) => {
    console.log('Datos del cuestionario guardados:', data);
    setShowSurvey(false);
    setShowMain(true);
  };

  const handleSkipSurvey = () => {
    setShowSurvey(false);
    setShowMain(true);
  };

  if (showSurvey) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <ConsumptionSurvey 
          onComplete={handleSurveyComplete}
          onBack={handleSkipSurvey}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 flex items-center justify-center p-4 z-50">
      {/* Fondo con lineas sutiles */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute left-0 top-0 w-full h-full bg-[url('/dot-grid.png')] bg-repeat opacity-50 animate-pulse"></div>
      </div>
      
      <div className="relative max-w-md w-full space-y-8">
        <div className="text-center space-y-6">
          <Logo className="w-16 h-16 mx-auto" />
          
          <div className="space-y-4">
            <h1 className="text-3xl font-light text-white tracking-wide">
              Umbral
            </h1>
            <p className="text-blue-200 text-lg font-light">
              Acompañamiento en la retirada de la nicotina
            </p>
          </div>

          {/* Frases motivacionales animadas */}
          <div className="text-sm text-blue-300 animate-pulse">
            {/* Puedes agregar frases aquí */}
          </div>
        </div>

        {showMain && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <CardHeader>
              <CardTitle className="text-center text-white">
                Comenzar el proceso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-blue-100 mb-4">
                  Antes de comenzar, ¿te gustaría configurar el cálculo de ahorros personalizado?
                </p>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowSurvey(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Configurar mis gastos
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleSkipSurvey}
                    className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    Usar valores por defecto
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-white/20">
                <div className="space-y-2">
                  <Label htmlFor="quit-date" className="text-white">
                    ¿Cuándo fue tu último vapeo?
                  </Label>
                  <div className="space-y-2">
                    <Input
                      id="quit-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                      required
                    />
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                      required
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleDateTimeSubmit}
                  disabled={!date || !time}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Iniciar el proceso
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SetupModal;
