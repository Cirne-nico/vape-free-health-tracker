
import { useEffect } from 'react';

interface MobileBackHandlerProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const MobileBackHandler = ({ isOpen, onClose, id }: MobileBackHandlerProps) => {
  useEffect(() => {
    if (isOpen) {
      // Agregar una entrada al historial cuando se abre el modal
      const state = { modalId: id };
      window.history.pushState(state, '', window.location.href);

      const handlePopState = (event: PopStateEvent) => {
        // Si el usuario presiona atrás y hay un modal abierto, cerrarlo
        if (event.state?.modalId === id || !event.state) {
          onClose();
        }
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isOpen, onClose, id]);

  return null;
};

export default MobileBackHandler;
