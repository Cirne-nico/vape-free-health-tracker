import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import PrivacyPolicyModal from '../PrivacyPolicyModal';
import TermsModal from '../TermsModal';

const AppInfo = () => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.about.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong>{t('settings.about.name')}</strong>
          </p>
          <p className="text-sm text-gray-600">
            {t('settings.about.version')}
          </p>
          <p className="text-sm text-gray-600">
            {t('settings.about.purpose')}
          </p>
        </div>
        
        <div className="pt-3 border-t space-y-3">
          <p className="text-xs text-gray-500">
            {t('settings.about.disclaimer')}
          </p>
          
          <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
            <p className="text-xs text-red-700 font-medium">
              <strong>{t('settings.about.medicalWarning')}</strong>
            </p>
          </div>
        </div>

        <div className="pt-3 border-t">
          <div className="flex flex-wrap gap-4 justify-center">
            <PrivacyPolicyModal />
            <TermsModal />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppInfo;