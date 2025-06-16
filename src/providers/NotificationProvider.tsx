'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import NotificationComponent from '@/components/notification/Notification';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  title: string;
}

const NotificationContext = createContext<(type: NotificationType, title: string, message: string) => void>(() => {});

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((type: NotificationType, title: string, message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <NotificationComponent notifications={notifications} removeNotification={removeNotification} />
    </NotificationContext.Provider>
  );
}
