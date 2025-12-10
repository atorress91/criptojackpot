import { TFunction } from 'i18next';
import { CreatePrizeFormData } from '../types/createPrizeFormData';

type ShowNotification = (type: 'error' | 'success', title: string, message: string) => void;

export interface PrizeValidationResult {
  isValid: boolean;
  errorKey?: string;
}

export const validatePrizeName = (name: string): PrizeValidationResult => {
  if (!name.trim()) {
    return { isValid: false, errorKey: 'nameRequired' };
  }
  return { isValid: true };
};

export const validatePrizeDescription = (description: string): PrizeValidationResult => {
  if (!description.trim()) {
    return { isValid: false, errorKey: 'descriptionRequired' };
  }
  return { isValid: true };
};

export const validatePrizeEstimatedValue = (value: number): PrizeValidationResult => {
  if (value <= 0) {
    return { isValid: false, errorKey: 'valueInvalid' };
  }
  return { isValid: true };
};

export const validatePrizeMainImageUrl = (url: string): PrizeValidationResult => {
  if (!url.trim()) {
    return { isValid: false, errorKey: 'imageRequired' };
  }
  return { isValid: true };
};

export const validateCreatePrizeForm = (
  formData: CreatePrizeFormData,
  t: TFunction,
  showNotification: ShowNotification
): boolean => {
  const validations = [
    {
      result: validatePrizeName(formData.name),
      messageKey: 'PRIZES_ADMIN.errors.nameRequired',
      defaultMessage: 'El nombre es requerido',
    },
    {
      result: validatePrizeDescription(formData.description),
      messageKey: 'PRIZES_ADMIN.errors.descriptionRequired',
      defaultMessage: 'La descripción es requerida',
    },
    {
      result: validatePrizeEstimatedValue(formData.estimatedValue),
      messageKey: 'PRIZES_ADMIN.errors.valueInvalid',
      defaultMessage: 'El valor debe ser mayor a 0',
    },
    {
      result: validatePrizeMainImageUrl(formData.mainImageUrl),
      messageKey: 'PRIZES_ADMIN.errors.imageRequired',
      defaultMessage: 'La URL de imagen principal es requerida',
    },
  ];

  for (const validation of validations) {
    if (!validation.result.isValid) {
      showNotification('error', t('COMMON.error', 'Error'), t(validation.messageKey, validation.defaultMessage));
      return false;
    }
  }

  return true;
};
