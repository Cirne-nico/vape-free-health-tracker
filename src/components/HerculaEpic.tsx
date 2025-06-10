import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Crown, Sword } from 'lucide-react';
import { herculaWorks, getCompletedWorks, getNextWork } from '@/data/herculaWorks';

interface HerculaEpicProps {
  days: number;
  savings: number;
}

const HerculaEpic = ({ days, savings }: HerculaEpicProps) => {
  const completedWorks = getCompletedWorks(days);
  const nextWork = getNextWork(days);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        
        {/* Header épico con Hércula y Nikotis */}
        <Card className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-2 border-amber-200">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-8 mb-4">
              {/* Hércula */}
              <div className="flex flex-col items-center">
                <img 
                  src="/lovable-uploads/Hercula.png" 
                  alt="Hércula" 
                  className="w-20 h-20 rounded-full border-4 border-green-400 shadow-lg"
                />
                <Badge className="mt-2 bg-green-500 text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  Hércula
                </Badge>
              </div>
              
              {/* VS */}
              <div className="text-4xl font-bold text-amber-600">
                <Sword className="w-8 h-8" />
              </div>
              
              {/* Nikotis */}
              <div className="flex flex-col items-center">
                <img 
                  src="/lovable-uploads/Dios Nikotis.png" 
                  alt="Nikotis" 
                  className="w-20 h-20 rounded-full border-4 border-red-400 shadow-lg opacity-75"
                />
                <Badge className="mt-2 bg-red-500 text-white">
                  Nikotis
                </Badge>
              </div>
            </div>
            
            <CardTitle className="text-amber-700 flex items-center justify-center gap-2">
              ⚔️ Los Trabajos de Hércula
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm p-3">
                  <div className="space-y-2">
                    <p className="font-semibold">La Epopeya de la Liberación</p>
                    <p className="text-sm">Hércula, heroína de la voluntad, enfrenta los desafíos impuestos por Nikotis, dios de la nicotina. Cada trabajo representa una prueba específica en el camino hacia la libertad.</p>
                    <p className="font-semibold">Mitología personal:</p>
                    <p className="text-sm">Tu proceso de cesación se convierte en una épica heroica donde cada obstáculo superado te acerca más a la victoria final.</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <p className="text-amber-600">
              La épica batalla contra Nikotis, dios de la nicotina
            </p>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/70 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {completedWorks.length}
                </div>
                <div className="text-gray-600 text-sm">trabajos completados</div>
              </div>
              <div className="bg-white/70 p-3 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">
                  {days}
                </div>
                <div className="text-gray-600 text-sm">días de batalla</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Próximo trabajo */}
        {nextWork && (
          <Card className="border-2 border-dashed border-amber-300 bg-gradient-to-r from-yellow-50 to-amber-50">
            <CardHeader>
              <CardTitle className="text-lg text-amber-700 flex items-center gap-2">
                🎯 Próximo Trabajo
                <Badge variant="outline" className="text-amber-600">
                  Día {nextWork.days}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-bold text-amber-800 text-lg">{nextWork.title}</div>
                  <div className="text-sm text-amber-600 mt-1">{nextWork.description}</div>
                </div>
                <div className="text-4xl">{nextWork.icon}</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso hacia el trabajo</span>
                  <span>{days}/{nextWork.days} días</span>
                </div>
                <Progress value={(days / nextWork.days) * 100} className="h-3" />
                <div className="text-xs text-gray-500">
                  {nextWork.days - days} días restantes
                </div>
              </div>
              
              <div className="bg-amber-100 p-3 rounded-lg">
                <p className="text-sm font-medium text-amber-800 mb-2">🏛️ El Desafío:</p>
                <p className="text-amber-700 text-sm italic">"{nextWork.challenge}"</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trabajos completados */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-600" />
            Trabajos Completados por Hércula
          </h3>
          
          {completedWorks.length === 0 ? (
            <Card className="bg-gray-50">
              <CardContent className="text-center py-8">
                <img 
                  src="/lovable-uploads/Hercula.png" 
                  alt="Hércula esperando" 
                  className="w-16 h-16 mx-auto rounded-full mb-4 opacity-50"
                />
                <p className="text-gray-500">
                  Hércula aguarda el momento de comenzar su primera prueba...
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  La épica comenzará con tu primer día libre de nicotina
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {completedWorks.reverse().map((work) => (
                <Card key={work.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{work.icon}</div>
                        <div>
                          <div className="font-bold text-green-700 text-lg">
                            {work.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {work.description}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <Badge className="bg-green-500 text-white mb-1">
                          ✓ Completado
                        </Badge>
                        <div className="text-xs text-gray-500">
                          Día {work.days}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <p className="text-sm font-medium text-amber-800 mb-1">🏛️ El Desafío:</p>
                        <p className="text-amber-700 text-sm italic">"{work.challenge}"</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-red-100 p-3 rounded-lg">
                          <p className="text-sm font-medium text-red-800 mb-1">😈 Nikotis susurró:</p>
                          <p className="text-red-700 text-sm italic">"{work.nikotisInfluence}"</p>
                        </div>
                        
                        <div className="bg-green-100 p-3 rounded-lg">
                          <p className="text-sm font-medium text-green-800 mb-1">⚔️ Hércula respondió:</p>
                          <p className="text-green-700 text-sm italic">"{work.herculaResponse}"</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 mb-1">🏆 Recompensa obtenida:</p>
                        <p className="text-blue-700 text-sm">{work.reward}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer épico */}
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardContent className="text-center py-6">
            <div className="flex justify-center items-center gap-4 mb-4">
              <img 
                src="/lovable-uploads/40729490-8efc-4406-96d1-6fa50fd1c815.png" 
                alt="Atenea" 
                className="w-12 h-12 rounded-full"
              />
              <img 
                src="/lovable-uploads/ChatGPT Image 9 jun 2025, 01_29_39.png" 
                alt="Nike" 
                className="w-12 h-12 rounded-full"
              />
              <img 
                src="/lovable-uploads/d2d56d43-0631-466d-9f75-6605bc86a799.png" 
                alt="Afrodita" 
                className="w-12 h-12 rounded-full"
              />
            </div>
            <p className="text-purple-700 italic">
              "Los dioses del Olimpo observan tu progreso. Atenea otorga sabiduría a los 90 días, 
              Nike corona la victoria al año, y Afrodita celebra el renacimiento a los dos años."
            </p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default HerculaEpic;