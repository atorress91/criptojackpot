import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { AuthRequest } from '@/interfaces/authRequest';
import { authService } from '@/services/authService';
import { TokenService } from '@/services/tokenService';

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
  password: ''
};

export const useLoginForm = (): UseLoginFormReturn => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordShow(prev => !prev);
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setError('Please complete all fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }

    const password = formData.password;
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (password.length > 16) {
      setError('Password must not exceed 16 characters');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter');
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one number');
      return false;
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      setError('Password must contain at least one special character');
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
        password: formData.password
      };

      const user = await authService.authenticate(credentials);

      if (user.token) {
        TokenService.setToken(user.token);
        TokenService.setUser(user);
      }
      router.push('/app');

    } catch (error: any) {
      console.log('Login Error:', error);
      setError(error.message || 'Error al iniciar sesión');
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
    handleSubmit
  };
};