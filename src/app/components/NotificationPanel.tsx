import { useTranslation } from 'react-i18next';
import { useNotifications } from '../contexts/NotificationContext';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
  Bell,
  Package,
  AlertTriangle,
  Clock,
  CheckCircle,
  X,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

export function NotificationPanel({ onClose }: { onClose: () => void }) {
  const { t, i18n } = useTranslation();
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'request':
        return <Package className="h-5 w-5" />;
      case 'lowStock':
        return <AlertTriangle className="h-5 w-5" />;
      case 'expiring':
        return <Clock className="h-5 w-5" />;
      case 'order':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'request':
        return 'bg-gradient-to-br from-blue-500 to-blue-600';
      case 'lowStock':
        return 'bg-gradient-to-br from-red-500 to-red-600';
      case 'expiring':
        return 'bg-gradient-to-br from-yellow-500 to-yellow-600';
      case 'order':
        return 'bg-gradient-to-br from-green-500 to-green-600';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  const locale = i18n.language === 'ar' ? ar : enUS;

  return (
    <div className="w-96 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('notifications.title')}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="flex-1 rounded-xl text-xs"
          >
            {t('notifications.markAllRead')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            className="flex-1 rounded-xl text-xs"
          >
            {t('notifications.clearAll')}
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[500px]">
        <div className="p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                {t('notifications.noNotifications')}
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  notification.read
                    ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`${getIconColor(
                      notification.type
                    )} rounded-xl p-2.5 text-white shadow-md flex-shrink-0`}
                  >
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      {formatDistanceToNow(notification.timestamp, {
                        addSuffix: true,
                        locale,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
