'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { AuthRequest, LoginFormData } from '@/features/auth/types';
import { validateLoginForm } from '@/features/auth/validators/loginValidations';

export const useLoginForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const showNotification = useNotificationStore(state => state.show);
  const setAuthData = useAuthStore(state => state.login);

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (credentials: AuthRequest) => authService.authenticate(credentials),
    onSuccess: data => {
      setAuthData(data);
      showNotification('success', t('LOGIN.success'), t('LOGIN.welcome'));

      if (data.role?.name === 'admin') {
        router.push('/admin');
      } else {
        router.push('/user-panel');
      }
    },
    onError: () => {
      showNotification('error', t('LOGIN.errors.invalidCredentials'), '');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordShow(prev => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm(formData, t, showNotification)) {
      return;
    }
    loginMutation.mutate(formData);
  };

  return {
    formData,
    isPasswordShow,
    isLoading: loginMutation.isPending,
    error: loginMutation.error ? loginMutation.error.message || 'Error' : null,
    handleInputChange,
    togglePasswordVisibility,
    handleSubmit,
  };
};
