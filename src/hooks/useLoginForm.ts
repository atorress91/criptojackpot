import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { AuthRequest } from '@/interfaces/authRequest';
import { authService } from '@/services/authService';

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

// Simulación temporal de servicio de tokens
const TokenService = {
  setToken: (token: string) => {
    localStorage.setItem('auth_token', token);
  },
  setUser: (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
  }
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

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // MODO SIMULACIÓN - Establece a true para omitir la llamada al backend
    const SIMULATION_MODE = true;

    if (SIMULATION_MODE) {
      // Simulamos un pequeño retraso para dar sensación de carga real
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Crear un usuario simulado con los datos introducidos
      const mockUser = {
        email: formData.email,
        name: formData.email.split('@')[0],
        token: "mock-jwt-token-" + Math.random().toString(36).substring(2, 10),
        role: "user"
      };
      
      // Guardar los datos en localStorage como lo haría la aplicación real
      TokenService.setToken(mockUser.token);
      TokenService.setUser(mockUser);
      
      // Dejamos de mostrar el estado de carga
      setIsLoading(false);
      
      // Navegamos a la página que normalmente se mostraría tras un inicio de sesión exitoso
      window.location.href = '/user-panel';
      
      return;
    } 
    
    // CÓDIGO ORIGINAL - Se ejecuta cuando SIMULATION_MODE es false
    try {
      const credentials: AuthRequest = {
        email: formData.email,
        password: formData.password
      };

      const user = await authService.authenticate(credentials);

      // if (user.token) {
      //   TokenService.setToken(user.token);
      //   TokenService.setUser(user);
      // }
      router.push('/user-panel');

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