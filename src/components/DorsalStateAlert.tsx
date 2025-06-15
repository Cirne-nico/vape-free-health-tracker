import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DorsalStateAlertProps {
  emotionLogs: any[];
}

const DorsalStateAlert = ({ emotionLogs }: DorsalStateAlertProps) => {
  const { t, i18n } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [consecutiveDorsalDays, setConsecutiveDorsalDays] = useState(0);

  useEffect(() => {
    // Verificar cuántas veces se ha mostrado la alerta
    const alertCountStored = parseInt(localStorage.getItem('dorsal-alert-count') || '0');
    setAlertCount(alertCountStored);

    // Contar días consecutivos con estados dorsales
    if (emotionLogs.length > 0) {
      let count = 0;
      // Recorrer los logs desde el más reciente
      for (let i = emotionLogs.length - 1; i >= 0; i--) {
        const log = emotionLogs[i];
        const hasDorsalEmotions = log.emotions.some((id: string) => 
          ['depressed', 'sad', 'indifferent', 'foggy'].includes(id)
        );
        
        if (hasDorsalEmotions) {
          count++;
        } else {
          // Si encontramos un día sin emociones dorsales, rompemos la secuencia
          break;
        }
      }
      
      setConsecutiveDorsalDays(count);
      
      // Verificar si hay suficientes días consecutivos de estados dorsales (5+)
      if (count >= 5) {
        // Verificar si han pasado al menos 7 días desde la última alerta
        const lastAlertDate = localStorage.getItem('last-dorsal-alert-date');
        const today = new Date().toDateString();
        
        if (!lastAlertDate || 
            (new Date(today).getTime() - new Date(lastAlertDate).getTime()) >= 7 * 24 * 60 * 60 * 1000) {
          setShowAlert(true);
        }
      }
    }
  }, [emotionLogs]);

  const getAlertContent = () => {
    // Contenidos originales
    const originalContents = [
      {
        title: i18n.language === 'en' ? "Dopaminergic reorganization in progress" : "Reorganización dopaminérgica en curso",
        neurobiological: i18n.language === 'en' 
          ? "Records indicate sustained activation of the dorsal nervous system, characterized by states of low energy and emotional disconnection."
          : "Los registros indican activación sostenida del sistema nervioso dorsal, caracterizado por estados de baja energía y desconexión emocional.",
        scientific: i18n.language === 'en'
          ? "Studies in Neuropsychopharmacology (2019) document that nicotine cessation produces reorganization of mesolimbic dopaminergic circuits. This reorganization involves transient reduction of dopamine in the nucleus accumbens, manifesting as depressive states during 8-12 weeks post-cessation."
          : "Estudios en Neuropsychopharmacology (2019) documentan que la cesación de nicotina produce reorganización de circuitos dopaminérgicos mesolímbicos. Esta reorganización implica reducción transitoria de dopamina en núcleo accumbens, manifestándose como estados depresivos durante 8-12 semanas post-cesación.",
        adaptive: i18n.language === 'en'
          ? "The observed dysthymia is part of the natural neuroadaptation process. The α4β2 nicotinic receptors experience desensitization while endogenous dopaminergic systems recalibrate towards normal baseline levels."
          : "La distimia observada es parte del proceso natural de neuroadaptación. Los receptores nicotínicos α4β2 experimentan desensibilización mientras los sistemas dopaminérgicos endógenos se recalibran hacia niveles basales normales.",
        timeline: i18n.language === 'en'
          ? "Complete normalization of reward systems occurs between weeks 6-16 post-cessation, with gradual improvements in mood regulation and hedonic capacity."
          : "La normalización completa de sistemas de recompensa ocurre entre semanas 6-16 post-cesación, con mejoras graduales en regulación del estado de ánimo y capacidad hedónica.",
        references: "Benowitz et al. (2019). Neuropsychopharmacology, 44(2), 254-265."
      },
      {
        title: i18n.language === 'en' ? "Temporary serotonergic dysregulation" : "Desregulación serotoninérgica temporal",
        neurobiological: i18n.language === 'en'
          ? "The detected emotional pattern suggests alteration in serotonergic neurotransmission, common during the post-nicotine neurochemical rebalancing phase."
          : "El patrón emocional detectado sugiere alteración en la neurotransmisión serotoninérgica, común durante la fase de reequilibrio neuroquímico post-nicotina.",
        scientific: i18n.language === 'en'
          ? "Research in Biological Psychiatry (2020) demonstrates that nicotine modulates serotonin release in raphe nuclei. Its absence generates temporary deficit in mood regulation, manifesting as episodes of sadness or apathy."
          : "Investigaciones en Biological Psychiatry (2020) demuestran que la nicotina modula la liberación de serotonina en núcleos del rafe. Su ausencia genera déficit temporal en la regulación del humor, manifestándose como episodios de tristeza o apatía.",
        adaptive: i18n.language === 'en'
          ? "This process represents the restoration of natural serotonergic homeostasis. The brain is relearning to produce and regulate serotonin without the external chemical interference of nicotine."
          : "Este proceso representa la restauración de la homeostasis serotoninérgica natural. El cerebro está reaprendiendo a producir y regular serotonina sin la interferencia química externa de la nicotina.",
        timeline: i18n.language === 'en'
          ? "Recovery of the serotonergic system shows significant improvements between weeks 4-10, with complete stabilization around week 12-16 post-cessation."
          : "La recuperación del sistema serotoninérgico muestra mejoras significativas entre las semanas 4-10, con estabilización completa alrededor de la semana 12-16 post-cesación.",
        references: "Picciotto et al. (2020). Biological Psychiatry, 87(3), 234-242."
      },
      {
        title: i18n.language === 'en' ? "Dorsal parasympathetic nervous system activation" : "Activación del sistema nervioso parasimpático dorsal",
        neurobiological: i18n.language === 'en'
          ? "Emotional data indicate predominance of the dorsal vagal complex, associated with states of energy conservation and adaptive social disconnection."
          : "Los datos emocionales indican predominio del complejo vagal dorsal, asociado con estados de conservación energética y desconexión social adaptativa.",
        scientific: i18n.language === 'en'
          ? "According to Polyvagal Theory (Porges, 2021), the dorsal state represents an evolutionary response of preservation to stress. In the context of cessation, this state facilitates neurological reorganization by minimizing energy expenditure during recovery."
          : "Según la Teoría Polivagal (Porges, 2021), el estado dorsal representa una respuesta evolutiva de preservación ante el estrés. En contexto de cesación, este estado facilita la reorganización neurológica minimizando el gasto energético durante la recuperación.",
        adaptive: i18n.language === 'en'
          ? "Dorsal activation is not pathological but adaptive. It allows the organism to dedicate resources to neuronal repair and detoxification without the energy demand of intense social interaction."
          : "La activación dorsal no es patológica sino adaptativa. Permite que el organismo dedique recursos a la reparación neuronal y la desintoxicación sin la demanda energética de la interacción social intensa.",
        timeline: i18n.language === 'en'
          ? "The transition towards ventral states (social connection) typically occurs between weeks 6-12, when reward systems have achieved greater stability."
          : "La transición hacia estados ventrales (conexión social) típicamente ocurre entre las semanas 6-12, cuando los sistemas de recompensa han alcanzado mayor estabilidad.",
        references: "Porges, S.W. (2021). Polyvagal Theory and the Science of Safety. Clinical Psychology Review, 89, 102066."
      },
      {
        title: i18n.language === 'en' ? "Neuroplasticity in reorganization process" : "Neuroplasticidad en proceso de reorganización",
        neurobiological: i18n.language === 'en'
          ? "The current emotional state reflects the active reorganization of neural networks previously conditioned by chronic nicotine exposure."
          : "El estado emocional actual refleja la reorganización activa de redes neuronales previamente condicionadas por la exposición crónica a nicotina.",
        scientific: i18n.language === 'en'
          ? "Neuroimaging studies in Nature Neuroscience (2021) show that nicotine cessation activates neuroplasticity processes in the prefrontal cortex and limbic system. This reorganization can temporarily manifest as emotional lability or depressive states."
          : "Estudios de neuroimagen en Nature Neuroscience (2021) muestran que la cesación de nicotina activa procesos de neuroplasticidad en corteza prefrontal y sistema límbico. Esta reorganización puede manifestarse temporalmente como labilidad emocional o estados depresivos.",
        adaptive: i18n.language === 'en'
          ? "The observed neuroplasticity is indicative of recovery. The brain is eliminating synaptic connections associated with dependence and strengthening natural self-regulation circuits."
          : "La neuroplasticidad observada es indicativa de recuperación. El cerebro está eliminando conexiones sinápticas asociadas con la dependencia y fortaleciendo circuitos de autorregulación natural.",
        timeline: i18n.language === 'en'
          ? "Neuroplastic changes show significant consolidation between weeks 8-16, with evidence of new stable synaptic connections around month 4-6."
          : "Los cambios neuroplásticos muestran consolidación significativa entre las semanas 8-16, con evidencia de nuevas conexiones sinápticas estables alrededor del mes 4-6.",
        references: "Sutherland et al. (2021). Nature Neuroscience, 24(7), 987-995."
      }
    ];

    // Nuevos contenidos basados en los textos proporcionados
    const newContents = [
      {
        title: i18n.language === 'en' ? "Nicotine cessation as a double-edged sword" : "Dejar la nicotina como arma de doble filo",
        neurobiological: i18n.language === 'en' 
          ? "Sometimes, quitting nicotine feels like a double-edged sword. You become more awake, more attentive, more alive. But that same sensitivity can open doors you thought were closed. Old wounds, emerging fears, silences that now scream."
          : "A veces, dejar la nicotina se siente como un arma de doble filo. Te vuelves más despierte, más atente, más vive. Pero esa misma sensibilidad puede abrir puertas que creías cerradas. Heridas antiguas, miedos que se asoman, silencios que ahora gritan.",
        scientific: i18n.language === 'en'
          ? "It's easy to think you were better before, when you smoked or vaped. But often, what we miss isn't nicotine itself, but the veil it placed over what hurt."
          : "Es fácil pensar que estabas mejor antes, cuando fumabas o vapeabas. Pero muchas veces, lo que echamos de menos no es la nicotina en sí, sino el velo que ponía sobre lo que dolía.",
        adaptive: i18n.language === 'en'
          ? "Nicotine distracts. It numbs. It keeps us away from certain corners of ourselves. But when we leave it, although the ghosts appear, we also have more resources to see them, name them, go through them."
          : "La nicotina distrae. Adormece. Nos mantiene lejos de ciertos rincones de nosotres mismes. Pero al dejarla, aunque los fantasmas aparezcan, también tenemos más recursos para verlos, nombrarlos, atravesarlos.",
        timeline: i18n.language === 'en'
          ? "You're not getting worse. You're feeling. And that, even if it hurts, is also a way of healing."
          : "No estás empeorando. Estás sintiendo. Y eso, aunque duela, es también una forma de sanar.",
        references: "Hughes, J. R. (2007). Effects of abstinence from tobacco: valid symptoms and time course. Nicotine & Tobacco Research, 9(3), 315–327."
      },
      {
        title: i18n.language === 'en' ? "Increased emotional sensitivity after quitting" : "Mayor sensibilidad emocional tras el abandono",
        neurobiological: i18n.language === 'en' 
          ? "When quitting nicotine, there is a temporary dysregulation of neurotransmitters such as dopamine and serotonin. This can generate greater emotional reactivity, sadness, anxiety, or even an increase in repressed memories or difficult emotions."
          : "Al dejar la nicotina, se produce una desregulación temporal de neurotransmisores como la dopamina y la serotonina. Esto puede generar mayor reactividad emocional, tristeza, ansiedad o incluso un aumento en recuerdos reprimidos o emociones difíciles.",
        scientific: i18n.language === 'en'
          ? "Several studies have shown that smoking (and by extension, vaping) is not only a physiological addiction, but also an emotional regulation strategy. In other words, many people smoke to avoid feeling, to distract themselves, or to 'erase discomfort'."
          : "Varios estudios han mostrado que el tabaquismo (y por extensión, el vapeo) no solo es una adicción fisiológica, sino también una estrategia de regulación emocional. En otras palabras, muchas personas fuman para evitar sentir, para distraerse, o para \"borrar el malestar".",
        adaptive: i18n.language === 'en'
          ? "Although at first it feels like 'mental fog', many people experience over time greater cognitive and emotional clarity, which allows them to face situations more directly and lucidly. It's as if the veil were lifted, but that also reveals wounds."
          : "Aunque al principio se siente \"niebla mental", muchas personas experimentan con el tiempo una mayor claridad cognitiva y emocional, que permite enfrentar las situaciones de forma más directa y lúcida. Es como si el velo se levantara, pero eso también deja ver heridas.",
        timeline: i18n.language === 'en'
          ? "This increased sensitivity typically peaks between weeks 2-6 and gradually stabilizes as the brain's reward systems recalibrate."
          : "Esta mayor sensibilidad típicamente alcanza su punto máximo entre las semanas 2-6 y se estabiliza gradualmente a medida que los sistemas de recompensa del cerebro se recalibran.",
        references: "Benowitz, N. L. (2010). Nicotine addiction. The New England Journal of Medicine, 362(24), 2295–2303."
      },
      {
        title: i18n.language === 'en' ? "Nicotine as emotional avoidance" : "La nicotina como evitación emocional",
        neurobiological: i18n.language === 'en' 
          ? "The emotional patterns observed in your logs suggest that nicotine was functioning as an emotional regulation tool, masking underlying feelings that are now emerging."
          : "Los patrones emocionales observados en tus registros sugieren que la nicotina funcionaba como herramienta de regulación emocional, enmascarando sentimientos subyacentes que ahora están emergiendo.",
        scientific: i18n.language === 'en'
          ? "Research shows that nicotine affects the amygdala and prefrontal cortex, areas involved in emotional processing. When nicotine is removed, these areas must relearn to process emotions without chemical interference."
          : "La investigación muestra que la nicotina afecta la amígdala y la corteza prefrontal, áreas involucradas en el procesamiento emocional. Cuando se elimina la nicotina, estas áreas deben reaprender a procesar emociones sin interferencia química.",
        adaptive: i18n.language === 'en'
          ? "This period of emotional vulnerability is actually a sign of healing. Your nervous system is regaining its natural ability to process emotions rather than suppressing them with nicotine."
          : "Este período de vulnerabilidad emocional es en realidad un signo de curación. Tu sistema nervioso está recuperando su capacidad natural de procesar emociones en lugar de suprimirlas con nicotina.",
        timeline: i18n.language === 'en'
          ? "Most people experience a significant improvement in emotional regulation capacity between weeks 8-12, as neural pathways are rewired without nicotine's influence."
          : "La mayoría de las personas experimentan una mejora significativa en la capacidad de regulación emocional entre las semanas 8-12, a medida que las vías neuronales se reconectan sin la influencia de la nicotina.",
        references: "Piper, M. E., et al. (2011). Abstinence-induced withdrawal symptoms and the relation to depressive symptoms in a smoking cessation trial. Psychology of Addictive Behaviors, 25(3), 443–452."
      },
      {
        title: i18n.language === 'en' ? "Improvement in attention and perception" : "Mejora de la atención y percepción",
        neurobiological: i18n.language === 'en' 
          ? "Your emotional logs show a pattern consistent with increased sensory and emotional awareness, which is a normal part of the recovery process."
          : "Tus registros emocionales muestran un patrón consistente con mayor conciencia sensorial y emocional, que es parte normal del proceso de recuperación.",
        scientific: i18n.language === 'en'
          ? "Although initially there is 'mental fog', many people experience over time greater cognitive and emotional clarity, which allows them to face situations more directly and lucidly. It's as if the veil were lifted, but that also reveals wounds."
          : "Aunque al principio se siente \"niebla mental", muchas personas experimentan con el tiempo una mayor claridad cognitiva y emocional, que permite enfrentar las situaciones de forma más directa y lúcida. Es como si el velo se levantara, pero eso también deja ver heridas.",
        adaptive: i18n.language === 'en'
          ? "This heightened awareness is actually a return to your natural state of perception, without the dampening effect of nicotine. Your brain is relearning to process information and emotions without chemical filters."
          : "Esta mayor conciencia es en realidad un retorno a tu estado natural de percepción, sin el efecto amortiguador de la nicotina. Tu cerebro está reaprendiendo a procesar información y emociones sin filtros químicos.",
        timeline: i18n.language === 'en'
          ? "Most people report significant improvements in cognitive clarity and emotional processing by week 12, with continued refinement over the following months."
          : "La mayoría de las personas reportan mejoras significativas en claridad cognitiva y procesamiento emocional hacia la semana 12, con refinamiento continuo durante los meses siguientes.",
        references: "Hughes, J. R. (2007). Effects of abstinence from tobacco: valid symptoms and time course. Nicotine & Tobacco Research, 9(3), 315–327."
      },
      {
        title: i18n.language === 'en' ? "The veil of chemical comfort" : "El velo del confort químico",
        neurobiological: i18n.language === 'en' 
          ? "Your emotional patterns suggest you're experiencing the natural unveiling that occurs when nicotine no longer masks underlying emotional states."
          : "Tus patrones emocionales sugieren que estás experimentando el develamiento natural que ocurre cuando la nicotina ya no enmascara estados emocionales subyacentes.",
        scientific: i18n.language === 'en'
          ? "Nicotine acts on acetylcholine receptors that modulate the release of multiple neurotransmitters, creating an artificial emotional buffer. Without this buffer, emotions are experienced more directly and intensely."
          : "La nicotina actúa sobre receptores de acetilcolina que modulan la liberación de múltiples neurotransmisores, creando un amortiguador emocional artificial. Sin este amortiguador, las emociones se experimentan de forma más directa e intensa.",
        adaptive: i18n.language === 'en'
          ? "This increased emotional intensity is actually a sign of healing. Your nervous system is regaining its natural sensitivity and responsiveness, which is essential for authentic emotional processing."
          : "Esta mayor intensidad emocional es en realidad un signo de curación. Tu sistema nervioso está recuperando su sensibilidad y capacidad de respuesta naturales, esenciales para un procesamiento emocional auténtico.",
        timeline: i18n.language === 'en'
          ? "Most people find that emotional intensity peaks around weeks 3-6 and then gradually stabilizes as the brain develops new coping mechanisms without nicotine."
          : "La mayoría de las personas encuentran que la intensidad emocional alcanza su punto máximo alrededor de las semanas 3-6 y luego se estabiliza gradualmente a medida que el cerebro desarrolla nuevos mecanismos de afrontamiento sin nicotina.",
        references: "Benowitz, N. L. (2010). Nicotine addiction. The New England Journal of Medicine, 362(24), 2295–2303."
      },
      {
        title: i18n.language === 'en' ? "Emotional authenticity emerging" : "Autenticidad emocional emergente",
        neurobiological: i18n.language === 'en' 
          ? "Your emotional logs show a pattern consistent with the removal of nicotine's emotional blunting effects, allowing for more authentic emotional experiences."
          : "Tus registros emocionales muestran un patrón consistente con la eliminación de los efectos de embotamiento emocional de la nicotina, permitiendo experiencias emocionales más auténticas.",
        scientific: i18n.language === 'en'
          ? "Research indicates that chronic nicotine use alters emotional processing in the limbic system, creating a dampened emotional range. As nicotine clears from your system, your full emotional spectrum returns."
          : "La investigación indica que el uso crónico de nicotina altera el procesamiento emocional en el sistema límbico, creando un rango emocional amortiguado. A medida que la nicotina se elimina de tu sistema, tu espectro emocional completo regresa.",
        adaptive: i18n.language === 'en'
          ? "This period of emotional intensity is actually a sign of recovery. Your brain is relearning to experience and process emotions without chemical interference, leading to greater emotional authenticity."
          : "Este período de intensidad emocional es en realidad un signo de recuperación. Tu cerebro está reaprendiendo a experimentar y procesar emociones sin interferencia química, lo que lleva a una mayor autenticidad emocional.",
        timeline: i18n.language === 'en'
          ? "Most people experience a gradual stabilization of emotional processing between weeks 8-16, as the brain establishes new emotional regulation pathways."
          : "La mayoría de las personas experimentan una estabilización gradual del procesamiento emocional entre las semanas 8-16, a medida que el cerebro establece nuevas vías de regulación emocional.",
        references: "Piper, M. E., et al. (2011). Abstinence-induced withdrawal symptoms and the relation to depressive symptoms in a smoking cessation trial. Psychology of Addictive Behaviors, 25(3), 443–452."
      }
    ];

    // Combinar los contenidos originales y nuevos
    const allContents = [...originalContents, ...newContents];
    
    // Usar el contador para seleccionar un contenido diferente cada vez
    return allContents[alertCount % allContents.length];
  };

  const handleClose = () => {
    setShowAlert(false);
    const newCount = alertCount + 1;
    setAlertCount(newCount);
    localStorage.setItem('dorsal-alert-count', newCount.toString());
    localStorage.setItem('last-dorsal-alert-date', new Date().toDateString());
    
    // Resetear el contador de días dorsalizados cuando el usuario reconoce la alerta
    localStorage.setItem('consecutive-dorsal-days', '0');
  };

  if (!showAlert) return null;

  const content = getAlertContent();

  return (
    <Dialog open={showAlert} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700">
            <Brain className="w-6 h-6" />
            {i18n.language === 'en' ? "Neurobiological Information" : "Información Neurobiológica"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>{content.title}</strong>
            </AlertDescription>
          </Alert>

          <div className="space-y-4 text-sm">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">
                {i18n.language === 'en' ? "Dorsal state detected" : "Estado dorsal detectado"}
              </h4>
              <p className="text-gray-700">{content.neurobiological}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">
                {i18n.language === 'en' ? "Neuroscientific basis" : "Base neurocientífica"}
              </h4>
              <p className="text-blue-700">{content.scientific}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">
                {i18n.language === 'en' ? "Normal adaptive process" : "Proceso adaptativo normal"}
              </h4>
              <p className="text-green-700">{content.adaptive}</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">
                {i18n.language === 'en' ? "Recovery timeline" : "Cronología de recuperación"}
              </h4>
              <p className="text-purple-700">{content.timeline}</p>
            </div>

            <div className="text-xs text-gray-500 italic">
              <p>{content.references}</p>
            </div>
          </div>

          <Button onClick={handleClose} className="w-full">
            {i18n.language === 'en' ? "Understood" : "Entendido"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DorsalStateAlert;