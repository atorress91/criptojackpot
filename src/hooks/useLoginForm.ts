import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { AuthRequest } from '@/interfaces/authRequest';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';

interface LoginFormData {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const showNotification = useNotificationStore(state => state.show);

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordShow(prev => !prev);
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      showNotification('error', t('LOGIN.errors.invalidData').split('.')[0], t('LOGIN.errors.requiredFields'));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification(
        'error',
        t('LOGIN.errors.invalidEmailFormat').split('.')[0],
        t('LOGIN.errors.invalidEmailFormat')
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      const credentials: AuthRequest = {
        email: formData.email,
        password: formData.password,
      };

      await login(credentials);

      showNotification('success', t('LOGIN.loading'), t('LOGIN.success'));

      // Redirigir según el rol
      const user = useAuthStore.getState().user;
      setTimeout(() => {
        if (user?.role?.name === 'admin') {
          router.push('/admin');
        } else {
          router.push('/user-panel');
        }
      }, 500);
    } catch (error: any) {
      showNotification(
        'error',
        t('LOGIN.errors.serverError').split('.')[0],
        error.message || t('LOGIN.errors.serverError')
      );
    }
  };

  return {
    formData,
    isPasswordShow,
    isLoading,
    error,
    handleInputChange,
    togglePasswordVisibility,
    handleSubmit,
  };
};
