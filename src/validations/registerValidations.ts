import { RegisterFormInputs } from '../types/form.types';
import { errorMessages } from './messages';

export const registerValidations = {
  firstName: {
    required: errorMessages.required,
    minLength: {
      value: 2,
      message: errorMessages.minLength(2)
    },
    maxLength: {
      value: 50,
      message: errorMessages.maxLength(50)
    },
    pattern: {
      value: /^[A-Za-zÀ-ÿ\s]+$/,
      message: errorMessages.lettersOnly
    }
  },
  lastName: {
    required: errorMessages.required,
    minLength: {
      value: 2,
      message: errorMessages.minLength(2)
    },
    maxLength: {
      value: 50,
      message: errorMessages.maxLength(50)
    },
    pattern: {
      value: /^[A-Za-zÀ-ÿ\s]+$/,
      message: errorMessages.lettersOnly
    }
  },
  email: {
    required: errorMessages.required,
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: errorMessages.email
    },
    maxLength: {
      value: 100,
      message: errorMessages.maxLength(100)
    }
  },
  password: {
    required: errorMessages.required,
    minLength: {
      value: 6,
      message: errorMessages.password.minLength
    },
    maxLength: {
      value: 20,
      message: errorMessages.password.maxLength
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      message: "La contraseña debe contener al menos una mayúscula, un número y un carácter especial"
    }
  },
  country: {
    required: errorMessages.country
  },
  identification: {
    required: errorMessages.required,
    minLength: {
      value: 5,
      message: errorMessages.minLength(5)
    },
    maxLength: {
      value: 20,
      message: errorMessages.maxLength(20)
    },
    pattern: {
      value: /^[A-Za-z0-9-]+$/,
      message: errorMessages.identification
    }
  },
  phone: {
    required: errorMessages.required,
    pattern: {
      value: /^\d{7,15}$/,
      message: errorMessages.phone
    },
    validate: {
      noSpaces: (value: string) => !value.includes(' ') || "El número no debe contener espacios",
      validLength: (value: string) =>
        (value.length >= 7 && value.length <= 15) ||
        "El número debe tener entre 7 y 15 dígitos"
    }
  },
  state: {
    required: false,
    maxLength: {
      value: 50,
      message: errorMessages.maxLength(50)
    },
    pattern: {
      value: /^[A-Za-zÀ-ÿ\s-]+$/,
      message: errorMessages.lettersOnly
    }
  },
  city: {
    required: false,
    maxLength: {
      value: 50,
      message: errorMessages.maxLength(50)
    },
    pattern: {
      value: /^[A-Za-zÀ-ÿ\s-]+$/,
      message: errorMessages.lettersOnly
    }
  },
  address: {
    required: false,
    minLength: {
      value: 5,
      message: errorMessages.minLength(5)
    },
    maxLength: {
      value: 200,
      message: errorMessages.maxLength(200)
    },
    validate: {
      validCharacters: (value: string) =>
        /^[A-Za-z0-9À-ÿ\s,.-]+$/.test(value) ||
        "La dirección contiene caracteres no válidos",
      noConsecutiveSpaces: (value: string) =>
        !/\s{2,}/.test(value) ||
        "La dirección no debe contener espacios consecutivos"
    }
  }
};

// Validaciones adicionales personalizadas
export const validateForm = {
  checkPassword: (value: string, values: RegisterFormInputs) => {

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);

    if (!hasUpperCase) return "La contraseña debe contener al menos una mayúscula";
    if (!hasLowerCase) return "La contraseña debe contener al menos una minúscula";
    if (!hasNumbers) return "La contraseña debe contener al menos un número";
    if (!hasSpecialChar) return "La contraseña debe contener al menos un carácter especial";

    return true;
  },
};