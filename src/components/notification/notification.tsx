"use client";

import { useState } from 'react';
import './NotificationComponent.css';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState<Array<{ id: number; type: NotificationType; title: string; message: string }>>([]);

  const showNotification = (type: NotificationType, title: string, message: string) => {
    const id = Date.now();
    const newNotification = { id, type, title, message };
    setNotifications(prev => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 3000);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return (
          <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="notification-container">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            {getIcon(notification.type)}
            <div className="notification-content">
              <h4 className="notification-title">{notification.title}</h4>
              <p className="notification-message">{notification.message}</p>
            </div>
            <button
              className="notification-close"
              onClick={() => removeNotification(notification.id)}
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="demo-buttons">
        <button
          className="demo-button success"
          onClick={() => showNotification(
            'success',
            '¡Éxito!',
            'La operación se completó correctamente.'
          )}
        >
          Mostrar Éxito
        </button>
        <button
          className="demo-button error"
          onClick={() => showNotification(
            'error',
            'Error',
            'Ocurrió un error al procesar la solicitud.'
          )}
        >
          Mostrar Error
        </button>
      </div>
    </>
  );
};

export default NotificationComponent;