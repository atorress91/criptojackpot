import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';

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
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formData.password && formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      if (user) {
        updateUser({
          ...user,
          name: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        });
      }
    },
    [formData, user, updateUser]
  );

  return {
    formData,
    showPwd,
    setShowPwd,
    handleChange,
    handleSubmit,
  };
}
