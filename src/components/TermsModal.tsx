import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText } from 'lucide-react';

const TermsModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700">
          <FileText className="w-3 h-3 mr-1" />
          Términos de Uso
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Términos de Uso - UMBRAL</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold mb-2">1. Aceptación de Términos</h3>
              <p className="text-gray-700">
                Al utilizar UMBRAL, aceptas estos términos de uso. Si no estás de acuerdo, 
                por favor no uses la aplicación.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">2. Propósito de la Aplicación</h3>
              <p className="text-gray-700 mb-2">
                UMBRAL es una herramienta de apoyo para personas que desean abandonar el vapeo. 
                Proporciona:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Seguimiento del progreso</li>
                <li>Información sobre recuperación de la salud</li>
                <li>Herramientas de motivación</li>
                <li>Registro emocional</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">3. Limitaciones Médicas</h3>
              <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-800 font-medium">
                  IMPORTANTE: Esta aplicación NO sustituye el consejo médico profesional.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-yellow-700 text-sm">
                  <li>No es un dispositivo médico</li>
                  <li>Los datos de recuperación son estimaciones basadas en estudios generales</li>
                  <li>Si tienes problemas de salud, consulta a un profesional médico</li>
                  <li>En caso de síntomas graves, busca atención médica inmediata</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-2">4. Uso Responsable</h3>
              <p className="text-gray-700">
                Te comprometes a:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Usar la aplicación de manera responsable</li>
                <li>No depender exclusivamente de la app para decisiones de salud</li>
                <li>Complementar el uso de la app con apoyo profesional si es necesario</li>
                <li>No redistribuir o modificar la aplicación</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">5. Descargo de Responsabilidad</h3>
              <p className="text-gray-700">
                La aplicación se proporciona "tal como está". No garantizamos resultados específicos 
                y no nos hacemos responsables de decisiones tomadas basándose únicamente en la información 
                proporcionada por la aplicación.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">6. Donaciones</h3>
              <p className="text-gray-700">
                Las donaciones a través de Liberapay son voluntarias y no otorgan derechos 
                especiales sobre la aplicación. Son procesadas por Liberapay según sus propios términos.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">7. Modificaciones</h3>
              <p className="text-gray-700">
                Nos reservamos el derecho de modificar estos términos. Los cambios serán notificados 
                a través de actualizaciones de la aplicación.
              </p>
            </section>

            <div className="mt-6 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-700">
                <strong>Última actualización:</strong> Junio 2025
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;