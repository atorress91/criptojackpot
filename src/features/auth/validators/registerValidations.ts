import { Country } from '@/interfaces/country';
import { RegisterFormData } from '@/interfaces/registerFormData';
import { TFunction } from 'i18next';

type ShowNotification = (type: 'error' | 'success', title: string, message: string) => void;

export const validateRegisterForm = (
    formData: Omit<RegisterFormData, 'countryId'>,
    selectedCountry: Country | null,
    t: TFunction,
    showNotification: ShowNotification
): boolean => {

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