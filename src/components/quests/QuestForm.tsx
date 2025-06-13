import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';

interface QuestFormProps {
  onAddQuest: (questData: Omit<EpicQuest, 'id' | 'currentChecks' | 'isCompleted'>) => void;
}

const QuestForm = ({ onAddQuest }: QuestFormProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredChecks, setRequiredChecks] = useState(3);
  const [category, setCategory] = useState<EpicQuest['category']>('situational');
  const [icon, setIcon] = useState('⚔️');

  const handleSubmit = () => {
    if (!title.trim()) return;

    const questData = {
      title: title.trim(),
      description: description.trim() || title.trim(),
      requiredChecks,
      icon,
      category,
      isCustom: true,
      reward: `Superación personal: ${title.trim()}`
    };

    onAddQuest(questData);
    
    // Limpiar formulario
    setTitle('');
    setDescription('');
    setRequiredChecks(3);
    setCategory('situational');
    setIcon('⚔️');
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Presentación importante en el trabajo"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción detallada de la situación"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checks">Checks requeridos</Label>
              <Select value={requiredChecks.toString()} onValueChange={(value) => setRequiredChecks(parseInt(value))}>
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
              <Select value={category} onValueChange={(value) => setCategory(value as EpicQuest['category'])}>
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
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="Ej: ⚔️, 🎯, 💪"
              maxLength={2}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              Crear Hazaña
            </Button>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestForm;