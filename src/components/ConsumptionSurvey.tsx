import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ChevronRight, ChevronLeft, Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VaperType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const vaperTypes: VaperType[] = [
  {
    id: 'disposable',
    name: 'Desechable',
    description: 'Vaper de un solo uso, se tira cuando se acaba',
    icon: '🗑️'
  },
  {
    id: 'pod',
    name: 'Pod/Cartucho',
    description: 'Sistema de cartuchos recargables o reemplazables',
    icon: '📦'
  },
  {
    id: 'mod',
    name: 'Mod/Tanque',
    description: 'Sistema modular con tanque recargable y resistencias',
    icon: '🔧'
  }
];

interface ConsumptionData {
  vaperType: string;
  // Desechables
  disposablePrice?: number;
  disposableDuration?: number;
  disposablesPerWeek?: number;
  
  // Pods
  podPrice?: number;
  podDuration?: number;
  liquidMlPerWeek?: number;
  liquidPrice?: number;
  liquidSize?: number;
  
  // Mods
  modLiquidMlPerWeek?: number;
  modLiquidPrice?: number;
  modLiquidSize?: number;
  coilPrice?: number;
  coilDurationDays?: number;
  makeOwnCoils?: boolean;
  cottonPrice?: number;
  cottonDuration?: number;
  wirePrice?: number;
  wireDuration?: number;
  
  // Componentes adicionales (todos los tipos)
  batteryPrice?: number;
  batteryMonths?: number;
  devicePrice?: number;
  deviceMonths?: number;
}

interface ConsumptionSurveyProps {
  onComplete: (data: ConsumptionData) => void;
  onBack: () => void;
}

const ConsumptionSurvey = ({ onComplete, onBack }: ConsumptionSurveyProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ConsumptionData>({
    vaperType: '',
  });

  const updateData = (field: keyof ConsumptionData, value: number | string | boolean | undefined) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const calculateCosts = () => {
    let dailyCost = 0;
    
    switch (data.vaperType) {
      case 'disposable':
        if (data.disposablesPerWeek) {
          const avgDisposablePrice = data.disposablePrice || 8; // Precio promedio
          dailyCost = (data.disposablesPerWeek * avgDisposablePrice) / 7;
        }
        break;
        
      case 'pod':
        let podDailyCost = 0;
        // Coste de pods
        if (data.podPrice && data.podDuration) {
          podDailyCost += data.podPrice / data.podDuration;
        }
        // Coste de líquido (si usa pods recargables)
        if (data.liquidMlPerWeek && data.liquidPrice && data.liquidSize) {
          const bottlesPerWeek = data.liquidMlPerWeek / data.liquidSize;
          const liquidCostPerWeek = bottlesPerWeek * data.liquidPrice;
          podDailyCost += liquidCostPerWeek / 7;
        }
        dailyCost = podDailyCost;
        break;
        
      case 'mod':
        let modDailyCost = 0;
        // Coste de líquido
        if (data.modLiquidMlPerWeek && data.modLiquidPrice && data.modLiquidSize) {
          const bottlesPerWeek = data.modLiquidMlPerWeek / data.modLiquidSize;
          const liquidCostPerWeek = bottlesPerWeek * data.modLiquidPrice;
          modDailyCost += liquidCostPerWeek / 7;
        }
        // Coste de resistencias o materiales DIY
        if (data.makeOwnCoils) {
          // Coste de algodón y alambre
          if (data.cottonPrice && data.cottonDuration) {
            modDailyCost += data.cottonPrice / data.cottonDuration;
          }
          if (data.wirePrice && data.wireDuration) {
            modDailyCost += data.wirePrice / data.wireDuration;
          }
        } else {
          // Coste de resistencias comerciales
          if (data.coilPrice && data.coilDurationDays) {
            modDailyCost += data.coilPrice / data.coilDurationDays;
          }
        }
        dailyCost = modDailyCost;
        break;
    }
    
    // ✅ CORRECCIÓN CRÍTICA: Añadir costes adicionales (batería, dispositivo)
    if (data.batteryPrice && data.batteryMonths) {
      dailyCost += data.batteryPrice / (data.batteryMonths * 30);
    }
    if (data.devicePrice && data.deviceMonths) {
      dailyCost += data.devicePrice / (data.deviceMonths * 30);
    }
    
    return dailyCost;
  };

  const handleComplete = () => {
    const dailyCost = calculateCosts();
    const settings = {
      vaperType: data.vaperType,
      
      // Datos específicos por tipo
      disposablePrice: data.disposablePrice,
      disposablesPerWeek: data.disposablesPerWeek,
      podPrice: data.podPrice,
      podDuration: data.podDuration,
      liquidMlPerWeek: data.liquidMlPerWeek || data.modLiquidMlPerWeek,
      liquidPrice: data.liquidPrice || data.modLiquidPrice,
      liquidSize: data.liquidSize || data.modLiquidSize,
      coilPrice: data.coilPrice,
      coilDurationDays: data.coilDurationDays,
      makeOwnCoils: data.makeOwnCoils,
      cottonPrice: data.cottonPrice,
      cottonDuration: data.cottonDuration,
      wirePrice: data.wirePrice,
      wireDuration: data.wireDuration,
      
      // ✅ CORRECCIÓN: Guardar componentes adicionales
      batteryPrice: data.batteryPrice,
      batteryMonths: data.batteryMonths,
      devicePrice: data.devicePrice,
      deviceMonths: data.deviceMonths,
      
      // Cálculos finales
      dailyCost: dailyCost,
      costPerWeek: dailyCost * 7,
      coilCost: data.coilPrice || 0,
      coilDays: data.coilDurationDays || 7,
      additionalDailyCost: 0,
      notifications: true,
      notificationTime: '09:00'
    };
    
    localStorage.setItem('app-settings', JSON.stringify(settings));
    onComplete(data);
  };

  const renderVaperTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Tipo de vaper</h3>
        <p className="text-sm text-muted-foreground">Selecciona el tipo que usas habitualmente</p>
      </div>
      
      <div className="space-y-3">
        {vaperTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => updateData('vaperType', type.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              data.vaperType === type.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{type.icon}</span>
              <div className="text-left">
                <h4 className="font-medium">{type.name}</h4>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderDisposableConfig = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">🗑️ Configuración Desechables</h3>
        <p className="text-sm text-muted-foreground">Información sobre tu consumo de vapers desechables</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="disposables-week">¿Cuántos desechables usas por semana?</Label>
          <Select value={data.disposablesPerWeek?.toString() || ''} onValueChange={(value) => updateData('disposablesPerWeek', parseInt(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona cantidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 por semana</SelectItem>
              <SelectItem value="2">2 por semana</SelectItem>
              <SelectItem value="3">3 por semana</SelectItem>
              <SelectItem value="4">4 por semana</SelectItem>
              <SelectItem value="5">5 por semana</SelectItem>
              <SelectItem value="7">1 por día</SelectItem>
              <SelectItem value="14">2 por día</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="disposable-price">Precio promedio por desechable (€)</Label>
          <Input
            id="disposable-price"
            type="number"
            step="0.01"
            value={data.disposablePrice || ''}
            onChange={(e) => updateData('disposablePrice', parseFloat(e.target.value) || undefined)}
            placeholder="8.00"
          />
          <p className="text-xs text-gray-500">Precio típico: 6-12€ dependiendo de la marca y caladas</p>
        </div>
      </div>
    </div>
  );

  const renderPodConfig = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">📦 Configuración Pod/Cartucho</h3>
        <p className="text-sm text-muted-foreground">Información sobre pods y líquidos</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pod-price">Precio del pod/cartucho (€)</Label>
          <Input
            id="pod-price"
            type="number"
            step="0.01"
            value={data.podPrice || ''}
            onChange={(e) => updateData('podPrice', parseFloat(e.target.value) || undefined)}
            placeholder="4.50"
          />
          <p className="text-xs text-gray-500">Precio típico: 3-6€ por pod</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pod-duration">Duración del pod (días)</Label>
          <Select value={data.podDuration?.toString() || ''} onValueChange={(value) => updateData('podDuration', parseInt(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona duración" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 día</SelectItem>
              <SelectItem value="2">2 días</SelectItem>
              <SelectItem value="3">3 días</SelectItem>
              <SelectItem value="5">5 días</SelectItem>
              <SelectItem value="7">1 semana</SelectItem>
              <SelectItem value="10">10 días</SelectItem>
              <SelectItem value="14">2 semanas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">¿Tu pod es recargable con líquido?</h4>
          <p className="text-sm text-blue-600 mb-3">Si puedes rellenar el pod con líquido, configura también el consumo de líquido</p>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="liquid-ml-week">Líquido consumido por semana (ml)</Label>
              <Input
                id="liquid-ml-week"
                type="number"
                value={data.liquidMlPerWeek || ''}
                onChange={(e) => updateData('liquidMlPerWeek', parseFloat(e.target.value) || undefined)}
                placeholder="20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="liquid-size">Tamaño del bote (ml)</Label>
                <Select value={data.liquidSize?.toString() || ''} onValueChange={(value) => updateData('liquidSize', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10ml</SelectItem>
                    <SelectItem value="30">30ml</SelectItem>
                    <SelectItem value="50">50ml</SelectItem>
                    <SelectItem value="100">100ml</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="liquid-price">Precio del bote (€)</Label>
                <Input
                  id="liquid-price"
                  type="number"
                  step="0.01"
                  value={data.liquidPrice || ''}
                  onChange={(e) => updateData('liquidPrice', parseFloat(e.target.value) || undefined)}
                  placeholder="12.50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModConfig = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">🔧 Configuración Mod/Tanque</h3>
        <p className="text-sm text-muted-foreground">Sistema modular con tanque recargable</p>
      </div>
      
      <div className="space-y-4">
        {/* Líquido */}
        <div className="bg-blue-50 p-3 rounded-lg space-y-3">
          <h4 className="font-medium text-blue-800">Consumo de líquido</h4>
          
          <div className="space-y-2">
            <Label htmlFor="mod-liquid-ml">Líquido consumido por semana (ml)</Label>
            <Input
              id="mod-liquid-ml"
              type="number"
              value={data.modLiquidMlPerWeek || ''}
              onChange={(e) => updateData('modLiquidMlPerWeek', parseFloat(e.target.value) || undefined)}
              placeholder="35"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="mod-liquid-size">Tamaño del bote (ml)</Label>
              <Select value={data.modLiquidSize?.toString() || ''} onValueChange={(value) => updateData('modLiquidSize', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Tamaño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10ml</SelectItem>
                  <SelectItem value="30">30ml</SelectItem>
                  <SelectItem value="50">50ml</SelectItem>
                  <SelectItem value="100">100ml</SelectItem>
                  <SelectItem value="120">120ml</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mod-liquid-price">Precio del bote (€)</Label>
              <Input
                id="mod-liquid-price"
                type="number"
                step="0.01"
                value={data.modLiquidPrice || ''}
                onChange={(e) => updateData('modLiquidPrice', parseFloat(e.target.value) || undefined)}
                placeholder="15.00"
              />
            </div>
          </div>
        </div>

        {/* Resistencias */}
        <div className="bg-green-50 p-3 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-green-800">Resistencias</h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-green-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Puedes usar resistencias comerciales o fabricar las tuyas propias</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="make-coils"
              checked={data.makeOwnCoils || false}
              onCheckedChange={(checked) => updateData('makeOwnCoils', checked)}
            />
            <Label htmlFor="make-coils">Fabrico mis propias resistencias</Label>
          </div>

          {!data.makeOwnCoils ? (
            // Resistencias comerciales
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="coil-price">Precio de una resistencia (€)</Label>
                <Input
                  id="coil-price"
                  type="number"
                  step="0.01"
                  value={data.coilPrice || ''}
                  onChange={(e) => updateData('coilPrice', parseFloat(e.target.value) || undefined)}
                  placeholder="3.50"
                />
                <p className="text-xs text-gray-500">Precio típico: 2-5€ por resistencia</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coil-duration">Duración de la resistencia (días)</Label>
                <Select value={data.coilDurationDays?.toString() || ''} onValueChange={(value) => updateData('coilDurationDays', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 días</SelectItem>
                    <SelectItem value="5">5 días</SelectItem>
                    <SelectItem value="7">1 semana</SelectItem>
                    <SelectItem value="10">10 días</SelectItem>
                    <SelectItem value="14">2 semanas</SelectItem>
                    <SelectItem value="21">3 semanas</SelectItem>
                    <SelectItem value="30">1 mes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            // Materiales DIY
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="cotton-price">Precio algodón (€)</Label>
                  <Input
                    id="cotton-price"
                    type="number"
                    step="0.01"
                    value={data.cottonPrice || ''}
                    onChange={(e) => updateData('cottonPrice', parseFloat(e.target.value) || undefined)}
                    placeholder="8.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cotton-duration">Duración (días)</Label>
                  <Input
                    id="cotton-duration"
                    type="number"
                    value={data.cottonDuration || ''}
                    onChange={(e) => updateData('cottonDuration', parseFloat(e.target.value) || undefined)}
                    placeholder="90"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="wire-price">Precio alambre (€)</Label>
                  <Input
                    id="wire-price"
                    type="number"
                    step="0.01"
                    value={data.wirePrice || ''}
                    onChange={(e) => updateData('wirePrice', parseFloat(e.target.value) || undefined)}
                    placeholder="12.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wire-duration">Duración (días)</Label>
                  <Input
                    id="wire-duration"
                    type="number"
                    value={data.wireDuration || ''}
                    onChange={(e) => updateData('wireDuration', parseFloat(e.target.value) || undefined)}
                    placeholder="180"
                  />
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                Precio típico algodón: 5-10€ (dura 2-3 meses), alambre: 8-15€ (dura 4-6 meses)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAdditionalComponents = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Componentes adicionales</h3>
        <p className="text-sm text-muted-foreground">Gastos opcionales en baterías y dispositivos</p>
      </div>
      
      <div className="space-y-6">
        {/* Batería */}
        <div className="space-y-3">
          <h4 className="font-medium">Batería (opcional)</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="battery-price">Precio (€)</Label>
              <Input
                id="battery-price"
                type="number"
                step="0.01"
                value={data.batteryPrice || ''}
                onChange={(e) => updateData('batteryPrice', parseFloat(e.target.value) || undefined)}
                placeholder="15.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="battery-months">Duración (meses)</Label>
              <Select 
                value={data.batteryMonths?.toString() || ''} 
                onValueChange={(value) => updateData('batteryMonths', value ? parseInt(value) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 meses</SelectItem>
                  <SelectItem value="12">12 meses</SelectItem>
                  <SelectItem value="18">18 meses</SelectItem>
                  <SelectItem value="24">24 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Dispositivo */}
        <div className="space-y-3">
          <h4 className="font-medium">Dispositivo/Mod (opcional)</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="device-price">Precio (€)</Label>
              <Input
                id="device-price"
                type="number"
                step="0.01"
                value={data.devicePrice || ''}
                onChange={(e) => updateData('devicePrice', parseFloat(e.target.value) || undefined)}
                placeholder="50.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="device-months">Duración (meses)</Label>
              <Select 
                value={data.deviceMonths?.toString() || ''} 
                onValueChange={(value) => updateData('deviceMonths', value ? parseInt(value) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 meses</SelectItem>
                  <SelectItem value="18">18 meses</SelectItem>
                  <SelectItem value="24">24 meses</SelectItem>
                  <SelectItem value="36">36 meses</SelectItem>
                  <SelectItem value="48">48 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSummary = () => {
    const dailyCost = calculateCosts();
    const selectedVaper = vaperTypes.find(v => v.id === data.vaperType);
    
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Calculator className="w-12 h-12 mx-auto text-blue-600" />
          <h3 className="text-xl font-semibold">Resumen de costos</h3>
          <p className="text-sm text-muted-foreground">Cálculo basado en tu configuración</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{selectedVaper?.icon}</span>
              <span className="font-medium">{selectedVaper?.name}</span>
            </div>
            
            <div className="space-y-2 text-sm">
              {data.vaperType === 'disposable' && (
                <>
                  <div className="flex justify-between">
                    <span>Desechables por semana:</span>
                    <span>{data.disposablesPerWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precio promedio:</span>
                    <span>{data.disposablePrice?.toFixed(2) || '8.00'}€</span>
                  </div>
                </>
              )}
              
              {data.vaperType === 'pod' && (
                <>
                  <div className="flex justify-between">
                    <span>Precio pod:</span>
                    <span>{data.podPrice?.toFixed(2) || '0.00'}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duración pod:</span>
                    <span>{data.podDuration} días</span>
                  </div>
                  {data.liquidMlPerWeek && (
                    <div className="flex justify-between">
                      <span>Líquido semanal:</span>
                      <span>{data.liquidMlPerWeek}ml</span>
                    </div>
                  )}
                </>
              )}
              
              {data.vaperType === 'mod' && (
                <>
                  <div className="flex justify-between">
                    <span>Líquido semanal:</span>
                    <span>{data.modLiquidMlPerWeek}ml</span>
                  </div>
                  {data.makeOwnCoils ? (
                    <div className="flex justify-between">
                      <span>Resistencias:</span>
                      <span>DIY (algodón + alambre)</span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span>Resistencias:</span>
                      <span>{data.coilPrice?.toFixed(2)}€ cada {data.coilDurationDays} días</span>
                    </div>
                  )}
                </>
              )}
              
              {/* ✅ MOSTRAR COMPONENTES ADICIONALES EN EL RESUMEN */}
              {data.batteryPrice && data.batteryMonths && (
                <div className="flex justify-between">
                  <span>Batería:</span>
                  <span>{data.batteryPrice}€ cada {data.batteryMonths} meses</span>
                </div>
              )}
              
              {data.devicePrice && data.deviceMonths && (
                <div className="flex justify-between">
                  <span>Dispositivo:</span>
                  <span>{data.devicePrice}€ cada {data.deviceMonths} meses</span>
                </div>
              )}
              
              <div className="border-t pt-2 flex justify-between font-semibold text-base">
                <span>Costo diario total:</span>
                <span className="text-blue-600">{dailyCost.toFixed(2)}€</span>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Este cálculo se usará para estimar tus ahorros durante el proceso
          </div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return renderVaperTypeSelection();
      case 2:
        if (data.vaperType === 'disposable') return renderDisposableConfig();
        if (data.vaperType === 'pod') return renderPodConfig();
        if (data.vaperType === 'mod') return renderModConfig();
        return null;
      case 3:
        return renderAdditionalComponents();
      case 4:
        return renderSummary();
      default:
        return null;
    }
  };

  const canContinue = () => {
    switch (step) {
      case 1:
        return data.vaperType !== '';
      case 2:
        if (data.vaperType === 'disposable') {
          return data.disposablesPerWeek && data.disposablesPerWeek > 0;
        }
        if (data.vaperType === 'pod') {
          return data.podPrice && data.podDuration;
        }
        if (data.vaperType === 'mod') {
          return data.modLiquidMlPerWeek && data.modLiquidPrice && data.modLiquidSize &&
                 (data.makeOwnCoils ? 
                   (data.cottonPrice && data.cottonDuration && data.wirePrice && data.wireDuration) :
                   (data.coilPrice && data.coilDurationDays));
        }
        return false;
      case 3:
      case 4:
        return true;
      default:
        return false;
    }
  };

  const totalSteps = 4;

  return (
    <TooltipProvider>
      <div className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-center">
              Configuración de consumo
              <div className="text-sm font-normal text-muted-foreground mt-1">
                Paso {step} de {totalSteps}
              </div>
            </CardTitle>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6 max-h-[60vh] overflow-y-auto">
            {renderStep()}
          </CardContent>
          
          <div className="p-6 pt-0">
            <div className="flex justify-between gap-3">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Anterior
                </Button>
              ) : (
                <Button variant="outline" onClick={onBack}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Volver
                </Button>
              )}
              
              {step < totalSteps ? (
                <Button 
                  onClick={() => setStep(step + 1)}
                  disabled={!canContinue()}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleComplete}>
                  Completar configuración
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default ConsumptionSurvey;