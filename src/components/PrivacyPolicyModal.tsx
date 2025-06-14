import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield } from 'lucide-react';

const PrivacyPolicyModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700">
          <Shield className="w-3 h-3 mr-1" />
          Política de Privacidad
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Política de Privacidad - UMBRAL</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold mb-2">1. Información que Recopilamos</h3>
              <p className="text-gray-700 mb-2">
                UMBRAL es una aplicación que funciona completamente en tu dispositivo. No recopilamos, 
                almacenamos ni transmitimos ningún dato personal a servidores externos.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Fecha de inicio de tu proceso de abandono del vapeo</li>
                <li>Registros emocionales que decidas anotar</li>
                <li>Configuraciones de la aplicación</li>
                <li>Progreso de logros y medallas</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">2. Almacenamiento de Datos</h3>
              <p className="text-gray-700">
                Toda la información se almacena localmente en tu dispositivo usando el almacenamiento 
                local del navegador. Nosotros no tenemos acceso a esta información en ningún momento.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">3. Uso de los Datos</h3>
              <p className="text-gray-700">
                Los datos se utilizan exclusivamente para:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Calcular tu progreso en el abandono del vapeo</li>
                <li>Mostrar estadísticas de tu recuperación</li>
                <li>Personalizar tu experiencia en la aplicación</li>
                <li>Generar análisis de tu estado emocional</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">4. Compartir Información</h3>
              <p className="text-gray-700">
                No compartimos, vendemos ni transmitimos tus datos a terceros. La aplicación 
                funciona completamente offline después de la carga inicial.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">5. Seguridad</h3>
              <p className="text-gray-700">
                Al almacenar todos los datos localmente, tienes control total sobre tu información. 
                Puedes exportar o eliminar todos tus datos en cualquier momento desde la configuración.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">6. Contacto</h3>
              <p className="text-gray-700">
                Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través 
                de nuestro perfil en Liberapay.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">7. Cambios en la Política</h3>
              <p className="text-gray-700">
                Cualquier cambio en esta política será notificado a través de actualizaciones de la aplicación.
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

export default PrivacyPolicyModal;