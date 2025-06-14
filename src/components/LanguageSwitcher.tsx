import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'es');

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    localStorage.setItem('umbral-language', language);
    
    // Ensure RTL direction for Greek language
    document.documentElement.dir = language === 'el' ? 'rtl' : 'ltr';
  };

  const getLanguageFlag = (code: string) => {
    switch (code) {
      case 'es': return '🇪🇸';
      case 'en': return '🇬🇧';
      case 'ca': return '🏴󠁥󠁳󠁣󠁴󠁿';
      case 'el': return '🇬🇷';
      default: return '🇪🇸';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm"
        >
          <span className="text-lg">{getLanguageFlag(currentLanguage)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => changeLanguage('es')}>
          <span className="mr-2">🇪🇸</span> Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          <span className="mr-2">🇬🇧</span> English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('ca')}>
          <span className="mr-2">🏴󠁥󠁳󠁣󠁴󠁿</span> Català
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('el')}>
          <span className="mr-2">🇬🇷</span> Ελληνικά
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;