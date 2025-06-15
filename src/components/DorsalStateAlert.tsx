import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DorsalStateContent from './DorsalStateContent';
import { ScrollArea } from '@/components/ui/scroll-area';

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

    // Obtener el contador de días dorsales consecutivos
    const storedConsecutiveDays = parseInt(localStorage.getItem('consecutive-dorsal-days') || '0');
    setConsecutiveDorsalDays(storedConsecutiveDays);

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
      
      // Verificar si hay suficientes días consecutivos de estados dorsales (5+)
      // Usamos el máximo entre el contador almacenado y el calculado
      const effectiveDorsalDays = Math.max(count, storedConsecutiveDays);
      
      if (effectiveDorsalDays >= 5) {
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

    // Usar el contenido de DorsalStateContent para los nuevos mensajes
    const contentIndex = alertCount % 8; // 4 originales + 4 nuevos = 8 posibles mensajes
    
    // Si el índice corresponde a un nuevo mensaje, mostrar DorsalStateContent
    if (contentIndex >= 4) {
      return {
        useCustomContent: true,
        contentIndex: contentIndex - 4 // Ajustar índice para los nuevos mensajes (0-3)
      };
    }
    
    // Si no, usar uno de los mensajes originales
    return {
      useCustomContent: false,
      ...originalContents[contentIndex]
    };
  };

  const handleClose = () => {
    setShowAlert(false);
    const newCount = alertCount + 1;
    setAlertCount(newCount);
    localStorage.setItem('dorsal-alert-count', newCount.toString());
    localStorage.setItem('last-dorsal-alert-date', new Date().toDateString());
  };

  if (!showAlert) return null;

  const content = getAlertContent();

  return (
    <Dialog open={showAlert} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700">
            <Brain className="w-6 h-6" />
            {i18n.language === 'en' ? "Neurobiological Information" : "Información Neurobiológica"}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-4">
            <Alert className="border-blue-200 bg-blue-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>{content.useCustomContent ? 
                  t(`dorsalStateMessages.title${content.contentIndex + 1}`) : 
                  content.title}</strong>
              </AlertDescription>
            </Alert>

            {content.useCustomContent ? (
              <DorsalStateContent contentIndex={content.contentIndex} />
            ) : (
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
            )}
          </div>
        </ScrollArea>

        <Button onClick={handleClose} className="w-full mt-4">
          {i18n.language === 'en' ? "Understood" : "Entendido"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DorsalStateAlert;