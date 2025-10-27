'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotificationStore } from '@/store/notificationStore';
import { userService } from '@/services/userService';

interface ForgotPasswordFormData {
  email: string;
}

export const useForgotPasswordForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const showNotification = useNotificationStore(state => state.show);

  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      await userService.requestPasswordReset({ email });
    },
    onSuccess: () => {
      showNotification('success', t('FORGOT_PASSWORD.success'), '');
      setFormData({ email: '' });
      // Opcional: redirigir al login después de unos segundos
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    },
    onError: (error: any) => {
      const errorMessage = error?.message || t('FORGOT_PASSWORD.errors.serverError');
      showNotification('error', t('FORGOT_PASSWORD.errors.serverError'), errorMessage);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string): boolean => {
    if (!email) {
      showNotification('error', t('FORGOT_PASSWORD.errors.emailRequired'), '');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('error', t('FORGOT_PASSWORD.errors.invalidEmailFormat'), '');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      return;
    }

    forgotPasswordMutation.mutate(formData.email);
  };

  return {
    formData,
    isLoading: forgotPasswordMutation.isPending,
    handleInputChange,
    handleSubmit,
  };
};

