import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { userService } from '@/services/userService';
import { useNotificationStore } from '@/store/notificationStore';

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
        phone: user.phone || '',
        password: '************',
        confirmPassword: '************',
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
        alert('Las contraseñas no coinciden');
        return;
      }
      if (user) {
        try {
          // 1. Call the service to update the user on the backend
          const updatedUserData = {
            ...user,
            name: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            // Conditionally include password if it has changed
            ...(formData.password !== '************' && { password: formData.password }),
          };

          const response = await userService.updateUserAsync(user.id ?? 0, updatedUserData);

          // 2. Update the local state in Zustand
          updateUser(response);

          showNotification('success', 'Success', 'Profile updated successfully!');
        } catch (error) {
          console.error('Failed to update profile:', error);
          showNotification('error', 'Error', 'Failed to update profile.');
        }
      }
    },
    [formData, user, updateUser, showNotification]
  );

  return {
    formData,
    showPwd,
    setShowPwd,
    handleChange,
    handleSubmit,
  };
}
