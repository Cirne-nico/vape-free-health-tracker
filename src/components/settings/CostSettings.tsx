import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

interface CostSettingsProps {
  vaperType: string;
  disposablePrice: string;
  disposablesPerWeek: string;
  liquidPrice: string;
  liquidSize: string;
  liquidMlPerWeek: string;
  coilPrice: string;
  coilDays: string;
  batteryPrice: string;
  batteryMonths: string;
  devicePrice: string;
  deviceMonths: string;
  onVaperTypeChange: (value: string) => void;
  onDisposablePriceChange: (value: string) => void;
  onDisposablesPerWeekChange: (value: string) => void;
  onLiquidPriceChange: (value: string) => void;
  onLiquidSizeChange: (value: string) => void;
  onLiquidMlPerWeekChange: (value: string) => void;
  onCoilPriceChange: (value: string) => void;
  onCoilDaysChange: (value: string) => void;
  onBatteryPriceChange: (value: string) => void;
  onBatteryMonthsChange: (value: string) => void;
  onDevicePriceChange: (value: string) => void;
  onDeviceMonthsChange: (value: string) => void;
}

const CostSettings = ({
  vaperType,
  disposablePrice,
  disposablesPerWeek,
  liquidPrice,
  liquidSize,
  liquidMlPerWeek,
  coilPrice,
  coilDays,
  batteryPrice,
  batteryMonths,
  devicePrice,
  deviceMonths,
  onVaperTypeChange,
  onDisposablePriceChange,
  onDisposablesPerWeekChange,
  onLiquidPriceChange,
  onLiquidSizeChange,
  onLiquidMlPerWeekChange,
  onCoilPriceChange,
  onCoilDaysChange,
  onBatteryPriceChange,
  onBatteryMonthsChange,
  onDevicePriceChange,
  onDeviceMonthsChange
}: CostSettingsProps) => {
  const { t } = useTranslation();
  
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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('settings.costs.title')}</h3>
      
      <div className="space-y-2">
        <Label htmlFor="vaper-type">{t('settings.costs.vaperType')}</Label>
        <Select value={vaperType} onValueChange={onVaperTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder={t('settings.costs.vaperType')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="disposable">{t('settings.costs.types.disposable')}</SelectItem>
            <SelectItem value="pod">{t('settings.costs.types.pod')}</SelectItem>
            <SelectItem value="mod">{t('settings.costs.types.mod')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {vaperType === 'disposable' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="disposables-week">{t('settings.costs.disposable.perWeek')}</Label>
            <Input
              id="disposables-week"
              type="number"
              step="0.5"
              value={disposablesPerWeek}
              onChange={(e) => onDisposablesPerWeekChange(e.target.value)}
              placeholder="2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disposable-price">{t('settings.costs.disposable.price')}</Label>
            <Input
              id="disposable-price"
              type="number"
              step="0.01"
              value={disposablePrice}
              onChange={(e) => onDisposablePriceChange(e.target.value)}
              placeholder="8.00"
            />
          </div>
        </div>
      )}

      {vaperType === 'pod' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="liquid-ml-week">{t('settings.costs.liquid.perWeek')}</Label>
            <Input
              id="liquid-ml-week"
              type="number"
              value={liquidMlPerWeek}
              onChange={(e) => onLiquidMlPerWeekChange(e.target.value)}
              placeholder="20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liquid-size">{t('settings.costs.liquid.size')}</Label>
            <Input
              id="liquid-size"
              type="number"
              value={liquidSize}
              onChange={(e) => onLiquidSizeChange(e.target.value)}
              placeholder="30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liquid-price">{t('settings.costs.liquid.price')}</Label>
            <Input
              id="liquid-price"
              type="number"
              step="0.01"
              value={liquidPrice}
              onChange={(e) => onLiquidPriceChange(e.target.value)}
              placeholder="12.00"
            />
          </div>
        </div>
      )}

      {vaperType === 'mod' && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mod-liquid-ml">{t('settings.costs.liquid.perWeek')}</Label>
              <Input
                id="mod-liquid-ml"
                type="number"
                value={liquidMlPerWeek}
                onChange={(e) => onLiquidMlPerWeekChange(e.target.value)}
                placeholder="20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mod-liquid-size">{t('settings.costs.liquid.size')}</Label>
              <Input
                id="mod-liquid-size"
                type="number"
                value={liquidSize}
                onChange={(e) => onLiquidSizeChange(e.target.value)}
                placeholder="30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mod-liquid-price">{t('settings.costs.liquid.price')}</Label>
              <Input
                id="mod-liquid-price"
                type="number"
                step="0.01"
                value={liquidPrice}
                onChange={(e) => onLiquidPriceChange(e.target.value)}
                placeholder="12.00"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coil-price">{t('settings.costs.coil.price')}</Label>
              <Input
                id="coil-price"
                type="number"
                step="0.01"
                value={coilPrice}
                onChange={(e) => onCoilPriceChange(e.target.value)}
                placeholder="4.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coil-days">{t('settings.costs.coil.duration')}</Label>
              <Input
                id="coil-days"
                type="number"
                value={coilDays}
                onChange={(e) => onCoilDaysChange(e.target.value)}
                placeholder="10"
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-medium text-yellow-800">{t('settings.costs.additional.title')}</h4>
        <p className="text-sm text-yellow-700">{t('settings.costs.additional.description')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h5 className="font-medium text-sm">{t('settings.costs.additional.battery.title')}</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="battery-price" className="text-xs">{t('settings.costs.additional.battery.price')}</Label>
                <Input
                  id="battery-price"
                  type="number"
                  step="0.01"
                  value={batteryPrice}
                  onChange={(e) => onBatteryPriceChange(e.target.value)}
                  placeholder="15.00"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="battery-months" className="text-xs">{t('settings.costs.additional.battery.duration')}</Label>
                <Select value={batteryMonths} onValueChange={onBatteryMonthsChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Meses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-medium text-sm">{t('settings.costs.additional.device.title')}</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="device-price" className="text-xs">{t('settings.costs.additional.device.price')}</Label>
                <Input
                  id="device-price"
                  type="number"
                  step="0.01"
                  value={devicePrice}
                  onChange={(e) => onDevicePriceChange(e.target.value)}
                  placeholder="50.00"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="device-months" className="text-xs">{t('settings.costs.additional.device.duration')}</Label>
                <Select value={deviceMonths} onValueChange={onDeviceMonthsChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Meses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="36">36</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>{t('settings.costs.estimatedCost')}</strong> {calculateDailyCost().toFixed(2)}€
        </p>
        <p className="text-xs text-blue-600 mt-1">
          {t('settings.costs.costExplanation')}
        </p>
      </div>
    </div>
  );
};

export default CostSettings;