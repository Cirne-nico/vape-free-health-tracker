import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { EpicQuest } from '@/data/epicQuests';
import { useTranslation } from 'react-i18next';

interface QuestFormProps {
  onAddQuest: (questData: Omit<EpicQuest, 'id' | 'currentChecks' | 'isCompleted'>) => void;
}

const QuestForm = ({ onAddQuest }: QuestFormProps) => {
  const { t } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredChecks, setRequiredChecks] = useState(3);
  const [category, setCategory] = useState<EpicQuest['category']>('psychological');
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
      reward: `${t('epicQuests.questCard.personalAchievement')}: ${title.trim()}`
    };

    onAddQuest(questData);
    
    // Limpiar formulario
    setTitle('');
    setDescription('');
    setRequiredChecks(3);
    setCategory('psychological');
    setIcon('⚔️');
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" />
          {t('epicQuests.addCustomQuest')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('epicQuests.questForm.title')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">{t('epicQuests.questForm.titleField')}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('epicQuests.questForm.titlePlaceholder')}
            />
          </div>
          
          <div>
            <Label htmlFor="description">{t('epicQuests.questForm.description')}</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('epicQuests.questForm.descriptionPlaceholder')}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checks">{t('epicQuests.questForm.checks')}</Label>
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
              <Label htmlFor="category">{t('epicQuests.questForm.category')}</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as EpicQuest['category'])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social">{t('epicQuests.categories.social.title')}</SelectItem>
                  <SelectItem value="emotional">{t('epicQuests.categories.emotional.title')}</SelectItem>
                  <SelectItem value="substance">{t('epicQuests.categories.substance.title')}</SelectItem>
                  <SelectItem value="psychological">{t('epicQuests.categories.psychological.title')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="icon">{t('epicQuests.questForm.icon')}</Label>
            <Input
              id="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder={t('epicQuests.questForm.iconPlaceholder')}
              maxLength={2}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              {t('epicQuests.questForm.create')}
            </Button>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              {t('epicQuests.questForm.cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestForm;