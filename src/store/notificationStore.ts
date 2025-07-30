import {create} from 'zustand';

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

// Función auxiliar para generar ID único
const generateNotificationId = (): string => Date.now().toString();

// Función auxiliar para crear notificación
const createNotification = (
    type: NotificationType,
    title: string,
    message: string,
    duration?: number
): Notification => ({
    id: generateNotificationId(),
    type,
    title,
    message,
    duration
});

// Función auxiliar para agregar notificación al estado
const addNotificationToState = (notification: Notification) => (state: NotificationState) => ({
    notifications: [...state.notifications, notification]
});

// Función auxiliar para remover notificación del estado
const removeNotificationFromState = (id: string) => (state: NotificationState) => ({
    notifications: state.notifications.filter(n => n.id !== id)
});

// Función auxiliar para programar auto-eliminación
const scheduleNotificationRemoval = (id: string, duration: number, set: any) => {
    if (duration <= 0) return;

    setTimeout(() => {
        set(removeNotificationFromState(id));
    }, duration);
};

export const useNotificationStore = create<NotificationState>(set => ({
    notifications: [],

    show: (type, title, message, duration = 5000) => {
        const notification = createNotification(type, title, message, duration);

        set(addNotificationToState(notification));
        scheduleNotificationRemoval(notification.id, duration, set);
    },

    remove: (id: string) => {
        set(removeNotificationFromState(id));
    },

    clear: () => {
        set({notifications: []});
    },
}));