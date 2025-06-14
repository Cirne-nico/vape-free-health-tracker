import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PrivacyPolicyModal from '../PrivacyPolicyModal';
import TermsModal from '../TermsModal';

const AppInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ℹ️ Acerca de la Aplicación</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong>UMBRAL - Libre de Vapeo</strong>
          </p>
          <p className="text-sm text-gray-600">
            Versión 2.1 - Con seguimiento avanzado de salud y soporte para donaciones
          </p>
          <p className="text-sm text-gray-600">
            Desarrollada para acompañarte en tu proceso de abandono del vapeo
          </p>
        </div>
        
        <div className="pt-3 border-t space-y-3">
          <p className="text-xs text-gray-500">
            Los datos de recuperación de salud están basados en estudios científicos 
            sobre los efectos de dejar el vapeo y el tabaco. Los valores son estimaciones 
            y pueden variar según cada persona.
          </p>
          
          <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
            <p className="text-xs text-red-700 font-medium">
              <strong>Aviso Médico:</strong> Esta aplicación no sustituye el consejo médico profesional. 
              Si experimentas síntomas graves durante tu proceso de abandono del vapeo, 
              consulta con un profesional de la salud.
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