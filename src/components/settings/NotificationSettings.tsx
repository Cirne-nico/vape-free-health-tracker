import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NotificationSettingsProps {
  notifications: boolean;
  notificationTime: string;
  onNotificationsChange: (value: boolean) => void;
  onNotificationTimeChange: (value: string) => void;
}

const NotificationSettings = ({
  notifications,
  notificationTime,
  onNotificationsChange,
  onNotificationTimeChange
}: NotificationSettingsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Notificaciones</h3>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="notifications">Activar recordatorios diarios</Label>
          <p className="text-sm text-gray-600">Recibe una notificación para registrar tu estado</p>
        </div>
        <Switch
          id="notifications"
          checked={notifications}
          onCheckedChange={onNotificationsChange}
        />
      </div>

      {notifications && (
        <div className="space-y-2">
          <Label htmlFor="notification-time">Hora de recordatorio</Label>
          <Input
            id="notification-time"
            type="time"
            value={notificationTime}
            onChange={(e) => onNotificationTimeChange(e.target.value)}
            className="w-32"
          />
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;