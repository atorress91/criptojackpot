'use client';

import { useNotificationStore } from '@/store/notificationStore';
import React, { useEffect, useRef } from 'react';
import { toast, ToastContainer, ToastOptions, Id, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/notification.css';

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const notifications = useNotificationStore(state => state.notifications);
  const removeNotification = useNotificationStore(state => state.remove);
  const processedIds = useRef<Set<string>>(new Set());
  const toastIdsRef = useRef<Map<string, Id>>(new Map());

  useEffect(() => {
    notifications.forEach(notification => {
      if (processedIds.current.has(notification.id)) {
        return;
      }
      processedIds.current.add(notification.id);

      const content = notification.message && notification.message.trim() !== ''
        ? `${notification.title}: ${notification.message}`
        : notification.title;

      const duration = notification.duration || 5000;
      const toastOptions: ToastOptions = {
        onClose: () => {
          removeNotification(notification.id);
          processedIds.current.delete(notification.id);
          toastIdsRef.current.delete(notification.id);
        },
        autoClose: duration,
        closeButton: true,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      };

      let createdId: Id;
      switch (notification.type) {
        case 'success':
          createdId = toast.success(content, toastOptions);
          break;
        case 'error':
          createdId = toast.error(content, toastOptions);
          break;
        case 'warning':
          createdId = toast.warning(content, toastOptions);
          break;
        case 'info':
        default:
          createdId = toast.info(content, toastOptions);
          break;
      }

      toastIdsRef.current.set(notification.id, createdId);

      // Fallback programático: si por algún motivo no se cierra, forzar dismiss
      setTimeout(() => {
        const stillThere = toast.isActive(createdId);
        if (stillThere) {
          toast.dismiss(createdId);
        }
      }, duration + 100);
    });
  }, [notifications, removeNotification]);

  useEffect(() => {
    const currentIds = new Set(notifications.map(n => n.id));
    for (const [notifId, tId] of toastIdsRef.current) {
      if (!currentIds.has(notifId)) {
        toast.dismiss(tId);
        toastIdsRef.current.delete(notifId);
        processedIds.current.delete(notifId);
      }
    }
  }, [notifications]);

  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
        toastStyle={{
          backgroundColor: '#1a1a1a',
          color: '#f0f0f0',
          border: '1px solid #d4af37',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)',
        }}
        progressStyle={{
          background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 100%)',
        }}
        style={{ zIndex: 2147483647, pointerEvents: 'auto' }}
      />
    </>
  );
};
