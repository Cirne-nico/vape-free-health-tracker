
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, ChevronLeft, Calculator } from 'lucide-react';

interface ConsumptionData {
  mlPerWeek: number;
  bottleSize: number;
  bottlePrice: number;
  coilPrice: number;
  coilDurationDays: number;
  batteryPrice?: number;
  batteryMonths?: number;
  modPrice?: number;
  modMonths?: number;
  glassPrice?: number;
  glassMonths?: number;
  atomizerPrice?: number;
  atomizerMonths?: number;
}

interface ConsumptionSurveyProps {
  onComplete: (data: ConsumptionData) => void;
  onBack: () => void;
}

const ConsumptionSurvey = ({ onComplete, onBack }: ConsumptionSurveyProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ConsumptionData>({
    mlPerWeek: 0,
    bottleSize: 10,
    bottlePrice: 0,
    coilPrice: 0,
    coilDurationDays: 7,
  });

  const updateData = (field: keyof ConsumptionData, value: number | undefined) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const calculateCosts = () => {
    const bottlesPerWeek = data.mlPerWeek / data.bottleSize;
    const liquidCostPerWeek = bottlesPerWeek * data.bottlePrice;
    const coilCostPerDay = data.coilPrice / data.coilDurationDays;
    
    let additionalDailyCost = 0;
    
    if (data.batteryPrice && data.batteryMonths) {
      additionalDailyCost += data.batteryPrice / (data.batteryMonths * 30);
    }
    if (data.modPrice && data.modMonths) {
      additionalDailyCost += data.modPrice / (data.modMonths * 30);
    }
    if (data.glassPrice && data.glassMonths) {
      additionalDailyCost += data.glassPrice / (data.glassMonths * 30);
    }
    if (data.atomizerPrice && data.atomizerMonths) {
      additionalDailyCost += data.atomizerPrice / (data.atomizerMonths * 30);
    }

    return {
      costPerWeek: liquidCostPerWeek,
      coilCost: data.coilPrice,
      coilDays: data.coilDurationDays,
      additionalDailyCost
    };
  };

  const handleComplete = () => {
    const costs = calculateCosts();
    const settings = {
      costPerWeek: costs.costPerWeek,
      coilCost: costs.coilCost,
      coilDays: costs.coilDays,
      additionalDailyCost: costs.additionalDailyCost,
      notifications: true,
      notificationTime: '09:00'
    };
    
    localStorage.setItem('app-settings', JSON.stringify(settings));
    onComplete(data);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Consumo de líquido</h3>
              <p className="text-sm text-muted-foreground">Ayúdanos a calcular tus gastos</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ml-week">¿Cuántos ml consumes aproximadamente a la semana?</Label>
                <Input
                  id="ml-week"
                  type="number"
                  value={data.mlPerWeek || ''}
                  onChange={(e) => updateData('mlPerWeek', parseFloat(e.target.value) || 0)}
                  placeholder="Ej: 35"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bottle-size">Tamaño del bote que compras habitualmente</Label>
                <Select value={data.bottleSize.toString()} onValueChange={(value) => updateData('bottleSize', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10ml</SelectItem>
                    <SelectItem value="50">50ml</SelectItem>
                    <SelectItem value="100">100ml</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bottle-price">Precio del bote (€)</Label>
                <Input
                  id="bottle-price"
                  type="number"
                  step="0.01"
                  value={data.bottlePrice || ''}
                  onChange={(e) => updateData('bottlePrice', parseFloat(e.target.value) || 0)}
                  placeholder="Ej: 12.50"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Resistencias</h3>
              <p className="text-sm text-muted-foreground">Información sobre tus resistencias</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coil-price">Precio de una resistencia (€)</Label>
                <Input
                  id="coil-price"
                  type="number"
                  step="0.01"
                  value={data.coilPrice || ''}
                  onChange={(e) => updateData('coilPrice', parseFloat(e.target.value) || 0)}
                  placeholder="Ej: 3.50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coil-duration">¿Cada cuántos días cambias la resistencia?</Label>
                <Input
                  id="coil-duration"
                  type="number"
                  value={data.coilDurationDays || ''}
                  onChange={(e) => updateData('coilDurationDays', parseInt(e.target.value) || 7)}
                  placeholder="Ej: 7"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Componentes adicionales</h3>
              <p className="text-sm text-muted-foreground">Información opcional sobre otros gastos</p>
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
                    <Input
                      id="battery-months"
                      type="number"
                      value={data.batteryMonths || ''}
                      onChange={(e) => updateData('batteryMonths', parseInt(e.target.value) || undefined)}
                      placeholder="12"
                    />
                  </div>
                </div>
              </div>

              {/* Mod */}
              <div className="space-y-3">
                <h4 className="font-medium">Mod/Dispositivo (opcional)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="mod-price">Precio (€)</Label>
                    <Input
                      id="mod-price"
                      type="number"
                      step="0.01"
                      value={data.modPrice || ''}
                      onChange={(e) => updateData('modPrice', parseFloat(e.target.value) || undefined)}
                      placeholder="50.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mod-months">Duración (meses)</Label>
                    <Input
                      id="mod-months"
                      type="number"
                      value={data.modMonths || ''}
                      onChange={(e) => updateData('modMonths', parseInt(e.target.value) || undefined)}
                      placeholder="24"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Más componentes</h3>
              <p className="text-sm text-muted-foreground">Últimos detalles opcionales</p>
            </div>
            
            <div className="space-y-6">
              {/* Pyrex/Cristal */}
              <div className="space-y-3">
                <h4 className="font-medium">Pyrex/Cristal (opcional)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="glass-price">Precio (€)</Label>
                    <Input
                      id="glass-price"
                      type="number"
                      step="0.01"
                      value={data.glassPrice || ''}
                      onChange={(e) => updateData('glassPrice', parseFloat(e.target.value) || undefined)}
                      placeholder="5.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="glass-months">Duración (meses)</Label>
                    <Input
                      id="glass-months"
                      type="number"
                      value={data.glassMonths || ''}
                      onChange={(e) => updateData('glassMonths', parseInt(e.target.value) || undefined)}
                      placeholder="6"
                    />
                  </div>
                </div>
              </div>

              {/* Atomizador */}
              <div className="space-y-3">
                <h4 className="font-medium">Atomizador (opcional)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="atomizer-price">Precio (€)</Label>
                    <Input
                      id="atomizer-price"
                      type="number"
                      step="0.01"
                      value={data.atomizerPrice || ''}
                      onChange={(e) => updateData('atomizerPrice', parseFloat(e.target.value) || undefined)}
                      placeholder="25.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="atomizer-months">Duración (meses)</Label>
                    <Input
                      id="atomizer-months"
                      type="number"
                      value={data.atomizerMonths || ''}
                      onChange={(e) => updateData('atomizerMonths', parseInt(e.target.value) || undefined)}
                      placeholder="12"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        const costs = calculateCosts();
        const totalDailyCost = (costs.costPerWeek / 7) + (costs.coilCost / costs.coilDays) + costs.additionalDailyCost;
        
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Calculator className="w-12 h-12 mx-auto text-blue-600" />
              <h3 className="text-xl font-semibold">Resumen de costos</h3>
              <p className="text-sm text-muted-foreground">Cálculo basado en tus datos</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Líquido por semana:</span>
                  <span className="font-medium">{costs.costPerWeek.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Resistencias por día:</span>
                  <span className="font-medium">{(costs.coilCost / costs.coilDays).toFixed(2)}€</span>
                </div>
                {costs.additionalDailyCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm">Otros componentes por día:</span>
                    <span className="font-medium">{costs.additionalDailyCost.toFixed(2)}€</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Costo diario total:</span>
                  <span className="text-blue-600">{totalDailyCost.toFixed(2)}€</span>
                </div>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                Este cálculo se usará para estimar tus ahorros
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canContinue = () => {
    switch (step) {
      case 1:
        return data.mlPerWeek > 0 && data.bottlePrice > 0;
      case 2:
        return data.coilPrice > 0 && data.coilDurationDays > 0;
      case 3:
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Configuración de consumo
          <div className="text-sm font-normal text-muted-foreground mt-1">
            Paso {step} de 5
          </div>
        </CardTitle>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderStep()}
        
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
          
          {step < 5 ? (
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
      </CardContent>
    </Card>
  );
};

export default ConsumptionSurvey;
