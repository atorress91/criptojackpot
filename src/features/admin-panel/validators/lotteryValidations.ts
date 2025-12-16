import { TFunction } from 'i18next';
import { CreateLotteryRequest } from '@/interfaces/lottery';

type ShowNotification = (type: 'error' | 'success', title: string, message: string) => void;

export interface LotteryValidationResult {
  isValid: boolean;
  errorKey?: string;
}

export const validateLotteryTitle = (title: string): LotteryValidationResult => {
  if (!title.trim()) {
    return { isValid: false, errorKey: 'titleRequired' };
  }
  return { isValid: true };
};

export const validateLotteryDescription = (description: string): LotteryValidationResult => {
  if (!description.trim()) {
    return { isValid: false, errorKey: 'descriptionRequired' };
  }
  return { isValid: true };
};

export const validateLotteryMinNumber = (minNumber: number): LotteryValidationResult => {
  if (minNumber < 0) {
    return { isValid: false, errorKey: 'minNumberInvalid' };
  }
  return { isValid: true };
};

export const validateLotteryMaxNumber = (maxNumber: number, minNumber: number): LotteryValidationResult => {
  if (maxNumber <= minNumber) {
    return { isValid: false, errorKey: 'maxNumberInvalid' };
  }
  return { isValid: true };
};

export const validateLotteryTicketPrice = (ticketPrice: number): LotteryValidationResult => {
  if (ticketPrice <= 0) {
    return { isValid: false, errorKey: 'ticketPriceInvalid' };
  }
  return { isValid: true };
};

export const validateLotteryMaxTickets = (maxTickets: number): LotteryValidationResult => {
  if (maxTickets <= 0) {
    return { isValid: false, errorKey: 'maxTicketsInvalid' };
  }
  return { isValid: true };
};

export const validateLotteryStartDate = (startDate: string): LotteryValidationResult => {
  if (!startDate) {
    return { isValid: false, errorKey: 'startDateRequired' };
  }
  return { isValid: true };
};

export const validateLotteryEndDate = (endDate: string): LotteryValidationResult => {
  if (!endDate) {
    return { isValid: false, errorKey: 'endDateRequired' };
  }
  return { isValid: true };
};

export const validateLotteryDateRange = (startDate: string, endDate: string): LotteryValidationResult => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end <= start) {
    return { isValid: false, errorKey: 'endDateInvalid' };
  }
  return { isValid: true };
};

export const validateLotteryMinimumAge = (hasAgeRestriction: boolean, minimumAge?: number): LotteryValidationResult => {
  if (hasAgeRestriction && (!minimumAge || minimumAge < 18)) {
    return { isValid: false, errorKey: 'minimumAgeInvalid' };
  }
  return { isValid: true };
};

export const validateLotteryTerms = (terms: string): LotteryValidationResult => {
  if (!terms.trim()) {
    return { isValid: false, errorKey: 'termsRequired' };
  }
  return { isValid: true };
};

export const validateCreateLotteryForm = (
  formData: CreateLotteryRequest,
  t: TFunction,
  showNotification: ShowNotification
): boolean => {
  const validations = [
    {
      result: validateLotteryTitle(formData.title),
      messageKey: 'LOTTERY_ADMIN.errors.titleRequired',
      defaultMessage: 'El título es requerido',
    },
    {
      result: validateLotteryDescription(formData.description),
      messageKey: 'LOTTERY_ADMIN.errors.descriptionRequired',
      defaultMessage: 'La descripción es requerida',
    },
    {
      result: validateLotteryMinNumber(formData.minNumber),
      messageKey: 'LOTTERY_ADMIN.errors.minNumberInvalid',
      defaultMessage: 'El número mínimo debe ser mayor o igual a 0',
    },
    {
      result: validateLotteryMaxNumber(formData.maxNumber, formData.minNumber),
      messageKey: 'LOTTERY_ADMIN.errors.maxNumberInvalid',
      defaultMessage: 'El número máximo debe ser mayor al mínimo',
    },
    {
      result: validateLotteryTicketPrice(formData.ticketPrice),
      messageKey: 'LOTTERY_ADMIN.errors.ticketPriceInvalid',
      defaultMessage: 'El precio del ticket debe ser mayor a 0',
    },
    {
      result: validateLotteryMaxTickets(formData.maxTickets),
      messageKey: 'LOTTERY_ADMIN.errors.maxTicketsInvalid',
      defaultMessage: 'El máximo de tickets debe ser mayor a 0',
    },
    {
      result: validateLotteryStartDate(formData.startDate),
      messageKey: 'LOTTERY_ADMIN.errors.startDateRequired',
      defaultMessage: 'La fecha de inicio es requerida',
    },
    {
      result: validateLotteryEndDate(formData.endDate),
      messageKey: 'LOTTERY_ADMIN.errors.endDateRequired',
      defaultMessage: 'La fecha de fin es requerida',
    },
    {
      result: validateLotteryDateRange(formData.startDate, formData.endDate),
      messageKey: 'LOTTERY_ADMIN.errors.endDateInvalid',
      defaultMessage: 'La fecha de fin debe ser posterior a la de inicio',
    },
    {
      result: validateLotteryMinimumAge(formData.hasAgeRestriction, formData.minimumAge),
      messageKey: 'LOTTERY_ADMIN.errors.minimumAgeInvalid',
      defaultMessage: 'La edad mínima debe ser al menos 18 años',
    },
    {
      result: validateLotteryTerms(formData.terms),
      messageKey: 'LOTTERY_ADMIN.errors.termsRequired',
      defaultMessage: 'Los términos y condiciones son requeridos',
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

export const validateLotteryDrawDateTime = (drawDate: string, drawTime: string): LotteryValidationResult => {
  if (!drawDate || !drawTime) {
    return { isValid: false, errorKey: 'drawDateTimeRequired' };
  }
  return { isValid: true };
};

export const validateEditLotteryForm = (
  formData: {
    name: string;
    price: number;
    totalTickets: number;
    drawDate: string;
    drawTime: string;
  },
  t: TFunction,
  showNotification: ShowNotification
): boolean => {
  const validations = [
    {
      result: validateLotteryTitle(formData.name),
      messageKey: 'LOTTERIES_ADMIN.errors.nameRequired',
      defaultMessage: 'El nombre es requerido',
    },
    {
      result: validateLotteryTicketPrice(formData.price),
      messageKey: 'LOTTERIES_ADMIN.errors.priceInvalid',
      defaultMessage: 'El precio debe ser mayor a 0',
    },
    {
      result: validateLotteryMaxTickets(formData.totalTickets),
      messageKey: 'LOTTERIES_ADMIN.errors.totalTicketsInvalid',
      defaultMessage: 'El total de tickets debe ser mayor a 0',
    },
    {
      result: validateLotteryDrawDateTime(formData.drawDate, formData.drawTime),
      messageKey: 'LOTTERIES_ADMIN.errors.drawDateRequired',
      defaultMessage: 'La fecha y hora del sorteo son requeridas',
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
