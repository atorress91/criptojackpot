'use client';

import { useNotificationStore } from '@/store/notificationStore';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const notifications = useNotificationStore(state => state.notifications);

  useEffect(() => {
    notifications.forEach(notification => {
      switch (notification.type) {
        case 'success':
          toast.success(notification.message);
          break;
        case 'error':
          toast.error(notification.message);
          break;
        case 'warning':
          toast.warning(notification.message);
          break;
        case 'info':
          toast.info(notification.message);
          break;
      }
    });
  }, [notifications]);

  return (
    <>
      {children}
      <ToastContainer position="top-right" />
    </>
  );
};
