'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotificationStore } from '@/store/notificationStore';
import { Country } from '@/interfaces/country';
import { RegisterFormData } from '@/interfaces/registerFormData';
import { UseRegisterFormReturn } from '@/features/auth/types';
import { User } from '@/interfaces/user';
import { validateRegisterForm } from '../validators/registerValidations';
import { useCreateUser } from './useCreateUser';

export const useRegisterForm = (): UseRegisterFormReturn => {
  const { t } = useTranslation();
  const router = useRouter();
  const showNotification = useNotificationStore(state => state.show);

  const { countries, isLoadingCountries, createUser, isCreating, error } = useCreateUser({
    onSuccess: () => {
      setTimeout(() => {
        router.push('/login');
      }, 800);
    },
    showNotifications: true,
  });

  const [formData, setFormData] = useState<Omit<RegisterFormData, 'countryId'>>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    identification: '',
    phone: '',
    state: '',
    city: '',
    address: '',
    referralCode: '',
  });
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isPasswordShow, setIsPasswordShow] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: value.replaceAll(/\D/g, '') }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find(c => c.id === Number.parseInt(e.target.value, 10)) || null;
    setSelectedCountry(country);
  };

  const togglePasswordVisibility = () => setIsPasswordShow(prev => !prev);

  const setReferralCode = useCallback((code: string) => {
    if (code) {
      setFormData(prev => ({ ...prev, referralCode: code }));
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateRegisterForm(formData, selectedCountry, t, showNotification)) {
      return;
    }

    const userData: User = {
      ...formData,
      countryId: selectedCountry?.id ?? 0,
      statePlace: formData.state,
      status: true,
      roleId: 2, // Siempre rol Cliente para registro público
      country: selectedCountry || undefined,
    };

    createUser(userData);
  };

  return {
    formData: formData as RegisterFormData,
    countries,
    selectedCountry,
    isPasswordShow,
    isLoading: isCreating,
    isLoadingCountries,
    error,
    handleInputChange,
    handleCountryChange,
    togglePasswordVisibility,
    handleSubmit,
    setReferralCode,
  };
};
