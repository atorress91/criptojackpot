import { create } from 'zustand';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
  show: (type: NotificationType, title: string, message: string, duration?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationState>(set => ({
  notifications: [],

  show: (type, title, message, duration = 5000) => {
    const id = Date.now().toString();
    const notification: Notification = { id, type, title, message, duration };

    set(state => ({
      notifications: [...state.notifications, notification],
    }));

    if (duration > 0) {
      setTimeout(() => {
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id),
        }));
      }, duration);
    }
  },

  remove: id => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },

  clear: () => {
    set({ notifications: [] });
  },
}));
