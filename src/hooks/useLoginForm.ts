import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { AuthRequest } from '@/interfaces/authRequest';
import { authService } from '@/services/authService';
import { useNotification } from '@/providers/NotificationProvider';
import { useTranslation } from 'react-i18next';
import { TokenService } from '@/services/tokenService';
import { User } from '@/interfaces/user';

interface LoginFormData {
  email: string;
  password: string;
}

interface UseLoginFormReturn {
  formData: LoginFormData;
  isPasswordShow: boolean;
  isLoading: boolean;
  error: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const initialFormData: LoginFormData = {
  email: '',
  password: '',
};

export const useLoginForm = (): UseLoginFormReturn => {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const showNotification = useNotification();

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
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const credentials: AuthRequest = {
        email: formData.email,
        password: formData.password,
      };

      // La respuesta del backend ya incluye token y datos del usuario
      const userData = (await authService.authenticate(credentials)) as User;

      if (userData.token) {
        TokenService.setToken(userData.token);
        TokenService.setUser(userData);

        showNotification('success', t('LOGIN.loading'), t('LOGIN.success'));

        // Redirigir según el rol
        setTimeout(() => {
          const roleName = userData.role?.name;
          if (roleName === 'admin') {
            router.push('/admin');
          } else {
            router.push('/user-panel');
          }
        }, 500);
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      setError(error.message || t('LOGIN.errors.serverError'));
      showNotification(
        'error',
        t('LOGIN.errors.serverError').split('.')[0],
        error.message || t('LOGIN.errors.serverError')
      );
    } finally {
      setIsLoading(false);
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
