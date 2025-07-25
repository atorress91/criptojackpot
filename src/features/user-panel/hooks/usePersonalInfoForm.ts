import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { userService } from '@/services/userService';
import { FormData, ShowPwd, UpdateUserRequest } from '@/features/user-panel/types';

export function usePersonalInfoForm() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuthStore();
  const showNotification = useNotificationStore(state => state.show);
  const queryClient = useQueryClient(); // Opcional, para invalidar queries si es necesario

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPwd, setShowPwd] = useState<ShowPwd>({
    password: false,
    confirmPassword: false,
  });

  // Efecto para inicializar el formulario con los datos del usuario
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  // Mutación de React Query para actualizar el usuario
  const updateUserMutation = useMutation({
    mutationFn: (userData: { id: number; data: UpdateUserRequest }) =>
        userService.updateUserAsync(userData.id, userData.data),
    onSuccess: (updatedUserData) => {
      updateUser(updatedUserData);
      showNotification('success', 'Success', t('PERSONAL_INFO.notifications.updateSuccess'));

      // invalidar queries
      queryClient.invalidateQueries({queryKey:['user', user?.id]}).then();
    },
    onError: (error: any) => {
      console.error('Failed to update profile:', error);
      const errorMessage = error?.message || t('PERSONAL_INFO.notifications.updateError');
      showNotification('error', 'Error', errorMessage);
    },
  });

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      showNotification('error', 'Error', t('PERSONAL_INFO.notifications.passwordMismatch'));
      return;
    }

    if (user && user.id) {
      const updatedUserData: UpdateUserRequest = {
        name: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        password: ''
      };

      if (formData.password) {
        updatedUserData.password = formData.password;
      }

      updateUserMutation.mutate({ id: user.id, data: updatedUserData });
    }
  };

  return {
    formData,
    showPwd,
    setShowPwd,
    handleChange,
    handleSubmit,
    isLoading: updateUserMutation.isPending,
    error: updateUserMutation.error,
  };
}