import React, { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { userService } from '@/services/userService';
import { useNotificationStore } from '@/store/notificationStore';
import { UpdateUserRequest } from '@/interfaces/updateUserRequest';
import { useTranslation } from 'react-i18next';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface ShowPwd {
  password: boolean;
  confirmPassword: boolean;
}

export function usePersonalInfoForm() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuthStore();
  const showNotification = useNotificationStore(state => state.show);

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

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formData.password && formData.password !== formData.confirmPassword) {
        showNotification('error', 'Error', t('PERSONAL_INFO.notifications.passwordMismatch'));
        return;
      }
      if (user) {
        try {
          const updatedUserData: UpdateUserRequest = {
            name: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            password: '',
          };

          if (formData.password) {
            updatedUserData.password = formData.password;
          }

          const response = await userService.updateUserAsync(user.id ?? 0, updatedUserData);

          updateUser(response);
          showNotification('success', 'Success', t('PERSONAL_INFO.notifications.updateSuccess'));
        } catch (error) {
          console.error('Failed to update profile:', error);
          showNotification('error', 'Error', t('PERSONAL_INFO.notifications.updateError'));
        }
      }
    },
    [formData, user, updateUser, showNotification, t]
  );

  return {
    formData,
    showPwd,
    setShowPwd,
    handleChange,
    handleSubmit,
  };
}
