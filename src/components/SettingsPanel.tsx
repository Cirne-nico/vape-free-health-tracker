import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import TermsModal from './TermsModal';

const SettingsPanel = () => {
  const [notifications, setNotifications] = useState(true);
  const [notificationTime, setNotificationTime] = useState('09:00');
  
  // Estados para configuración de costos mejorada
  const [vaperType, setVaperType] = useState('disposable');
  const [disposablePrice, setDisposablePrice] = useState('8');
  const [disposablesPerWeek, setDisposablesPerWeek] = useState('2');
  const [liquidPrice, setLiquidPrice] = useState('12');
  const [liquidSize, setLiquidSize] = useState('30');
  const [liquidMlPerWeek, setLiquidMlPerWeek] = useState('20');
  const [coilPrice, setCoilPrice] = useState('4');
  const [coilDays, setCoilDays] = useState('10');

  useEffect(() => {
    // Cargar configuración guardada
    const settings = JSON.parse(localStorage.getItem('app-settings') || '{}');
    
    setNotifications(settings.notifications ?? true);
    setNotificationTime(settings.notificationTime || '09:00');
    
    // Cargar configuración de costos
    setVaperType(settings.vaperType || 'disposable');
    setDisposablePrice(settings.disposablePrice?.toString() || '8');
    setDisposablesPerWeek(settings.disposablesPerWeek?.toString() || '2');
    setLiquidPrice(settings.liquidPrice?.toString() || '12');
    setLiquidSize(settings.liquidSize?.toString() || '30');
    setLiquidMlPerWeek(settings.liquidMlPerWeek?.toString() || '20');
    setCoilPrice(settings.coilPrice?.toString() || '4');
    setCoilDays(settings.coilDays?.toString() || '10');
  }, []);

  const calculateDailyCost = () => {
    switch (vaperType) {
      case 'disposable':
        const weeklyDisposables = parseFloat(disposablesPerWeek) || 2;
        const pricePerDisposable = parseFloat(disposablePrice) || 8;
        return (weeklyDisposables * pricePerDisposable) / 7;
        
      case 'pod':
        const weeklyLiquid = parseFloat(liquidMlPerWeek) || 20;
        const bottleSize = parseFloat(liquidSize) || 30;
        const bottlePrice = parseFloat(liquidPrice) || 12;
        const bottlesPerWeek = weeklyLiquid / bottleSize;
        return (bottlesPerWeek * bottlePrice) / 7;
        
      case 'mod':
        const modWeeklyLiquid = parseFloat(liquidMlPerWeek) || 20;
        const modBottleSize = parseFloat(liquidSize) || 30;
        const modBottlePrice = parseFloat(liquidPrice) || 12;
        const modBottlesPerWeek = modWeeklyLiquid / modBottleSize;
        const liquidDailyCost = (modBottlesPerWeek * modBottlePrice) / 7;
        
        const coilDailyCost = (parseFloat(coilPrice) || 4) / (parseFloat(coilDays) || 10);
        return liquidDailyCost + coilDailyCost;
        
      default:
        return 0;
    }
  };

  const saveSettings = () => {
    const dailyCost = calculateDailyCost();
    
    const settings = {
      notifications,
      notificationTime,
      vaperType,
      disposablePrice: parseFloat(disposablePrice),
      disposablesPerWeek: parseFloat(disposablesPerWeek),
      liquidPrice: parseFloat(liquidPrice),
      liquidSize: parseFloat(liquidSize),
      liquidMlPerWeek: parseFloat(liquidMlPerWeek),
      coilPrice: parseFloat(coilPrice),
      coilDays: parseFloat(coilDays),
      dailyCost,
      // Mantener compatibilidad con versiones anteriores
      costPerWeek: dailyCost * 7,
      coilCost: parseFloat(coilPrice)
    };

    localStorage.setItem('app-settings', JSON.stringify(settings));
    toast.success('Configuración guardada correctamente');

    // Programar notificaciones si están activadas
    if (notifications && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const [hours, minutes] = notificationTime.split(':').map(Number);
          const now = new Date();
          const scheduledTime = new Date();
          scheduledTime.setHours(hours, minutes, 0, 0);
          
          if (scheduledTime <= now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
          }
          
          const timeUntilNotification = scheduledTime.getTime() - now.getTime();
          
          setTimeout(() => {
            new Notification('Recordatorio - Libre de Vapeo', {
              body: '¡Es hora de registrar tu estado emocional y revisar tu progreso!',
              icon: '/favicon.ico'
            });
          }, timeUntilNotification);
        }
      });
    }
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

  const dailyCost = calculateDailyCost();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>⚙️ Configuración de la Aplicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Notificaciones */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notificaciones</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications">Activar recordatorios diarios</Label>
                <p className="text-sm text-gray-600">Recibe una notificación para registrar tu estado</p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            {notifications && (
              <div className="space-y-2">
                <Label htmlFor="notification-time">Hora de recordatorio</Label>
                <Input
                  id="notification-time"
                  type="time"
                  value={notificationTime}
                  onChange={(e) => setNotificationTime(e.target.value)}
                  className="w-32"
                />
              </div>
            )}
          </div>

          {/* Configuración de costos mejorada */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cálculo de Ahorros</h3>
            
            {/* Tipo de vaper */}
            <div className="space-y-2">
              <Label htmlFor="vaper-type">Tipo de vaper que usabas</Label>
              <Select value={vaperType} onValueChange={setVaperType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disposable">🗑️ Desechable</SelectItem>
                  <SelectItem value="pod">📦 Pod/Cartucho</SelectItem>
                  <SelectItem value="mod">🔧 Mod/Tanque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Configuración específica por tipo */}
            {vaperType === 'disposable' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="disposables-week">Desechables por semana</Label>
                  <Input
                    id="disposables-week"
                    type="number"
                    step="0.5"
                    value={disposablesPerWeek}
                    onChange={(e) => setDisposablesPerWeek(e.target.value)}
                    placeholder="2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disposable-price">Precio por desechable (€)</Label>
                  <Input
                    id="disposable-price"
                    type="number"
                    step="0.01"
                    value={disposablePrice}
                    onChange={(e) => setDisposablePrice(e.target.value)}
                    placeholder="8.00"
                  />
                </div>
              </div>
            )}

            {vaperType === 'pod' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="liquid-ml-week">Líquido por semana (ml)</Label>
                  <Input
                    id="liquid-ml-week"
                    type="number"
                    value={liquidMlPerWeek}
                    onChange={(e) => setLiquidMlPerWeek(e.target.value)}
                    placeholder="20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liquid-size">Tamaño del bote (ml)</Label>
                  <Input
                    id="liquid-size"
                    type="number"
                    value={liquidSize}
                    onChange={(e) => setLiquidSize(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liquid-price">Precio del bote (€)</Label>
                  <Input
                    id="liquid-price"
                    type="number"
                    step="0.01"
                    value={liquidPrice}
                    onChange={(e) => setLiquidPrice(e.target.value)}
                    placeholder="12.00"
                  />
                </div>
              </div>
            )}

            {vaperType === 'mod' && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mod-liquid-ml">Líquido por semana (ml)</Label>
                    <Input
                      id="mod-liquid-ml"
                      type="number"
                      value={liquidMlPerWeek}
                      onChange={(e) => setLiquidMlPerWeek(e.target.value)}
                      placeholder="20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mod-liquid-size">Tamaño del bote (ml)</Label>
                    <Input
                      id="mod-liquid-size"
                      type="number"
                      value={liquidSize}
                      onChange={(e) => setLiquidSize(e.target.value)}
                      placeholder="30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mod-liquid-price">Precio del bote (€)</Label>
                    <Input
                      id="mod-liquid-price"
                      type="number"
                      step="0.01"
                      value={liquidPrice}
                      onChange={(e) => setLiquidPrice(e.target.value)}
                      placeholder="12.00"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="coil-price">Precio de resistencia (€)</Label>
                    <Input
                      id="coil-price"
                      type="number"
                      step="0.01"
                      value={coilPrice}
                      onChange={(e) => setCoilPrice(e.target.value)}
                      placeholder="4.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coil-days">Duración resistencia (días)</Label>
                    <Input
                      id="coil-days"
                      type="number"
                      value={coilDays}
                      onChange={(e) => setCoilDays(e.target.value)}
                      placeholder="10"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Costo diario estimado:</strong> {dailyCost.toFixed(2)}€
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Este valor se usa para calcular tus ahorros acumulados
              </p>
            </div>
          </div>

          <Button onClick={saveSettings} className="w-full">
            Guardar Configuración
          </Button>
        </CardContent>
      </Card>

      {/* Gestión de datos */}
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

      {/* Información de la app */}
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

          {/* Enlaces legales */}
          <div className="pt-3 border-t">
            <div className="flex flex-wrap gap-4 justify-center">
              <PrivacyPolicyModal />
              <TermsModal />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;