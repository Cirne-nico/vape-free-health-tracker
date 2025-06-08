
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import contenidosData from '@/data/contenidos.json';

interface DayContentCardProps {
  startDate: Date | null;
}

const DayContentCard = ({ startDate }: DayContentCardProps) => {
  const getCurrentDayContent = () => {
    if (!startDate) return null;
    
    const hoursSince = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60));
    
    // Buscar el contenido más reciente según las horas transcurridas
    const availableContent = contenidosData.filter(content => content.hora <= hoursSince);
    
    if (availableContent.length === 0) {
      return {
        sintesis: "¡Has comenzado tu viaje! Los primeros minutos son cruciales.",
        consejo: "Respira profundo y mantente hidratado. Cada minuto cuenta.",
        recordatorio: "Tu cuerpo está iniciando el proceso de recuperación.",
        contrareplica: "No es una pérdida. Es el comienzo de mi libertad."
      };
    }
    
    // Obtener el contenido más reciente
    return availableContent[availableContent.length - 1];
  };

  const dayContent = getCurrentDayContent();
  const hoursSince = startDate ? Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60)) : 0;

  if (!dayContent) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50">
      <CardHeader>
        <CardTitle className="text-blue-700">
          {hoursSince >= 24 ? `Día ${Math.floor(hoursSince / 24)}` : `${hoursSince} horas`} sin vapear
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-blue-700 mb-1">📋 Evolución:</p>
            <p className="text-gray-700">{dayContent.sintesis}</p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-700 mb-1">💡 Consejo:</p>
            <p className="text-gray-700">{dayContent.consejo}</p>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-yellow-700 mb-1">🔔 Recordatorio:</p>
            <p className="text-gray-700">{dayContent.recordatorio}</p>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <p className="text-sm font-medium text-purple-700 mb-1">💪 Pensamiento intrusivo:</p>
            <p className="text-gray-700 font-medium italic">"{dayContent.contrareplica}"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DayContentCard;
