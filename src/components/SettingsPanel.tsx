import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import NotificationSettings from './settings/NotificationSettings';
import CostSettings from './settings/CostSettings';
import DataManagement from './settings/DataManagement';
import AppInfo from './settings/AppInfo';
import LanguageSelector from './settings/LanguageSelector';

const SettingsPanel = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(true);
  const [notificationTime, setNotificationTime] = useState('09:00');
  
  // Estados para configuración de costos
  const [vaperType, setVaperType] = useState('disposable');
  const [disposablePrice, setDisposablePrice] = useState('8');
  const [disposablesPerWeek, setDisposablesPerWeek] = useState('2');
  const [liquidPrice, setLiquidPrice] = useState('12');
  const [liquidSize, setLiquidSize] = useState('30');
  const [liquidMlPerWeek, setLiquidMlPerWeek] = useState('20');
  const [coilPrice, setCoilPrice] = useState('4');
  const [coilDays, setCoilDays] = useState('10');
  const [batteryPrice, setBatteryPrice] = useState('');
  const [batteryMonths, setBatteryMonths] = useState('');
  const [devicePrice, setDevicePrice] = useState('');
  const [deviceMonths, setDeviceMonths] = useState('');

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('app-settings') || '{}');
    
    setNotifications(settings.notifications ?? true);
    setNotificationTime(settings.notificationTime || '09:00');
    setVaperType(settings.vaperType || 'disposable');
    setDisposablePrice(settings.disposablePrice?.toString() || '8');
    setDisposablesPerWeek(settings.disposablesPerWeek?.toString() || '2');
    setLiquidPrice(settings.liquidPrice?.toString() || '12');
    setLiquidSize(settings.liquidSize?.toString() || '30');
    setLiquidMlPerWeek(settings.liquidMlPerWeek?.toString() || '20');
    setCoilPrice(settings.coilPrice?.toString() || '4');
    setCoilDays(settings.coilDays?.toString() || '10');
    setBatteryPrice(settings.batteryPrice?.toString() || '');
    setBatteryMonths(settings.batteryMonths?.toString() || '');
    setDevicePrice(settings.devicePrice?.toString() || '');
    setDeviceMonths(settings.deviceMonths?.toString() || '');
  }, []);

  const calculateDailyCost = () => {
    let dailyCost = 0;
    
    switch (vaperType) {
      case 'disposable':
        const weeklyDisposables = parseFloat(disposablesPerWeek) || 2;
        const pricePerDisposable = parseFloat(disposablePrice) || 8;
        dailyCost = (weeklyDisposables * pricePerDisposable) / 7;
        break;
        
      case 'pod':
        const weeklyLiquid = parseFloat(liquidMlPerWeek) || 20;
        const bottleSize = parseFloat(liquidSize) || 30;
        const bottlePrice = parseFloat(liquidPrice) || 12;
        const bottlesPerWeek = weeklyLiquid / bottleSize;
        dailyCost = (bottlesPerWeek * bottlePrice) / 7;
        break;
        
      case 'mod':
        const modWeeklyLiquid = parseFloat(liquidMlPerWeek) || 20;
        const modBottleSize = parseFloat(liquidSize) || 30;
        const modBottlePrice = parseFloat(liquidPrice) || 12;
        const modBottlesPerWeek = modWeeklyLiquid / modBottleSize;
        const liquidDailyCost = (modBottlesPerWeek * modBottlePrice) / 7;
        
        const coilDailyCost = (parseFloat(coilPrice) || 4) / (parseFloat(coilDays) || 10);
        dailyCost = liquidDailyCost + coilDailyCost;
        break;
        
      default:
        dailyCost = 0;
    }
    
    if (batteryPrice && batteryMonths) {
      dailyCost += parseFloat(batteryPrice) / (parseFloat(batteryMonths) * 30);
    }
    if (devicePrice && deviceMonths) {
      dailyCost += parseFloat(devicePrice) / (parseFloat(deviceMonths) * 30);
    }
    
    return dailyCost;
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
      batteryPrice: batteryPrice ? parseFloat(batteryPrice) : undefined,
      batteryMonths: batteryMonths ? parseFloat(batteryMonths) : undefined,
      devicePrice: devicePrice ? parseFloat(devicePrice) : undefined,
      deviceMonths: deviceMonths ? parseFloat(deviceMonths) : undefined,
      dailyCost,
      costPerWeek: dailyCost * 7,
      coilCost: parseFloat(coilPrice)
    };

    localStorage.setItem('app-settings', JSON.stringify(settings));
    toast.success(t('settings.saveButton'));

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <NotificationSettings
            notifications={notifications}
            notificationTime={notificationTime}
            onNotificationsChange={setNotifications}
            onNotificationTimeChange={setNotificationTime}
          />

          <CostSettings
            vaperType={vaperType}
            disposablePrice={disposablePrice}
            disposablesPerWeek={disposablesPerWeek}
            liquidPrice={liquidPrice}
            liquidSize={liquidSize}
            liquidMlPerWeek={liquidMlPerWeek}
            coilPrice={coilPrice}
            coilDays={coilDays}
            batteryPrice={batteryPrice}
            batteryMonths={batteryMonths}
            devicePrice={devicePrice}
            deviceMonths={deviceMonths}
            onVaperTypeChange={setVaperType}
            onDisposablePriceChange={setDisposablePrice}
            onDisposablesPerWeekChange={setDisposablesPerWeek}
            onLiquidPriceChange={setLiquidPrice}
            onLiquidSizeChange={setLiquidSize}
            onLiquidMlPerWeekChange={setLiquidMlPerWeek}
            onCoilPriceChange={setCoilPrice}
            onCoilDaysChange={setCoilDays}
            onBatteryPriceChange={setBatteryPrice}
            onBatteryMonthsChange={setBatteryMonths}
            onDevicePriceChange={setDevicePrice}
            onDeviceMonthsChange={setDeviceMonths}
          />

          <Button onClick={saveSettings} className="w-full">
            {t('settings.saveButton')}
          </Button>
        </CardContent>
      </Card>

      <LanguageSelector />
      <DataManagement />
      <AppInfo />
    </div>
  );
};

export default SettingsPanel;