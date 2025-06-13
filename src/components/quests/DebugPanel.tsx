import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Bug } from 'lucide-react';

interface DebugPanelProps {
  debugInfo: string;
  onUpdateMedals: () => void;
  onDebugSystem: () => void;
}

const DebugPanel = ({ debugInfo, onUpdateMedals, onDebugSystem }: DebugPanelProps) => {
  return (
    <Card className="bg-yellow-50 border-yellow-200">
      <CardHeader>
        <CardTitle className="text-yellow-800 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Estado de las Medallas Épicas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-xs text-yellow-800 whitespace-pre-wrap font-mono bg-white p-3 rounded border">
          {debugInfo}
        </pre>
        <div className="mt-3 space-y-2">
          <div className="flex gap-2">
            <Button 
              onClick={onUpdateMedals}
              className="bg-orange-600 hover:bg-orange-700 text-white"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar Medallas Épicas
            </Button>
            <Button 
              onClick={onDebugSystem}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              size="sm"
            >
              <Bug className="w-4 h-4 mr-2" />
              Debug Sistema
            </Button>
          </div>
          <div className="text-sm text-yellow-700">
            <p><strong>¿No aparecen las medallas en la pantalla principal?</strong></p>
            <p>1. Haz clic en "Actualizar Medallas Épicas" arriba</p>
            <p>2. Marca los checks de las gestas que quieras completar</p>
            <p>3. Haz clic en "Debug Sistema" para verificar el estado</p>
            <p>4. Ve a la pantalla principal y busca las medallas en la sección "Medallas Obtenidas"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebugPanel;