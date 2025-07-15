import { create } from 'zustand';
import { RegisterFormData } from '@/interfaces/registerFormData';

import { User } from '@/interfaces/user';
import { userService } from '@/services/userService';
import {RegisterState} from "@/interfaces/registerState";


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
  referralCode: '',
};

export const useRegisterStore = create<RegisterState>((set, get) => ({
  formData: initialFormData,
  selectedCountry: null,
  isPasswordShow: false,
  isLoading: false,
  error: null,

  updateFormData: data => {
    set(state => ({
      formData: { ...state.formData, ...data },
    }));
  },

  setSelectedCountry: country => {
    set({ selectedCountry: country });
    if (country) {
      set(state => ({
        formData: { ...state.formData, countryId: country.id },
      }));
    }
  },

  togglePasswordVisibility: () => {
    set(state => ({ isPasswordShow: !state.isPasswordShow }));
  },

  setReferralCode: (code: string) => {
    set(state => ({
      formData: { ...state.formData, referralCode: code },
    }));
  },

  registerUser: async () => {
    set({ isLoading: true, error: null });

    try {
      const { formData, selectedCountry } = get();

      const userData: User = {
        ...formData,
        phone: selectedCountry ? `+${selectedCountry.phoneCode}${formData.phone}` : formData.phone,
        status: true,
        roleId: 2,
        country: selectedCountry!,
        statePlace: formData.state,
      };

      await userService.createUser(userData);

      // Limpiar el formulario después del registro exitoso
      set({
        formData: initialFormData,
        selectedCountry: null,
        isPasswordShow: false,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Error al registrar usuario',
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  resetForm: () => {
    set({
      formData: initialFormData,
      selectedCountry: null,
      isPasswordShow: false,
      error: null,
    });
  },
}));
