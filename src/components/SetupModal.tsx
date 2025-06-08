import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from './Logo';

interface SetupModalProps {
  onComplete: (date: Date) => void;
}

const SetupModal = ({ onComplete }: SetupModalProps) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [showFirstPhrase, setShowFirstPhrase] = useState(false);
  const [showSecondPhrase, setShowSecondPhrase] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Secuencia de animaciones
    const timer1 = setTimeout(() => setShowFirstPhrase(true), 800);
    const timer2 = setTimeout(() => setShowSecondPhrase(true), 2500);
    const timer3 = setTimeout(() => setShowForm(true), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #10b981 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Logo, título y subtítulo de la app */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center">
            <Logo size="lg" className="text-slate-700" />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-light text-slate-800 tracking-wide">
              Umbral
            </h1>
            <p className="text-lg text-slate-600 font-light">
              Acompañamiento en la retirada de la nicotina
            </p>
          </div>
        </div>

        {/* Frases animadas */}
        <div className="space-y-6 min-h-[120px] flex flex-col justify-center">
          <div 
            className={`text-center transition-all duration-1000 ${
              showFirstPhrase 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
          >
            <p className="text-xl text-slate-700 font-medium italic">
              "Ya sin nicotina, el cuerpo escucha"
            </p>
          </div>

          <div 
            className={`text-center transition-all duration-1000 delay-300 ${
              showSecondPhrase 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
          >
            <p className="text-lg text-emerald-600 font-medium">
              Comienza la sociabilidad mínima
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div 
          className={`transition-all duration-800 ${
            showForm 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-12'
          }`}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-medium text-slate-700">
                ¿Cuándo dejaste de vapear?
              </CardTitle>
              <p className="text-sm text-slate-500 mt-2">
                Define el momento de inicio de tu proceso
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-slate-600">
                  Fecha
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="border-slate-200 focus:border-blue-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium text-slate-600">
                  Hora
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border-slate-200 focus:border-blue-400"
                />
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-medium py-3 transition-all duration-200"
              >
                Iniciar mi proceso
              </Button>

              <p className="text-xs text-slate-400 text-center">
                Esta información se guardará localmente en tu dispositivo
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SetupModal;
