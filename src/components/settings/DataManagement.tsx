import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DataManagement = () => {
  const exportAllData = () => {
    const allData = {
      startDate: localStorage.getItem('vaping-quit-date'),
      emotionLogs: JSON.parse(localStorage.getItem('emotion-logs') || '[]'),
      settings: JSON.parse(localStorage.getItem('app-settings') || '{}'),
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-vapeo-libre-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    toast.success('Datos exportados correctamente');
  };

  const resetApp = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar completamente la aplicación? Se perderán TODOS los datos.')) {
      localStorage.clear();
      toast.success('Aplicación reiniciada. Recarga la página para comenzar de nuevo.');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>💾 Gestión de Datos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button onClick={exportAllData} variant="outline">
            Exportar Todos los Datos
          </Button>
          
          <Button onClick={resetApp} variant="destructive">
            Reiniciar Aplicación
          </Button>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Información:</strong> Todos los datos se almacenan localmente en tu dispositivo. 
            Exporta regularmente tus datos como respaldo.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagement;