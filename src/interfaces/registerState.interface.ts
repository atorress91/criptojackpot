import {Country} from "@/interfaces/country";
import {RegisterFormData} from "@/interfaces/registerFormData";

export interface RegisterState {
    formData: RegisterFormData;
    selectedCountry: Country | null;
    isPasswordShow: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    updateFormData: (data: Partial<RegisterFormData>) => void;
    setSelectedCountry: (country: Country | null) => void;
    togglePasswordVisibility: () => void;
    registerUser: () => Promise<void>;
    clearError: () => void;
    resetForm: () => void;
    setReferralCode: (code: string) => void;
}