import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import contenidosData from '@/data/contenidos.json';

const CoherenceChecker = () => {
  const [showAll, setShowAll] = useState(false);

  // Función para generar pensamientos intrusivos (copiada de DayContentCard)
  const getIntrusiveThoughtForResponse = (contrareplica: string) => {
    const responseToThoughtMap: { [key: string]: string } = {
      "No tengo genes de adicte. Tengo capacidad de elección y mi biología se adapta a mis decisiones.": "Tengo genes de adicte, no puedo cambiar mi naturaleza",
      "No es una pérdida. Es el comienzo de mi libertad.": "He perdido algo importante al dejar de vapear",
      "No es ansiedad. Es el cuerpo recuperando su ritmo autónomo.": "Esta ansiedad significa que algo va mal",
      "No estoy nervioso. Estoy transitando el reinicio bioquímico.": "Estos nervios son una señal de que necesito vapear",
      "Cada vez que he cedido 'solo una calada', he vuelto a vapear en días. Este pensamiento no funciona.": "Solo una calada no hará daño",
      "No estoy enfermo. Estoy drenando residuos químicos acumulados.": "Me estoy poniendo enfermo sin el vapeo",
      "No estoy agotade. Mi cuerpo está trabajando en su limpieza interna.": "Estoy demasiado cansado, necesito energía del vapeo",
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
      "No soy invulnerable. Mantengo vigilancia atenta sin paranoia.": "Soy invulnerable a las recaídas",
      "No soy ex-vaper. Soy alguien que no vapea.": "Soy un ex-vaper, siempre lo seré",
      "No soy 'ex-adicte'. Soy alguien en recuperación consolidada.": "Siempre seré un ex-adicte",
      "No es ruido neuronal sin significado.": "Estos pensamientos tienen significado real",
      "No soy fríe. Estoy aprendiendo a relacionarme sin intermediarios químicos.": "Me he vuelto fríe emocionalmente",
      "No es euforia. Es mi mente funcionando sin bloqueos químicos.": "Esta creatividad es solo euforia temporal",
      "No necesito escapar. Puedo sostener lo que sea temporalmente.": "Necesito escapar de este malestar",
      "No es permanente. Es el último intento de la adicción por sobrevivir.": "Esta tristeza es permanente",
      "Prefiero vapear y no estar tan triste - Estudios muestran que la tristeza post-cesación es temporal (6-12 semanas), pero vapear perpetúa la disregulación dopaminérgica indefinidamente.": "Prefiero vapear y no estar tan triste",
      "No extraño vapear. Extraño la falsa solución emocional que ofrecía.": "Extraño vapear realmente",
      "No estoy reviviendo. Estoy recordando sin anestesia química.": "Estoy reviviendo traumas del pasado",
      "No es depresión. Es sistema recompensa aprendiendo a funcionar sin estímulos artificiales.": "Estoy deprimido sin vapear",
      "No es hipocondría. Es reconexión mente-cuerpo post-adicción.": "Me estoy volviendo hipocondríaco",
      "No es esfuerzo. Es creación de caminos neuronales alternativos.": "Esto requiere demasiado esfuerzo",
      "No es suerte. Es resultado de trabajo neuroemocional constante.": "He tenido suerte hasta ahora",
      "No es deseo real. Es memoria condicionada buscando activación.": "Realmente deseo vapear",
      "No necesito vapear para calmarme. Tengo recursos internos suficientes.": "Necesito vapear para calmarme",
      "No es insomnio residual. Es sueño natural sin alteraciones químicas.": "Tengo insomnio residual",
      "No es poco. Es suficiente para un cerebro en recalibración.": "Estos pequeños placeres no son suficientes",
      "No es peligro. Es oportunidad para reconfigurar asociaciones.": "Estar en estos lugares es peligroso",
      "No es premonición. Es cerebro procesando el cambio de identidad.": "Estos sueños son premoniciones de recaída",
      "No soy plane. Soy estable sin alteraciones químicas externas.": "Me he vuelto emocionalmente plane",
      "No es el final. Es el comienzo de la fase de mantenimiento sólido.": "Ya terminé, esto es el final",
      "No es autoengaño. Es evidencia acumulada de mi capacidad de cambio.": "Me estoy autoengañando",
      "No es vacío. Es espacio para autoconocimiento sin intermediarios.": "Siento un vacío existencial",
      "No es tentación. Es el eco de un hábito moribundo.": "Esta es una tentación real",
      "No es automático. Es el fruto de mi trabajo neuroemocional.": "Esto debería ser automático ya",
      "No es pérdida de tiempo. Es inversión en reparación neurológica.": "Dormir tanto es pérdida de tiempo",
      "No soy frágil. Soy adaptable sin soluciones químicas.": "Soy demasiado frágil para esto",
      "No es somatización. Es reconexión con sabiduría corporal.": "Estoy somatizando problemas",
      "No es inspiración repentina. Es mi mente liberada de bloqueos químicos.": "Esta creatividad es solo inspiración temporal",
      "No estoy 'curade'. Estoy en mantenimiento activo permanente.": "Ya estoy curade completamente",
      "No es esfuerzo. Es mantenimiento de logros.": "Mantener esto requiere demasiado esfuerzo",
      "No es autoengaño. Es reconocimiento de evidencia objetiva.": "Me estoy autoengañando con estos logros",
      "No soy rare. Soy coherente con mis valores de salud.": "Soy rare por no vapear",
      "No necesito química externa. Tengo herramientas psicológicas efectivas.": "Necesito ayuda química externa",
      "No es meditación. Es vivir con conciencia plena.": "Esto es solo meditación new age",
      "No es aburrido. Es libertad sin lucha constante.": "La vida sin vapear es aburrida",
      "No soy experte. Soy compañere de camino con experiencia.": "Soy un experte en dejar de vapear",
      "No es suerte. Es consecuencia de mi consistencia.": "He tenido mucha suerte",
      "No es sobrehumano. Es funcionamiento cerebral basal sin interferencias.": "Esto es sobrehumano, no normal",
      "No es automático. Es el fruto de mi trabajo constante.": "Esto debería ser automático",
      "No es fantasía. Es diseño consciente de vida libre.": "Esto es solo fantasía",
      "No soy frágil. Soy humane con historia adictiva que requiere vigilancia.": "Soy demasiado frágil",
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
      "No soy superior. Soy compañere de viaje con experiencia acumulada.": "Soy superior a los que vapean",
      "No es casualidad. Es consecuencia directa de mi compromiso.": "Estos cambios son casuales",
      "No es mejora. Es funcionamiento óptimo recuperado.": "Esto es solo una mejora temporal",
      "No evito. Elijo conscientemente.": "Estoy evitando situaciones por miedo",
      "No es regeneración milagrosa. Es capacidad natural del cuerpo.": "Esto es regeneración milagrosa",
      "No es metáfora. Es transformación literal neurobiológica.": "Esto es solo una metáfora",
      "No es esfuerzo. Es estilo de vida integrado.": "Esto requiere demasiado esfuerzo",
      "No es presunción. Es celebración legítima de victoria personal.": "Estoy siendo presuntuoso",
      "No es promesa. Es declaración de intención basada en evidencia.": "Esto es solo una promesa vacía",
      "No es el fin. Es el comienzo de mi vida plenamente libre.": "Esto es el fin del proceso",
      "No es genética, simplemente decido no vapear, mi cuerpo hará el resto progresivamente": "Es genético, no puedo cambiar mi tendencia adictiva",
      "No soy ex-vaper. Soy alguien que una vez vapeo y eligió la recuperación.": "Siempre seré un ex-vaper"
    };

    if (responseToThoughtMap[contrareplica]) {
      return responseToThoughtMap[contrareplica];
    }

    if (contrareplica.includes("No es") || contrareplica.includes("No soy")) {
      const negatedConcept = contrareplica.replace("No es ", "").replace("No soy ", "").split(".")[0];
      return `Sí es ${negatedConcept.toLowerCase()}`;
    }

    return "Esto no está funcionando como esperaba";
  };

  // Evaluar coherencia
  const evaluateCoherence = (thought: string, response: string) => {
    // Criterios de coherencia
    if (thought.includes("genético") && response.includes("genes")) return "✅ COHERENTE";
    if (thought.includes("perdido") && response.includes("pérdida")) return "✅ COHERENTE";
    if (thought.includes("ansiedad") && response.includes("ansiedad")) return "✅ COHERENTE";
    if (thought.includes("nervios") && response.includes("nervioso")) return "✅ COHERENTE";
    if (thought.includes("calada") && response.includes("calada")) return "✅ COHERENTE";
    if (thought.includes("enfermo") && response.includes("enfermo")) return "✅ COHERENTE";
    if (thought.includes("cansado") && response.includes("agotado")) return "✅ COHERENTE";
    if (thought.includes("hambre") && response.includes("hambre")) return "✅ COHERENTE";
    if (thought.includes("empeorando") && response.includes("recaída")) return "✅ COHERENTE";
    if (thought.includes("casuales") && response.includes("casualidad")) return "✅ COHERENTE";
    if (thought.includes("poco progreso") && response.includes("pequeño logro")) return "✅ COHERENTE";
    if (thought.includes("necesito vapear") && response.includes("necesidad")) return "✅ COHERENTE";
    if (thought.includes("concentrarme") && response.includes("atención")) return "✅ COHERENTE";
    if (thought.includes("control") && response.includes("control")) return "✅ COHERENTE";
    if (thought.includes("estimulación") && response.includes("excitar")) return "✅ COHERENTE";
    if (thought.includes("cambio") && response.includes("cambios")) return "✅ COHERENTE";
    if (thought.includes("dormir") && response.includes("insomnio")) return "✅ COHERENTE";
    if (thought.includes("digestivos") && response.includes("microbiota")) return "✅ COHERENTE";
    if (thought.includes("dolor") && response.includes("migraña")) return "✅ COHERENTE";
    if (thought.includes("infección") && response.includes("infección")) return "✅ COHERENTE";
    if (thought.includes("bronquitis") && response.includes("bronquitis")) return "✅ COHERENTE";
    if (thought.includes("alérgico") && response.includes("alergia")) return "✅ COHERENTE";
    if (thought.includes("igual") && response.includes("igual")) return "✅ COHERENTE";
    if (thought.includes("ex-vaper") && response.includes("ex-vaper")) return "✅ COHERENTE";
    if (thought.includes("adicto") && response.includes("adicto")) return "✅ COHERENTE";
    if (thought.includes("significado") && response.includes("significado")) return "✅ COHERENTE";
    if (thought.includes("frío") && response.includes("frío")) return "✅ COHERENTE";
    if (thought.includes("euforia") && response.includes("euforia")) return "✅ COHERENTE";
    if (thought.includes("escapar") && response.includes("escapar")) return "✅ COHERENTE";
    if (thought.includes("permanente") && response.includes("permanente")) return "✅ COHERENTE";
    if (thought.includes("triste") && response.includes("triste")) return "✅ COHERENTE";
    if (thought.includes("extraño") && response.includes("extraño")) return "✅ COHERENTE";
    if (thought.includes("deprimido") && response.includes("depresión")) return "✅ COHERENTE";
    if (thought.includes("hipocondríaco") && response.includes("hipocondría")) return "✅ COHERENTE";
    if (thought.includes("esfuerzo") && response.includes("esfuerzo")) return "✅ COHERENTE";
    if (thought.includes("suerte") && response.includes("suerte")) return "✅ COHERENTE";
    if (thought.includes("deseo") && response.includes("deseo")) return "✅ COHERENTE";
    if (thought.includes("calmarme") && response.includes("calmarme")) return "✅ COHERENTE";
    if (thought.includes("insomnio") && response.includes("insomnio")) return "✅ COHERENTE";
    if (thought.includes("suficientes") && response.includes("poco")) return "✅ COHERENTE";
    if (thought.includes("peligroso") && response.includes("peligro")) return "✅ COHERENTE";
    if (thought.includes("premoniciones") && response.includes("premonición")) return "✅ COHERENTE";
    if (thought.includes("plano") && response.includes("plano")) return "✅ COHERENTE";
    if (thought.includes("final") && response.includes("final")) return "✅ COHERENTE";
    if (thought.includes("autoengañando") && response.includes("autoengano")) return "✅ COHERENTE";
    if (thought.includes("vacío") && response.includes("vacío")) return "✅ COHERENTE";
    if (thought.includes("tentación") && response.includes("tentación")) return "✅ COHERENTE";
    if (thought.includes("automático") && response.includes("automático")) return "✅ COHERENTE";
    if (thought.includes("tiempo") && response.includes("tiempo")) return "✅ COHERENTE";
    if (thought.includes("frágil") && response.includes("frágil")) return "✅ COHERENTE";
    if (thought.includes("somatizando") && response.includes("somatización")) return "✅ COHERENTE";
    if (thought.includes("inspiración") && response.includes("inspiración")) return "✅ COHERENTE";
    if (thought.includes("curado") && response.includes("curado")) return "✅ COHERENTE";
    if (thought.includes("raro") && response.includes("raro")) return "✅ COHERENTE";
    if (thought.includes("química") && response.includes("química")) return "✅ COHERENTE";
    if (thought.includes("meditación") && response.includes("meditación")) return "✅ COHERENTE";
    if (thought.includes("aburrida") && response.includes("aburrido")) return "✅ COHERENTE";
    if (thought.includes("experto") && response.includes("experto")) return "✅ COHERENTE";
    if (thought.includes("sobrehumano") && response.includes("sobrehumano")) return "✅ COHERENTE";
    if (thought.includes("fantasía") && response.includes("fantasía")) return "✅ COHERENTE";
    if (thought.includes("vigilante") && response.includes("vigilancia")) return "✅ COHERENTE";
    if (thought.includes("lujo") && response.includes("lujo")) return "✅ COHERENTE";
    if (thought.includes("hipersensibilidad") && response.includes("hiperestesia")) return "✅ COHERENTE";
    if (thought.includes("invulnerable") && response.includes("invulnerable")) return "✅ COHERENTE";
    if (thought.includes("indiferente") && response.includes("indiferencia")) return "✅ COHERENTE";
    if (thought.includes("especial") && response.includes("especial")) return "✅ COHERENTE";
    if (thought.includes("carga") && response.includes("carga")) return "✅ COHERENTE";
    if (thought.includes("merezco") && response.includes("merezco")) return "✅ COHERENTE";
    if (thought.includes("historia") && response.includes("historia")) return "✅ COHERENTE";
    if (thought.includes("paranoico") && response.includes("paranoia")) return "✅ COHERENTE";
    if (thought.includes("superior") && response.includes("superior")) return "✅ COHERENTE";
    if (thought.includes("mejora") && response.includes("mejora")) return "✅ COHERENTE";
    if (thought.includes("evitando") && response.includes("evito")) return "✅ COHERENTE";
    if (thought.includes("milagrosa") && response.includes("milagrosa")) return "✅ COHERENTE";
    if (thought.includes("metáfora") && response.includes("metáfora")) return "✅ COHERENTE";
    if (thought.includes("presuntuoso") && response.includes("presunción")) return "✅ COHERENTE";
    if (thought.includes("promesa") && response.includes("promesa")) return "✅ COHERENTE";
    if (thought.includes("fin") && response.includes("fin")) return "✅ COHERENTE";
    if (thought.includes("genético") && response.includes("genética")) return "✅ COHERENTE";

    return "❌ INCOHERENTE";
  };

  const allEntries = contenidosData.map((content, index) => {
    const intrusiveThought = getIntrusiveThoughtForResponse(content.contrareplica);
    const coherence = evaluateCoherence(intrusiveThought, content.contrareplica);
    const day = Math.floor(content.hora / 24);
    
    return {
      index,
      day,
      hour: content.hora,
      intrusiveThought,
      contrareplica: content.contrareplica,
      coherence,
      isCoherent: coherence.includes("✅")
    };
  });

  const incoherentEntries = allEntries.filter(entry => !entry.isCoherent);
  const coherentCount = allEntries.length - incoherentEntries.length;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Verificador de Coherencia: Pensamientos Intrusivos vs Contrarréplicas</CardTitle>
        <div className="flex gap-4">
          <Badge variant="outline" className="bg-green-50">
            ✅ Coherentes: {coherentCount}/{allEntries.length}
          </Badge>
          <Badge variant="outline" className="bg-red-50">
            ❌ Incoherentes: {incoherentEntries.length}/{allEntries.length}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowAll(!showAll)}
            variant={showAll ? "secondary" : "default"}
          >
            {showAll ? "Mostrar solo incoherentes" : "Mostrar todos"}
          </Button>
        </div>

        {/* Mostrar incoherentes primero */}
        {incoherentEntries.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-red-600">❌ Entradas Incoherentes ({incoherentEntries.length})</h3>
            {incoherentEntries.map((entry) => (
              <Card key={entry.index} className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline">Día {entry.day} (Hora {entry.hour})</Badge>
                    <Badge variant="destructive">{entry.coherence}</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-red-100 p-3 rounded border-l-4 border-red-400">
                      <p className="text-sm font-medium text-red-700 mb-1">🧠 Pensamiento intrusivo:</p>
                      <p className="text-red-800 italic">"{entry.intrusiveThought}"</p>
                    </div>
                    
                    <div className="bg-green-100 p-3 rounded border-l-4 border-green-400">
                      <p className="text-sm font-medium text-green-700 mb-1">💪 Contrarréplica:</p>
                      <p className="text-green-800 italic">"{entry.contrareplica}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Mostrar coherentes si se solicita */}
        {showAll && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-green-600">✅ Entradas Coherentes ({coherentCount})</h3>
            {allEntries.filter(entry => entry.isCoherent).map((entry) => (
              <Card key={entry.index} className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline">Día {entry.day} (Hora {entry.hour})</Badge>
                    <Badge className="bg-green-500">{entry.coherence}</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-red-100 p-3 rounded border-l-4 border-red-400">
                      <p className="text-sm font-medium text-red-700 mb-1">🧠 Pensamiento intrusivo:</p>
                      <p className="text-red-800 italic">"{entry.intrusiveThought}"</p>
                    </div>
                    
                    <div className="bg-green-100 p-3 rounded border-l-4 border-green-400">
                      <p className="text-sm font-medium text-green-700 mb-1">💪 Contrarréplica:</p>
                      <p className="text-green-800 italic">"{entry.contrareplica}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {incoherentEntries.length === 0 && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-green-600 mb-2">🎉 ¡Perfecto!</h3>
              <p className="text-green-700">Todas las contrarréplicas tienen pensamientos intrusivos coherentes.</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default CoherenceChecker;