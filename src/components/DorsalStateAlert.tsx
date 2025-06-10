import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, AlertTriangle } from 'lucide-react';

interface DorsalStateAlertProps {
  emotionLogs: any[];
}

const DorsalStateAlert = ({ emotionLogs }: DorsalStateAlertProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    // Verificar cuántas veces se ha mostrado la alerta
    const alertCountStored = parseInt(localStorage.getItem('dorsal-alert-count') || '0');
    setAlertCount(alertCountStored);

    // Verificar si hay 3 días consecutivos de estados dorsales
    if (emotionLogs.length >= 3) {
      const recentLogs = emotionLogs.slice(-3);
      const consecutiveDorsalDays = recentLogs.every(log => {
        const dorsalEmotions = log.emotions.filter((id: string) => 
          ['depressed', 'sad', 'indifferent', 'foggy'].includes(id)
        );
        return dorsalEmotions.length > 0;
      });

      if (consecutiveDorsalDays) {
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
    const contents = [
      {
        title: "Reorganización dopaminérgica en curso",
        neurobiological: "Los registros indican activación sostenida del sistema nervioso dorsal, caracterizado por estados de baja energía y desconexión emocional.",
        scientific: "Estudios en Neuropsychopharmacology (2019) documentan que la cesación de nicotina produce reorganización de circuitos dopaminérgicos mesolímbicos. Esta reorganización implica reducción transitoria de dopamina en núcleo accumbens, manifestándose como estados depresivos durante 8-12 semanas post-cesación.",
        adaptive: "La distimia observada es parte del proceso natural de neuroadaptación. Los receptores nicotínicos α4β2 experimentan desensibilización mientras los sistemas dopaminérgicos endógenos se recalibran hacia niveles basales normales.",
        timeline: "La normalización completa de sistemas de recompensa ocurre entre semanas 6-16 post-cesación, con mejoras graduales en regulación del estado de ánimo y capacidad hedónica.",
        references: "Benowitz et al. (2019). Neuropsychopharmacology, 44(2), 254-265."
      },
      {
        title: "Desregulación serotoninérgica temporal",
        neurobiological: "El patrón emocional detectado sugiere alteración en la neurotransmisión serotoninérgica, común durante la fase de reequilibrio neuroquímico post-nicotina.",
        scientific: "Investigaciones en Biological Psychiatry (2020) demuestran que la nicotina modula la liberación de serotonina en núcleos del rafe. Su ausencia genera déficit temporal en la regulación del humor, manifestándose como episodios de tristeza o apatía.",
        adaptive: "Este proceso representa la restauración de la homeostasis serotoninérgica natural. El cerebro está reaprendiendo a producir y regular serotonina sin la interferencia química externa de la nicotina.",
        timeline: "La recuperación del sistema serotoninérgico muestra mejoras significativas entre las semanas 4-10, con estabilización completa alrededor de la semana 12-16 post-cesación.",
        references: "Picciotto et al. (2020). Biological Psychiatry, 87(3), 234-242."
      },
      {
        title: "Activación del sistema nervioso parasimpático dorsal",
        neurobiological: "Los datos emocionales indican predominio del complejo vagal dorsal, asociado con estados de conservación energética y desconexión social adaptativa.",
        scientific: "Según la Teoría Polivagal (Porges, 2021), el estado dorsal representa una respuesta evolutiva de preservación ante el estrés. En contexto de cesación, este estado facilita la reorganización neurológica minimizando el gasto energético durante la recuperación.",
        adaptive: "La activación dorsal no es patológica sino adaptativa. Permite que el organismo dedique recursos a la reparación neuronal y la desintoxicación sin la demanda energética de la interacción social intensa.",
        timeline: "La transición hacia estados ventrales (conexión social) típicamente ocurre entre las semanas 6-12, cuando los sistemas de recompensa han alcanzado mayor estabilidad.",
        references: "Porges, S.W. (2021). Polyvagal Theory and the Science of Safety. Clinical Psychology Review, 89, 102066."
      },
      {
        title: "Neuroplasticidad en proceso de reorganización",
        neurobiological: "El estado emocional actual refleja la reorganización activa de redes neuronales previamente condicionadas por la exposición crónica a nicotina.",
        scientific: "Estudios de neuroimagen en Nature Neuroscience (2021) muestran que la cesación de nicotina activa procesos de neuroplasticidad en corteza prefrontal y sistema límbico. Esta reorganización puede manifestarse temporalmente como labilidad emocional o estados depresivos.",
        adaptive: "La neuroplasticidad observada es indicativa de recuperación. El cerebro está eliminando conexiones sinápticas asociadas con la dependencia y fortaleciendo circuitos de autorregulación natural.",
        timeline: "Los cambios neuroplásticos muestran consolidación significativa entre las semanas 8-16, con evidencia de nuevas conexiones sinápticas estables alrededor del mes 4-6.",
        references: "Sutherland et al. (2021). Nature Neuroscience, 24(7), 987-995."
      }
    ];

    return contents[alertCount % contents.length];
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700">
            <Brain className="w-6 h-6" />
            Información Neurobiológica
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
              <h4 className="font-semibold text-gray-800 mb-2">Estado dorsal detectado</h4>
              <p className="text-gray-700">{content.neurobiological}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Base neurocientífica</h4>
              <p className="text-blue-700">{content.scientific}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Proceso adaptativo normal</h4>
              <p className="text-green-700">{content.adaptive}</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Cronología de recuperación</h4>
              <p className="text-purple-700">{content.timeline}</p>
            </div>

            <div className="text-xs text-gray-500 italic">
              <p>{content.references}</p>
            </div>
          </div>

          <Button onClick={handleClose} className="w-full">
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DorsalStateAlert;