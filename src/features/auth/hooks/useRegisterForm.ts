'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { countryService } from '@/services/countryService';
import { userService } from '@/services/userService';
import { useNotificationStore } from '@/store/notificationStore';
import { Country } from '@/interfaces/country';
import { RegisterFormData } from '@/interfaces/registerFormData';
import { UseRegisterFormReturn } from '@/features/auth/types';
import { User } from '@/interfaces/user';

export const useRegisterForm = (): UseRegisterFormReturn => {
  const { t } = useTranslation();
  const router = useRouter();
  const showNotification = useNotificationStore(state => state.show);

  const { data: countries = [], isLoading: isLoadingCountries, error: countriesError } = useQuery({
    queryKey: ['countries'],
    queryFn: () => countryService.getAllCountries(),
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (countriesError) {
      showNotification('error', t('REGISTER.errors.serverError'), t('REGISTER.errors.countryLoadError'));
    }
  }, [countriesError, showNotification, t]);

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

  const registerMutation = useMutation({
    mutationFn: (userData: User) => userService.createUser(userData),
    onSuccess: () => {
      showNotification('success', t('REGISTER.success'), t('REGISTER.successMessage'));
      setTimeout(() => {
        router.push('/login');
      }, 800);
    },
    onError: (error: any) => {
      const errorMessage = error.message || t('REGISTER.errors.serverError');
      showNotification('error', t('REGISTER.errors.serverError'), errorMessage);
      console.error('Registration error:', error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '') }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find(c => c.id === parseInt(e.target.value)) || null;
    setSelectedCountry(country);
  };

  const togglePasswordVisibility = () => setIsPasswordShow(prev => !prev);

  const setReferralCode = (code: string) => {
    if (code) {
      setFormData(prev => ({ ...prev, referralCode: code }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password || !formData.name || !formData.lastName || !selectedCountry) {
      showNotification('error', t('REGISTER.errors.invalidData'), t('REGISTER.errors.requiredFields'));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('error', t('REGISTER.errors.invalidData'), t('REGISTER.errors.invalidEmailFormat'));
      return false;
    }
    if (formData.password.length < 8) {
      showNotification('error', t('REGISTER.errors.invalidData'), t('REGISTER.errors.weakPassword'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData: User = {
      ...formData,
      countryId: selectedCountry?.id ?? 0,
      statePlace: formData.state,
      status: true,
      roleId: 2,
      country: selectedCountry || undefined,
    };

    registerMutation.mutate(userData);
  };

  return {
    formData: formData as RegisterFormData,
    countries,
    selectedCountry,
    isPasswordShow,
    isLoading: isLoadingCountries || registerMutation.isPending,
    error: registerMutation.error ? (registerMutation.error as Error).message : null,
    handleInputChange,
    handleCountryChange,
    togglePasswordVisibility,
    handleSubmit,
    setReferralCode,
  };
};