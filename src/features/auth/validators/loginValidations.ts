import { LoginFormData } from '@/features/auth/types';
import { TFunction } from 'i18next';

type ShowNotification = (type: 'error' | 'success', title: string, message: string) => void;

export const validateLoginForm = (
    formData: LoginFormData,
    t: TFunction,
    showNotification: ShowNotification
): boolean => {

    if (!formData.email || !formData.password) {
        showNotification('error', t('LOGIN.errors.requiredFields'), '');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('error', t('LOGIN.errors.invalidEmailFormat'), '');
        return false;
    }

    return true;
};