import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Country } from '@/interfaces/country';
import { RegisterFormData } from '@/interfaces/registerFormData';
import { User } from '@/interfaces/user';
import { countryService } from '@/services/countryService';
import { userService } from '@/services/userService';
import { useNotification } from '@/providers/NotificationProvider';

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
}

const initialFormData: RegisterFormData = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  countryId: 0,
  identification: '',
  phone: '',
  state: '',
  city: '',
  address: '',
};

export const useRegisterForm = (): UseRegisterFormReturn => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const showNotification = useNotification();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = await countryService.getAllCountries();
        setCountries(countriesData);
      } catch (error) {
        showNotification(
          'error',
          'Faltan los países.',
          'Error al cargar los países. Por favor, inténtelo de nuevo más tarde.'
        );
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries().then();
  }, [showNotification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = parseInt(e.target.value);
    const country = countries.find(c => c.id === countryId);
    setSelectedCountry(country || null);
    setFormData(prev => ({ ...prev, countryId }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordShow(prev => !prev);
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password || !formData.name || !formData.lastName) {
      showNotification('error', 'Faltan campos requeridos', 'Por favor, complete todos los campos requeridos');
      return false;
    }
    if (!formData.countryId) {
      showNotification('error', 'Faltan campos requeridos', 'Por favor, seleccione un país');
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
      const userData: User = {
        ...formData,
        phone: selectedCountry ? `+${selectedCountry.phoneCode}${formData.phone}` : formData.phone,
        status: true,
        roleId: 2,
        country: selectedCountry!,
        statePlace: formData.state,
      };

      await userService.createUser(userData);
      router.push('/login');
    } catch (error: any) {
      showNotification(
        'error',
        'Error al registrarse',
        'Ocurrió un error durante el registro. Por favor, inténtelo de nuevo más tarde.'
      );
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
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
  };
};
