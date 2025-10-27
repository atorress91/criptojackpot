'use client';

import { useNotificationStore } from '@/store/notificationStore';
import React, { useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const notifications = useNotificationStore(state => state.notifications);
  const processedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    notifications.forEach(notification => {
      // Evitar mostrar la misma notificación múltiples veces
      if (processedIds.current.has(notification.id)) {
        return;
      }

      processedIds.current.add(notification.id);

      // Construir el contenido: si hay mensaje y no está vacío, mostrarlo con el título, sino solo el título
      const content = notification.message && notification.message.trim() !== ''
        ? `${notification.title}: ${notification.message}`
        : notification.title;

      switch (notification.type) {
        case 'success':
          toast.success(content);
          break;
        case 'error':
          toast.error(content);
          break;
        case 'warning':
          toast.warning(content);
          break;
        case 'info':
          toast.info(content);
          break;
      }
    });
  }, [notifications]);

  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};
