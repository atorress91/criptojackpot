'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X as CloseIcon } from 'lucide-react';
import styles from './Notification.module.scss';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
}

interface Props {
  notifications: Notification[];
  removeNotification: (id: number) => void;
}

const iconMap = {
  success: <CheckCircle className={styles.icon} />,
  error: null,
  warning: <AlertTriangle className={styles.icon} />,
  info: <Info className={styles.icon} />,
};

const NotificationComponent: React.FC<Props> = ({ notifications, removeNotification }) => {
  // Auto-dismiss tras 5s
  useEffect(() => {
    notifications.forEach(n => {
      setTimeout(() => removeNotification(n.id), 5000);
    });
  }, [notifications, removeNotification]);

  // Renderizar en portal
  return createPortal(
    <div className={styles.container} role="alert" aria-live="assertive">
      <AnimatePresence initial={false}>
        {notifications.map(n => (
          <motion.div
            key={n.id}
            className={`${styles.notification} ${styles[n.type]}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.iconContainer}>{iconMap[n.type]}</span>
            <div className={styles.content}>
              <h4 className={styles.title}>{n.title}</h4>
              <p className={styles.message}>{n.message}</p>
            </div>
            <button className={styles.close} onClick={() => removeNotification(n.id)} aria-label="Cerrar">
              <CloseIcon size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default NotificationComponent;
