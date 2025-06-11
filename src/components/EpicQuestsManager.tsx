import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trash2, Plus, Trophy, CheckCircle, Circle, Brain, Heart, Medal, AlertCircle, RefreshCw, Bug, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { EpicQuest, defaultEpicQuests, createEpicQuest, getCategoryColor, getCategoryName } from '@/data/epicQuests';

const EpicQuestsManager = () => {
  const [quests, setQuests] = useState<EpicQuest[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newQuestDescription, setNewQuestDescription] = useState('');
  const [newQuestChecks, setNewQuestChecks] = useState(3);
  const [newQuestCategory, setNewQuestCategory] = useState<EpicQuest['category']>('situational');
  const [newQuestIcon, setNewQuestIcon] = useState('⚔️');
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Cargar gestas del localStorage
  useEffect(() => {
    const savedQuests = localStorage.getItem('epic-quests');
    if (savedQuests) {
      const loadedQuests = JSON.parse(savedQuests);
      setQuests(loadedQuests);
      updateDebugInfo(loadedQuests);
    } else {
      // Inicializar con gestas por defecto
      const initialQuests = defaultEpicQuests.map(createEpicQuest);
      setQuests(initialQuests);
      localStorage.setItem('epic-quests', JSON.stringify(initialQuests));
      updateDebugInfo(initialQuests);
    }
  }, []);

  // Función para actualizar información de debug
  const updateDebugInfo = (questList: EpicQuest[]) => {
    const completedWithMedals = questList.filter(q => q.isCompleted && q.medalIcon);
    const info = `
📊 ESTADO ACTUAL:
• Total gestas: ${questList.length}
• Gestas completadas: ${questList.filter(q => q.isCompleted).length}
• Gestas con medalla: ${questList.filter(q => q.medalIcon).length}
• Gestas completadas CON medalla: ${completedWithMedals.length}

🏆 MEDALLAS ÉPICAS DISPONIBLES:
${completedWithMedals.map(q => `• ${q.title} (${q.medalIcon ? '✅ Medalla' : '❌ Sin medalla'})`).join('\n')}

${completedWithMedals.length === 0 ? '❌ NO HAY MEDALLAS ÉPICAS PARA MOSTRAR' : '✅ HAY MEDALLAS ÉPICAS DISPONIBLES'}
    `;
    setDebugInfo(info);
  };

  // Función para actualizar gestas existentes con medallas
  const updateQuestsWithMedals = () => {
    const updatedQuests = quests.map(quest => {
      // Asignar medallas a las gestas específicas
      if (quest.id === 'with_coffee' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/gesta_café.png' };
      }
      if (quest.id === 'with_beer' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/gesta_birra.png' };
      }
      if (quest.id === 'other_substances' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/Otras_sustancias.png' };
      }
      if (quest.id === 'work_stress' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/Estres_laboral.png' };
      }
      if (quest.id === 'anxiety_periods' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/gesta_ansiedad.png' };
      }
      if (quest.id === 'ultimate_achievement' && !quest.medalIcon) {
        return { ...quest, medalIcon: '/lovable-uploads/Crack.png' };
      }
      return quest;
    });
    
    saveQuests(updatedQuests);
    toast.success('Medallas épicas actualizadas');
  };

  // NUEVA FUNCIÓN: Debug completo del sistema de medallas
  const debugMedalSystem = () => {
    console.log('\n🐛 === DEBUGGING MEDAL SYSTEM ===');
    
    const savedQuests = localStorage.getItem('epic-quests');
    console.log('Raw localStorage:', savedQuests);
    
    if (savedQuests) {
      const parsedQuests = JSON.parse(savedQuests);
      console.log('Parsed quests:', parsedQuests);
      
      const completedWithMedals = parsedQuests.filter((q: any) => q.isCompleted && q.medalIcon);
      console.log('Completed with medals:', completedWithMedals);
      
      // Simular la función getEpicQuestMedals
      const epicMedals = completedWithMedals.map((quest: any) => ({
        id: `epic_${quest.id}`,
        type: 'epic',
        title: quest.title,
        icon: quest.medalIcon,
        description: quest.description || quest.title,
        reward: quest.reward || 'Hazaña épica completada',
        questId: quest.id,
        category: quest.category || 'general'
      }));
      
      console.log('Generated epic medals:', epicMedals);
      
      // Mostrar en toast
      toast.success(`Debug: ${epicMedals.length} medallas épicas encontradas`, {
        description: epicMedals.map(m => m.title).join(', '),
        duration: 5000
      });
    }
    
    console.log('🐛 === END DEBUGGING ===\n');
  };

  // Función para verificar si se debe desbloquear la medalla final
  const checkUltimateAchievement = (updatedQuests: EpicQuest[]) => {
    // Contar gestas completadas (excluyendo la medalla final)
    const completedQuests = updatedQuests.filter(q => 
      q.isCompleted && q.id !== 'ultimate_achievement'
    );
    
    // Contar gestas con medalla (excluyendo la medalla final)
    const questsWithMedals = updatedQuests.filter(q => 
      q.medalIcon && q.id !== 'ultimate_achievement'
    );
    
    // Si todas las gestas con medalla están completadas, desbloquear la medalla final
    const ultimateQuest = updatedQuests.find(q => q.id === 'ultimate_achievement');
    if (ultimateQuest && !ultimateQuest.isCompleted && 
        questsWithMedals.length > 0 && 
        questsWithMedals.every(q => q.isCompleted)) {
      
      // Desbloquear automáticamente la medalla final
      const finalUpdatedQuests = updatedQuests.map(quest => {
        if (quest.id === 'ultimate_achievement') {
          return {
            ...quest,
            currentChecks: 1,
            isCompleted: true
          };
        }
        return quest;
      });
      
      toast.success('🎉 ¡CRACK! ¡Has desbloqueado la medalla de Maestría Total!', {
        description: 'Has completado todas las gestas épicas disponibles. Eres un verdadero maestro.',
        duration: 8000
      });
      
      return finalUpdatedQuests;
    }
    
    return updatedQuests;
  };

  // Guardar gestas en localStorage
  const saveQuests = (updatedQuests: EpicQuest[]) => {
    // Verificar medalla final antes de guardar
    const finalQuests = checkUltimateAchievement(updatedQuests);
    
    setQuests(finalQuests);
    localStorage.setItem('epic-quests', JSON.stringify(finalQuests));
    updateDebugInfo(finalQuests);
  };

  // Añadir check a una gesta
  const addCheck = (questId: string) => {
    const updatedQuests = quests.map(quest => {
      if (quest.id === questId && quest.currentChecks < quest.requiredChecks) {
        const newChecks = quest.currentChecks + 1;
        const isCompleted = newChecks >= quest.requiredChecks;
        
        if (isCompleted && !quest.isCompleted) {
          // Mostrar notificación especial para gestas con medalla
          if (quest.medalIcon) {
            toast.success(`¡Medalla épica desbloqueada: ${quest.title}!`, {
              description: `${quest.reward} - Tu medalla aparecerá en la pantalla principal`,
              duration: 5000
            });
          } else {
            toast.success(`¡Hazaña completada: ${quest.title}!`, {
              description: quest.reward || 'Has superado un desafío épico'
            });
          }
        }
        
        return {
          ...quest,
          currentChecks: newChecks,
          isCompleted
        };
      }
      return quest;
    });
    
    saveQuests(updatedQuests);
  };

  // Quitar check de una gesta
  const removeCheck = (questId: string) => {
    const updatedQuests = quests.map(quest => {
      if (quest.id === questId && quest.currentChecks > 0) {
        return {
          ...quest,
          currentChecks: quest.currentChecks - 1,
          isCompleted: false
        };
      }
      return quest;
    });
    
    saveQuests(updatedQuests);
  };

  // Eliminar gesta
  const deleteQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && !quest.isCustom) {
      toast.error('No puedes eliminar hazañas predefinidas');
      return;
    }
    
    const updatedQuests = quests.filter(q => q.id !== questId);
    saveQuests(updatedQuests);
    toast.success('Hazaña eliminada');
  };

  // Añadir nueva gesta personalizada
  const addCustomQuest = () => {
    if (!newQuestTitle.trim()) {
      toast.error('El título es obligatorio');
      return;
    }

    const newQuest: EpicQuest = {
      id: `custom_${Date.now()}`,
      title: newQuestTitle.trim(),
      description: newQuestDescription.trim() || newQuestTitle.trim(),
      requiredChecks: newQuestChecks,
      currentChecks: 0,
      icon: newQuestIcon,
      category: newQuestCategory,
      isCustom: true,
      isCompleted: false,
      reward: `Superación personal: ${newQuestTitle.trim()}`
    };

    const updatedQuests = [...quests, newQuest];
    saveQuests(updatedQuests);
    
    // Limpiar formulario
    setNewQuestTitle('');
    setNewQuestDescription('');
    setNewQuestChecks(3);
    setNewQuestCategory('situational');
    setNewQuestIcon('⚔️');
    setShowAddDialog(false);
    
    toast.success('Nueva hazaña añadida');
  };

  const completedQuests = quests.filter(q => q.isCompleted).length;
  const totalQuests = quests.length;
  const completedQuestsWithMedals = quests.filter(q => q.isCompleted && q.medalIcon).length;

  return (
    <div className="space-y-6">
      {/* Panel de debug visible */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Estado de las Medallas Épicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs text-yellow-800 whitespace-pre-wrap font-mono bg-white p-3 rounded border">
            {debugInfo}
          </pre>
          <div className="mt-3 space-y-2">
            <div className="flex gap-2">
              <Button 
                onClick={updateQuestsWithMedals}
                className="bg-orange-600 hover:bg-orange-700 text-white"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar Medallas Épicas
              </Button>
              <Button 
                onClick={debugMedalSystem}
                className="bg-purple-600 hover:bg-purple-700 text-white"
                size="sm"
              >
                <Bug className="w-4 h-4 mr-2" />
                Debug Sistema
              </Button>
            </div>
            <div className="text-sm text-yellow-700">
              <p><strong>¿No aparecen las medallas en la pantalla principal?</strong></p>
              <p>1. Haz clic en "Actualizar Medallas Épicas" arriba</p>
              <p>2. Marca los checks de las gestas que quieras completar</p>
              <p>3. Haz clic en "Debug Sistema" para verificar el estado</p>
              <p>4. Ve a la pantalla principal y busca las medallas en la sección "Medallas Obtenidas"</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Introducción explicativa */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-center text-blue-700 flex items-center justify-center gap-2">
            <Brain className="w-5 h-5" />
            Memoria Corporal y Neuroplasticidad
            <Heart className="w-5 h-5" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-blue-800 leading-relaxed space-y-3">
            <p>
              <strong>¿Por qué repetir cada situación varias veces?</strong> Cuando superas una situación difícil 
              sin vapear <strong>3 veces</strong> (o las que corresponda), esa experiencia queda grabada en tu 
              <strong> memoria corporal y cerebral</strong> como un nuevo patrón neurológico.
            </p>
            
            <p>
              Tu sistema nervioso <strong>aprende</strong> que puede vivir esa experiencia y <strong>disfrutarla 
              incluso más</strong> sin necesidad de nicotina. La repetición consolida nuevas conexiones neuronales 
              que reemplazan las asociaciones adictivas.
            </p>
            
            <div className="bg-white/70 p-3 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 italic">
                💡 <strong>Neuroplasticidad en acción:</strong> Cada vez que repites una experiencia sin vapear, 
                fortaleces las redes neuronales de autonomía y debilitas las de dependencia. Después de completar 
                una gesta, esa situación ya no será un "disparador\" sino una demostración de tu nueva cartografía psicofísica.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Header con estadísticas */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-center text-amber-700 flex items-center justify-center gap-2">
            ⚔️ Grandes hazañas
            <Trophy className="w-5 h-5" />
          </CardTitle>
          <p className="text-center text-amber-600">
            Situaciones difíciles superadas sin vapear
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/70 p-3 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">{completedQuests}</div>
              <div className="text-sm text-amber-700">hazañas completadas</div>
            </div>
            <div className="bg-white/70 p-3 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">{totalQuests}</div>
              <div className="text-sm text-amber-700">hazañas totales</div>
            </div>
            <div className="bg-white/70 p-3 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-1">
                <Medal className="w-5 h-5" />
                {completedQuestsWithMedals}
              </div>
              <div className="text-sm text-orange-700">medallas épicas</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progreso general</span>
              <span>{Math.round((completedQuests / totalQuests) * 100)}%</span>
            </div>
            <Progress value={(completedQuests / totalQuests) * 100} className="h-3" />
          </div>

          {completedQuestsWithMedals > 0 && (
            <div className="mt-4 bg-orange-100 p-3 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-800 text-center">
                🏆 Tienes {completedQuestsWithMedals} medalla{completedQuestsWithMedals > 1 ? 's' : ''} épica{completedQuestsWithMedals > 1 ? 's' : ''} visible{completedQuestsWithMedals > 1 ? 's' : ''} en la pantalla principal
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botón para añadir gesta personalizada */}
      <div className="flex justify-end">
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" />
              Añadir Hazaña Personalizada
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Hazaña</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={newQuestTitle}
                  onChange={(e) => setNewQuestTitle(e.target.value)}
                  placeholder="Ej: Presentación importante en el trabajo"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={newQuestDescription}
                  onChange={(e) => setNewQuestDescription(e.target.value)}
                  placeholder="Descripción detallada de la situación"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checks">Checks requeridos</Label>
                  <Select value={newQuestChecks.toString()} onValueChange={(value) => setNewQuestChecks(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 check</SelectItem>
                      <SelectItem value="2">2 checks</SelectItem>
                      <SelectItem value="3">3 checks</SelectItem>
                      <SelectItem value="4">4 checks</SelectItem>
                      <SelectItem value="5">5 checks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={newQuestCategory} onValueChange={(value) => setNewQuestCategory(value as EpicQuest['category'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="emotional">Emocional</SelectItem>
                      <SelectItem value="substance">Sustancias</SelectItem>
                      <SelectItem value="psychological">Psicológico</SelectItem>
                      <SelectItem value="situational">Situacional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="icon">Icono</Label>
                <Input
                  id="icon"
                  value={newQuestIcon}
                  onChange={(e) => setNewQuestIcon(e.target.value)}
                  placeholder="Ej: ⚔️, 🎯, 💪"
                  maxLength={2}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={addCustomQuest} className="flex-1">
                  Crear Hazaña
                </Button>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de gestas */}
      <div className="grid gap-4">
        {quests.map((quest) => (
          <Card key={quest.id} className={`${quest.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'} ${quest.id === 'ultimate_achievement' ? 'border-2 border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-2xl">{quest.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold ${quest.isCompleted ? 'text-green-700' : 'text-gray-800'} ${quest.id === 'ultimate_achievement' ? 'text-purple-700' : ''}`}>
                        {quest.title}
                      </h3>
                      {quest.isCompleted && <Trophy className="w-4 h-4 text-yellow-500" />}
                      {quest.isCompleted && quest.medalIcon && (
                        <Medal className="w-4 h-4 text-orange-500" title="Medalla épica obtenida" />
                      )}
                      {quest.id === 'ultimate_achievement' && (
                        <Crown className="w-4 h-4 text-purple-500" title="Medalla de Maestría Total" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{quest.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getCategoryColor(quest.category)}>
                        {getCategoryName(quest.category)}
                      </Badge>
                      {quest.isCustom && (
                        <Badge variant="outline" className="text-xs">
                          Personalizada
                        </Badge>
                      )}
                      {quest.medalIcon && (
                        <Badge variant="outline" className={`text-xs ${quest.id === 'ultimate_achievement' ? 'bg-purple-50 text-purple-700 border-purple-300' : 'bg-orange-50 text-orange-700 border-orange-300'}`}>
                          🏆 {quest.id === 'ultimate_achievement' ? 'Medalla de Maestría' : 'Con medalla épica'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {quest.isCustom && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteQuest(quest.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              {/* Checks y progreso */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Progreso: {quest.currentChecks}/{quest.requiredChecks}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: quest.requiredChecks }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (i < quest.currentChecks) {
                            removeCheck(quest.id);
                          } else if (i === quest.currentChecks) {
                            addCheck(quest.id);
                          }
                        }}
                        className="transition-colors hover:scale-110"
                      >
                        {i < quest.currentChecks ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-300 hover:text-green-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Progress 
                  value={(quest.currentChecks / quest.requiredChecks) * 100} 
                  className="h-2"
                />
                
                {quest.isCompleted && quest.reward && (
                  <div className={`p-3 rounded-lg border ${quest.id === 'ultimate_achievement' ? 'bg-purple-100 border-purple-200' : 'bg-green-100 border-green-200'}`}>
                    <p className={`text-sm font-medium mb-1 ${quest.id === 'ultimate_achievement' ? 'text-purple-800' : 'text-green-800'}`}>
                      🏆 Recompensa obtenida:
                    </p>
                    <p className={`text-sm ${quest.id === 'ultimate_achievement' ? 'text-purple-700' : 'text-green-700'}`}>
                      {quest.reward}
                    </p>
                    {quest.medalIcon && (
                      <p className="text-xs text-orange-700 mt-2 italic">
                        ✨ Medalla épica visible en la pantalla principal
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {quests.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">No tienes hazañas configuradas</p>
            <Button onClick={() => setShowAddDialog(true)}>
              Añadir tu primera hazaña
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EpicQuestsManager;