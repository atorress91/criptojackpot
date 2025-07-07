import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotificationStore } from '@/store/notificationStore';
import { useAppStore } from '@/store/appStore';
import { useRegisterStore } from '@/store/registerStore';
import { Country } from '@/interfaces/country';
import { RegisterFormData } from '@/interfaces/registerFormData';

interface UseRegisterFormReturn {
  formData: RegisterFormData;
  countries: Country[];
  selectedCountry: Country | null;
  isPasswordShow: boolean;
  isLoading: boolean;
  error: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  togglePasswordVisibility: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setReferralCode: (code: string) => void;
}

export const useRegisterForm = (): UseRegisterFormReturn => {
  const { t } = useTranslation();
  const router = useRouter();

  // Estados de Zustand
  const showNotification = useNotificationStore(state => state.show);
  const { countries, loadCountries } = useAppStore();
  const {
    formData,
    selectedCountry,
    isPasswordShow,
    isLoading,
    error,
    updateFormData,
    setSelectedCountry,
    togglePasswordVisibility,
    registerUser,
    clearError,
    resetForm,
    setReferralCode,
  } = useRegisterStore();

  // Cargar países al montar el componente
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        await loadCountries();
      } catch (error) {
        showNotification(
          'error',
          t('REGISTER.errors.serverError').split('.')[0],
          t('REGISTER.errors.countryLoadError')
        );
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries().then();
  }, [loadCountries, showNotification, t]);

  // Limpiar el formulario al desmontar
  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      updateFormData({ [name]: cleaned });
    } else {
      updateFormData({ [name]: value });
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = parseInt(e.target.value);
    const country = countries.find(c => c.id === countryId);
    setSelectedCountry(country || null);
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password || !formData.name || !formData.lastName) {
      showNotification('error', t('REGISTER.errors.invalidData').split('.')[0], t('REGISTER.errors.requiredFields'));
      return false;
    }

    if (!formData.countryId) {
      showNotification('error', t('REGISTER.errors.invalidData').split('.')[0], t('REGISTER.errors.countryRequired'));
      return false;
    }

    // Validación adicional de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification(
        'error',
        t('REGISTER.errors.invalidData').split('.')[0],
        t('REGISTER.errors.invalidEmailFormat', 'Email inválido')
      );
      return false;
    }

    // Validación de contraseña
    if (formData.password.length < 8) {
      showNotification('error', t('REGISTER.errors.invalidData').split('.')[0], t('REGISTER.errors.weakPassword'));
      return false;
    }

    if (formData.referralCode) {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(formData.referralCode)) {
        showNotification(
          'error',
          t('REGISTER.errors.invalidData').split('.')[0],
          t('REGISTER.errors.invalidReferralCode', 'Código de referido inválido')
        );
        return false;
      }
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
      await registerUser();

      showNotification(
        'success',
        t('REGISTER.success', 'Registro exitoso'),
        t('REGISTER.successMessage', 'Tu cuenta ha sido creada exitosamente')
      );

      // Redirigir al login después de un registro exitoso
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error: any) {
      showNotification(
        'error',
        t('REGISTER.errors.serverError').split('.')[0],
        error.message || t('REGISTER.errors.serverError')
      );
      console.error('Registration error:', error);
    }
  };

  return {
    formData,
    countries,
    selectedCountry,
    isPasswordShow,
    isLoading,
    error,
    handleInputChange,
    handleCountryChange,
    togglePasswordVisibility,
    handleSubmit,
    setReferralCode,
  };
};
