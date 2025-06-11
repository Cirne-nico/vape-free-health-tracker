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

  // Función para generar pensamientos intrusivos que encajen con las contrarréplicas existentes
  const getIntrusiveThoughtForResponse = (contrareplica: string) => {
    // Mapeo de contrarréplicas a pensamientos intrusivos que encajan
    const responseToThoughtMap: { [key: string]: string } = {
      "No es una pérdida. Es el comienzo de mi libertad.": "He perdido algo importante al dejar de vapear",
      "No es ansiedad. Es el cuerpo recuperando su ritmo autónomo.": "Esta ansiedad significa que algo va mal",
      "No estoy nervioso. Estoy transitando el reinicio bioquímico.": "Estos nervios son una señal de que necesito vapear",
      "Cada vez que he cedido 'solo una calada', he vuelto a vapear en días. Este pensamiento no funciona.": "Solo una calada no hará daño",
      "No estoy enfermo. Estoy drenando residuos químicos acumulados.": "Me estoy poniendo enfermo sin el vapeo",
      "No estoy agotado. Mi cuerpo está trabajando en su limpieza interna.": "Estoy demasiado cansado, necesito energía del vapeo",
      "No es hambre real. Es mi sistema buscando estabilidad.": "Tengo hambre constante sin vapear",
      "No es una recaída en la salud. Es una mejora que se manifiesta con limpieza.": "Esta tos significa que estoy empeorando",
      "No es casualidad. Es una transformación lenta pero segura.": "Estos cambios son casuales, no reales",
      "No es un pequeño logro. Es un paso de gigante.": "Un día no es nada, es muy poco progreso",
      "No es necesidad. Es automatismo que puede ser interrumpido.": "Realmente necesito vapear ahora",
      "No es déficit de atención. Es deshabituación del estímulo nicotínico constante.": "No puedo concentrarme sin nicotina",
      "No estoy perdiendo el control. Estoy aprendiendo a manejarme sin filtros químicos.": "Estoy perdiendo el control de mis emociones",
      "No necesito excitar mi mente artificialmente. Puedo cultivarla desde dentro.": "Mi mente está apagada sin estimulación",
      "No son cambios sutiles. Es mi cuerpo respirando vida sin obstáculos.": "No noto ningún cambio real",
      "No es insomnio. Es reinicio del sistema reparador nocturno.": "No puedo dormir sin vapear",
      "No es casualidad. Es la microbiota agradeciendo el cambio de condiciones.": "Estos problemas digestivos son casuales",
      "No es migraña. Es cerebro recibiendo flujo sanguíneo completo.": "Este dolor de cabeza es insoportable",
      "No es infección. Es boca limpiando residuos de saborizantes.": "Tengo alguna infección en la boca",
      "No es bronquitis. Es árbol respiratorio reconstruyendo defensas.": "Esta tos parece bronquitis",
      "No es alergia. Es mucosas recuperando protección natural.": "Debo ser alérgico a algo",
      "No estoy igual. Estoy en proceso activo de desintoxicación.": "No he cambiado nada, sigo igual",
      "No es enfermedad. Es hígado metabolizando sin aditivos.": "Mi hígado debe estar enfermo",
      "No necesito vaporizar. Pulmones recomponiendo estructura alveolar.": "Necesito vapear para respirar mejor",
      "No es gingivitis. Es microbioma restaurando equilibrio.": "Tengo gingivitis por dejar de vapear",
      "No es casualidad. Es piel recuperando homeostasis hídrica.": "Mi piel está peor por casualidad",
      "Siempre que he pensado 'solo una calada', he terminado vapeando regularmente en días o semanas.": "Solo una calada para probar que tengo control",
      "No es indigestión. Es intestino recuperando ritmo natural.": "Tengo problemas digestivos sin vapear",
      "No fue suerte. Fue mi cuerpo demostrando capacidad reparadora.": "He llegado hasta aquí por suerte",
      "No es fatiga crónica. Es órgano dedicando energía a detoxificación.": "Tengo fatiga crónica",
      "No necesito vapor. Necesito tiempo para reconstrucción alveolar.": "Necesito vapor para sentirme normal",
      "No es colon irritable. Es microbioma restableciendo equilibrio.": "Tengo síndrome de colon irritable",
      "No es TDA. Es atención aprendiendo a sostenerse sin estimulantes.": "Tengo déficit de atención",
      "No es mejor imaginada. Es mi sistema vascular funcionando sin tóxicos.": "Esta mejora es solo imaginación",
      "No necesito vapear. Necesito reconfigurar respuestas contextuales.": "Necesito vapear en ciertas situaciones",
      "No fue gingivitis. Fue agresión crónica por solventes.": "Tenía gingivitis real",
      "No es insomnio. Es mi cerebro reorganizando fases de sueño.": "Tengo insomnio crónico",
      "No es hiperosmia. Es olfato funcionando en rango completo.": "Tengo hipersensibilidad olfativa",
      "No es casual. Es dermis recuperando integridad estructural.": "Los cambios en mi piel son casuales",
      "No necesito vapear para relajarme. Sistema neuroendocrino es autónomo.": "Necesito vapear para relajarme",
      "No estoy más lento. Proceso información con mayor precisión.": "Estoy más lento mentalmente",
      "No es hipotiroidismo. Es glándula recuperando regulación natural.": "Tengo problemas de tiroides",
      "No estoy 'curado'. Estoy en transición a mantenimiento emocional.": "Ya estoy curado, puedo vapear ocasionalmente",
      "No es regresión. Es cerebro recalibrando sistema recompensa.": "Estoy retrocediendo en mi progreso",
      "Prefiero vapear y no estar tan triste' - Estudios muestran que la tristeza post-cesación es temporal (6-12 semanas), pero vapear perpetúa la disregulación dopaminérgica indefinidamente.": "Prefiero vapear y no estar tan triste",
      "No extraño vapear. Extraño la falsa solución emocional que ofrecía.": "Extraño vapear realmente",
      "No estoy reviviendo. Estoy recordando sin anestesia química.": "Estoy reviviendo traumas del pasado",
      "No es depresión. Es sistema recompensa aprendiendo a funcionar sin estímulos artificiales.": "Estoy deprimido sin vapear",
      "No es hipocondría. Es reconexión mente-cuerpo post-adicción.": "Me estoy volviendo hipocondríaco",
      "No es esfuerzo. Es creación de caminos neuronales alternativos.": "Esto requiere demasiado esfuerzo",
      "No es suerte. Es resultado de trabajo neuroemocional constante.": "He tenido suerte hasta ahora",
      "No es deseo real. Es memoria condicionada buscando activación.": "Realmente deseo vapear",
      "No necesito vapear para calmarme. Tengo recursos internos suficientes.": "Necesito vapear para calmarme",
      "No es insomnio residual. Es sueño natural sin alteraciones químicas.": "Tengo insomnio residual",
      "No soy invulnerable. Mantengo vigilancia atenta sin paranoia.": "Soy invulnerable a las recaídas",
      "No soy frío. Estoy aprendiendo a relacionarme sin intermediarios químicos.": "Me he vuelto frío emocionalmente",
      "No es euforia. Es mi mente funcionando sin bloqueos químicos.": "Esta creatividad es solo euforia temporal",
      "No soy ex-vaper. Soy alguien que no vapea.": "Soy un ex-vaper, siempre lo seré",
      "No necesito escapar. Puedo sostener lo que sea temporalmente.": "Necesito escapar de este malestar",
      "No es permanente. Es el último intento de la adicción por sobrevivir.": "Esta tristeza es permanente",
      "No es poco. Es suficiente para un cerebro en recalibración.": "Estos pequeños placeres no son suficientes",
      "No es peligro. Es oportunidad para reconfigurar asociaciones.": "Estar en estos lugares es peligroso",
      "No es premonición. Es cerebro procesando el cambio de identidad.": "Estos sueños son premoniciones de recaída",
      "No soy plano. Soy estable sin alteraciones químicas externas.": "Me he vuelto emocionalmente plano",
      "No es el final. Es el comienzo de la fase de mantenimiento sólido.": "Ya terminé, esto es el final",
      "No es autoengano. Es evidencia acumulada de mi capacidad de cambio.": "Me estoy autoengañando",
      "No es vacío. Es espacio para autoconocimiento sin intermediarios.": "Siento un vacío existencial",
      "No soy 'ex-vaper'. Soy 'persona libre de vapeo'.": "Siempre seré un ex-vaper",
      "No es tentación. Es el eco de un hábito moribundo.": "Esta es una tentación real",
      "No es automático. Es el fruto de mi trabajo neuroemocional.": "Esto debería ser automático ya",
      "No es pérdida de tiempo. Es inversión en reparación neurológica.": "Dormir tanto es pérdida de tiempo",
      "No soy frágil. Soy adaptable sin soluciones químicas.": "Soy demasiado frágil para esto",
      "No es somatización. Es reconexión con sabiduría corporal.": "Estoy somatizando problemas",
      "No es inspiración repentina. Es mi mente liberada de bloqueos químicos.": "Esta creatividad es solo inspiración temporal",
      "No estoy 'curado'. Estoy en mantenimiento activo permanente.": "Ya estoy curado completamente",
      "No es esfuerzo. Es mantenimiento de logros.": "Mantener esto requiere demasiado esfuerzo",
      "No es autoengaño. Es reconocimiento de evidencia objetiva.": "Me estoy autoengañando con estos logros",
      "No soy raro. Soy coherente con mis valores de salud.": "Soy raro por no vapear",
      "No necesito química externa. Tengo herramientas psicológicas efectivas.": "Necesito ayuda química externa",
      "No soy 'ex-adicto'. Soy alguien en recuperación consolidada.": "Siempre seré un ex-adicto",
      "No es ruido neuronal sin significado.": "Estos pensamientos tienen significado real",
      "No es meditación. Es vivir con conciencia plena.": "Esto es solo meditación new age",
      "No es aburrido. Es libertad sin lucha constante.": "La vida sin vapear es aburrida",
      "No soy experto. Soy compañero de camino con experiencia.": "Soy un experto en dejar de vapear",
      "No es suerte. Es consecuencia de mi consistencia.": "He tenido mucha suerte",
      "No es sobrehumano. Es funcionamiento cerebral basal sin interferencias.": "Esto es sobrehumano, no normal",
      "No es automático. Es el fruto de mi trabajo constante.": "Esto debería ser automático",
      "No es fantasía. Es diseño consciente de vida libre.": "Esto es solo fantasía",
      "No soy frágil. Soy humano con historia adictiva que requiere vigilancia.": "Soy demasiado frágil",
      "No es olvido. Es sanación de memoria emocional adictiva.": "Estoy olvidando mi pasado",
      "No es vigilancia excesiva. Es autocuidado consciente.": "Estoy siendo demasiado vigilante",
      "No es tiempo extra. Es vida recuperada.": "Esto es solo tiempo extra",
      "No es lujo. Es necesidad biológica no negociable.": "Dormir tanto es un lujo",
      "No es hiperestesia. Es percepción normal recuperada.": "Tengo hipersensibilidad",
      "No soy invulnerable. Soy resiliente con recursos comprobados.": "Soy invulnerable ahora",
      "No es hipocondría. Es diálogo somático saludable.": "Me estoy volviendo hipocondríaco",
      "No es indiferencia. Es emancipación de la necesidad química.": "Me he vuelto indiferente",
      "No soy especial. Soy evidencia de que la recuperación es posible.": "Soy especial por haber logrado esto",
      "No es fantasía. Es diseño activo de vida post-adicción.": "Esto es pura fantasía",
      "No es carga. Es inversión en calidad de vida sostenida.": "Mantener esto es una carga",
      "No merezco castigo. Merezco disfrutar mi recuperación plenamente.": "No merezco estar bien",
      "No soy mi historia. Soy mi presente libre.": "Soy mi historia adictiva",
      "No es paranoia. Es prudencia basada en conocimiento.": "Estoy siendo paranoico",
      "No fue suerte. Fue disciplina, conocimiento y autocompasión.": "Todo esto fue pura suerte",
      "No soy superior. Soy compañero de viaje con experiencia acumulada.": "Soy superior a los que vapean",
      "No es casualidad. Es consecuencia directa de mi compromiso.": "Estos cambios son casuales",
      "No es genética, simplemente decido no vapear, mi cuerpo hará el resto progresivamente": "Tengo genes de adicto, no puedo cambiar",
      "No es mejora. Es funcionamiento óptimo recuperado.": "Esto es solo una mejora temporal",
      "No evito. Elijo conscientemente.": "Estoy evitando situaciones por miedo",
      "No es regeneración milagrosa. Es capacidad natural del cuerpo.": "Esto es regeneración milagrosa",
      "No es metáfora. Es transformación literal neurobiológica.": "Esto es solo una metáfora",
      "No es esfuerzo. Es estilo de vida integrado.": "Esto requiere demasiado esfuerzo",
      "No es presunción. Es celebración legítima de victoria personal.": "Estoy siendo presuntuoso",
      "No es promesa. Es declaración de intención basada en evidencia.": "Esto es solo una promesa vacía",
      "No soy ex-vaper. Soy alguien que una vez vapeo y eligió la recuperación.": "Siempre seré un ex-vaper"
    };

    // Buscar coincidencia exacta o parcial
    for (const [response, thought] of Object.entries(responseToThoughtMap)) {
      if (contrareplica.includes(response) || response.includes(contrareplica)) {
        return thought;
      }
    }

    // Si no hay coincidencia, usar un pensamiento genérico
    return "Esto no está funcionando como esperaba";
  };

  const dayContent = getCurrentDayContent();
  const hoursSince = startDate ? Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60)) : 0;

  if (!dayContent) return null;

  const intrusiveThought = getIntrusiveThoughtForResponse(dayContent.contrareplica);

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
            <p className="text-sm font-medium text-purple-700 mb-3">💭 Gestión de pensamientos intrusivos:</p>
            
            {/* Pensamiento intrusivo en rojo */}
            <div className="bg-red-100 p-2 rounded mb-2 border-l-4 border-red-400">
              <p className="text-sm font-medium text-red-700 mb-1">🧠 Pensamiento intrusivo:</p>
              <p className="text-red-800 italic">"{intrusiveThought}"</p>
            </div>
            
            {/* Contrarréplica en verde */}
            <div className="bg-green-100 p-2 rounded border-l-4 border-green-400">
              <p className="text-sm font-medium text-green-700 mb-1">💪 Contrarréplica:</p>
              <p className="text-green-800 font-medium italic">"{dayContent.contrareplica}"</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DayContentCard;