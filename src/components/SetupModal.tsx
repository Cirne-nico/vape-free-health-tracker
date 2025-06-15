import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import ConsumptionSurvey from './ConsumptionSurvey';

interface SetupModalProps {
  onComplete: (date: Date) => void;
}

const SetupModal = ({ onComplete }: SetupModalProps) => {
  const { t, i18n } = useTranslation();
  const [showSurvey, setShowSurvey] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [userName, setUserName] = useState('');
  const [showMain, setShowMain] = useState(false);
  const [language, setLanguage] = useState('es'); // Establecer español como idioma por defecto

  useEffect(() => {
    // Pequeña animación inicial
    setTimeout(() => {
      setShowMain(true);
    }, 500);
    
    // Asegurar que el idioma por defecto sea español
    i18n.changeLanguage('es');
  }, []);
  
  const handleDateTimeSubmit = () => {
    if (!date || !time || !userName.trim()) return;
    
    const selectedDate = new Date(`${date}T${time}`);
    
    // Guardar el nombre del usuario en localStorage
    localStorage.setItem('user-name', userName.trim());
    
    // Guardar el idioma seleccionado
    localStorage.setItem('umbral-language', language);
    i18n.changeLanguage(language);
    
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

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
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
      
      <div className="relative max-w-md w-full space-y-8 overflow-y-auto max-h-[90vh]">
        <div className="text-center space-y-6">
          <Logo className="w-16 h-16 mx-auto" />
          
          <div className="space-y-4">
            <h1 className="text-3xl font-light text-white tracking-wide">
              {t('app.name')}
            </h1>
            <p className="text-blue-200 text-lg font-light">
              {t('app.tagline')}
            </p>
          </div>

          {/* Language selector */}
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 inline-flex">
              <button 
                className={`px-3 py-1 rounded-full text-sm ${language === 'es' ? 'bg-white text-blue-900' : 'text-white'}`}
                onClick={() => changeLanguage('es')}
              >
                ES
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm ${language === 'en' ? 'bg-white text-blue-900' : 'text-white'}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {showMain && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <CardHeader>
              <CardTitle className="text-center text-white">
                {t('settings.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Campo para el nombre del usuario */}
              <div className="space-y-2">
                <Label htmlFor="user-name" className="text-white flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t('setup.nameQuestion')}
                </Label>
                <Input
                  id="user-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={t('setup.namePlaceholder')}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  required
                />
              </div>

              <div className="text-center">
                <p className="text-blue-100 mb-4">
                  {t('setup.savingsQuestion')}
                </p>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowSurvey(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {t('setup.configureCosts')}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleSkipSurvey}
                    className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    {t('setup.useDefaults')}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-white/20">
                <div className="space-y-2">
                  <Label htmlFor="quit-date" className="text-white">
                    {t('setup.lastVapeQuestion')}
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
                  disabled={!date || !time || !userName.trim()}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {t('setup.startProcess')}
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