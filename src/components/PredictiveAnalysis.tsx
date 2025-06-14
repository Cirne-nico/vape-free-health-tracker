import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TooltipHelper } from '@/components/ui/tooltip-helper';
import { Brain, AlertTriangle, TrendingUp, Clock, Target } from 'lucide-react';

interface PredictiveAnalysisProps {
  currentDay: number;
}

const PredictiveAnalysis = ({ currentDay }: PredictiveAnalysisProps) => {
  const [emotionLogs, setEmotionLogs] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('emotion-logs') || '[]');
    setEmotionLogs(logs);
    
    if (logs.length >= 3) {
      analyzePatterns(logs);
    }
  }, [currentDay]);

  const analyzePatterns = (logs: any[]) => {
    // Análisis de patrones emocionales
    const recentLogs = logs.slice(-7); // Últimos 7 días
    
    // Identificar días de mayor vulnerabilidad
    const vulnerableDays = recentLogs.filter(log => {
      const negativeEmotions = log.emotions.filter((id: string) => 
        ['anxious', 'sad', 'angry', 'frustrated', 'lonely', 'stressed'].includes(id)
      );
      return negativeEmotions.length > log.emotions.length / 2;
    });

    // Patrones de tiempo
    const timePatterns = logs.map(log => ({
      day: log.day,
      hour: new Date(log.date).getHours(),
      hasNegative: log.emotions.some((id: string) => 
        ['anxious', 'sad', 'angry', 'frustrated', 'lonely', 'stressed'].includes(id)
      )
    }));

    // Horas más vulnerables
    const hourlyVulnerability: { [hour: number]: number } = {};
    timePatterns.forEach(pattern => {
      if (pattern.hasNegative) {
        hourlyVulnerability[pattern.hour] = (hourlyVulnerability[pattern.hour] || 0) + 1;
      }
    });

    const mostVulnerableHourEntry = Object.entries(hourlyVulnerability)
      .sort(([,a], [,b]) => b - a)[0];

    // Tendencia general
    const positiveCount = recentLogs.reduce((acc, log) => 
      acc + log.emotions.filter((id: string) => 
        ['happy', 'calm', 'confident', 'motivated', 'proud', 'energetic'].includes(id)
      ).length, 0
    );

    const negativeCount = recentLogs.reduce((acc, log) => 
      acc + log.emotions.filter((id: string) => 
        ['anxious', 'sad', 'angry', 'frustrated', 'lonely', 'stressed'].includes(id)
      ).length, 0
    );

    const trend = positiveCount > negativeCount ? 'improving' : 
                 positiveCount < negativeCount ? 'declining' : 'stable';

    // Predicciones y recomendaciones
    const predictions = generatePredictions(currentDay, trend, vulnerableDays.length);
    const recommendations = generateRecommendations(trend, mostVulnerableHourEntry ? parseInt(mostVulnerableHourEntry[0]) : null, vulnerableDays.length);

    setAnalysis({
      vulnerableDays: vulnerableDays.length,
      mostVulnerableHour: mostVulnerableHourEntry ? parseInt(mostVulnerableHourEntry[0]) : null,
      trend,
      predictions,
      recommendations,
      totalLogs: logs.length
    });
  };

  const generatePredictions = (day: number, trend: string, vulnerableDays: number) => {
    const predictions = [];

    // Predicción de riesgo de recaída
    let riskLevel = 'bajo';
    if (vulnerableDays >= 4) riskLevel = 'alto';
    else if (vulnerableDays >= 2) riskLevel = 'medio';

    predictions.push({
      type: 'risk',
      level: riskLevel,
      description: `Riesgo de momentos difíciles: ${riskLevel}`,
      advice: riskLevel === 'alto' ? 'Considera buscar apoyo adicional' :
              riskLevel === 'medio' ? 'Mantente alerta y usa tus estrategias' :
              'Continúa con tu rutina actual'
    });

    // Predicción de próximos hitos
    const nextMilestones = [7, 14, 30, 60, 90].filter(milestone => milestone > day);
    if (nextMilestones.length > 0) {
      const nextMilestone = nextMilestones[0];
      const probability = trend === 'improving' ? 85 : trend === 'stable' ? 70 : 55;
      
      predictions.push({
        type: 'milestone',
        milestone: nextMilestone,
        probability,
        description: `Probabilidad de alcanzar ${nextMilestone} días: ${probability}%`,
        advice: `Faltan ${nextMilestone - day} días para tu próximo gran logro`
      });
    }

    return predictions;
  };

  const generateRecommendations = (trend: string, vulnerableHour: number | null, vulnerableDays: number) => {
    const recommendations = [];

    // Recomendaciones basadas en tendencia
    if (trend === 'declining') {
      recommendations.push({
        type: 'urgent',
        title: 'Refuerza tus estrategias',
        description: 'Los últimos días muestran más emociones desafiantes. Es normal, pero importante actuar.',
        actions: ['Revisa tus técnicas de relajación', 'Contacta con tu red de apoyo', 'Considera actividades nuevas']
      });
    } else if (trend === 'improving') {
      recommendations.push({
        type: 'positive',
        title: '¡Vas por buen camino!',
        description: 'Tu estado emocional muestra una tendencia positiva.',
        actions: ['Mantén las estrategias actuales', 'Celebra tus pequeños éxitos', 'Ayuda a otros que estén empezando']
      });
    }

    // Recomendaciones basadas en hora vulnerable
    if (vulnerableHour !== null) {
      const timeDescription = vulnerableHour < 12 ? 'mañana' : 
                            vulnerableHour < 18 ? 'tarde' : 'noche';
      
      recommendations.push({
        type: 'temporal',
        title: `Atención en horas de ${timeDescription}`,
        description: `Detectamos más emociones desafiantes alrededor de las ${vulnerableHour}:00h`,
        actions: [
          'Planifica actividades alternativas para esa hora',
          'Ten estrategias específicas preparadas',
          'Considera cambiar tu rutina en esos momentos'
        ]
      });
    }

    return recommendations;
  };

  if (!analysis || emotionLogs.length < 3) {
    return (
      <Card className="border-dashed">
        <CardContent className="text-center py-8">
          <Brain className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <h3 className="font-semibold text-gray-600 mb-2">Análisis Predictivo</h3>
          <p className="text-sm text-gray-500">
            Registra tus emociones durante al menos 3 días para obtener 
            análisis personalizados y predicciones útiles.
          </p>
          <Badge variant="outline" className="mt-3">
            {emotionLogs.length}/3 registros mínimos
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Análisis Predictivo
          <TooltipHelper
            content={
              <div className="space-y-2">
                <p className="font-semibold">¿Qué es esto?</p>
                <p className="text-sm">Un análisis basado en tus patrones emocionales que predice posibles desafíos y oportunidades en tu proceso.</p>
                <p className="text-sm">Todas las predicciones son orientativas y mejoran con más datos.</p>
              </div>
            }
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tendencia General */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Tendencia Emocional</span>
          </div>
          <Badge variant={
            analysis.trend === 'improving' ? 'default' : 
            analysis.trend === 'declining' ? 'destructive' : 'secondary'
          }>
            {analysis.trend === 'improving' ? '📈 Mejorando' :
             analysis.trend === 'declining' ? '📉 Desafiante' : '➡️ Estable'}
          </Badge>
          <p className="text-sm text-gray-600 mt-1">
            Basado en tus últimos {Math.min(7, emotionLogs.length)} registros
          </p>
        </div>

        {/* Predicciones */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Predicciones
          </h4>
          <div className="space-y-3">
            {analysis.predictions.map((prediction: any, index: number) => (
              <Alert key={index} className={
                prediction.level === 'alto' ? 'border-red-200 bg-red-50' :
                prediction.level === 'medio' ? 'border-yellow-200 bg-yellow-50' :
                'border-green-200 bg-green-50'
              }>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium">{prediction.description}</p>
                  <p className="text-sm mt-1">{prediction.advice}</p>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>

        {/* Recomendaciones */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recomendaciones Personalizadas
          </h4>
          <div className="space-y-3">
            {analysis.recommendations.map((rec: any, index: number) => (
              <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <h5 className="font-medium text-blue-900 mb-2">{rec.title}</h5>
                <p className="text-sm text-blue-700 mb-2">{rec.description}</p>
                <ul className="text-xs text-blue-600 space-y-1">
                  {rec.actions.map((action: string, i: number) => (
                    <li key={i}>• {action}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
          <p className="text-xs text-purple-700">
            🧠 Este análisis se basa en tus patrones únicos y mejora con más datos. 
            Todas las predicciones son orientativas y completamente privadas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveAnalysis;