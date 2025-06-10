
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Coffee, ExternalLink } from 'lucide-react';

const DonationSection = () => {
  const handleDonation = () => {
    window.open('https://buymeacoffee.com/tuusername', '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Coffee className="w-5 h-5" />
          Apoya el Desarrollo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              Si esta aplicación te ha ayudado en tu viaje hacia una vida libre de vapeo, 
              considera apoyar su desarrollo continuo.
            </p>
            <p className="text-xs text-gray-600">
              Tu apoyo nos permite mantener la app gratuita y agregar nuevas funcionalidades.
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleDonation}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Coffee className="w-4 h-4 mr-2" />
          Invítanos un café
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
        
        <div className="text-xs text-gray-500 text-center">
          Enlace seguro a Buy Me a Coffee
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationSection;
