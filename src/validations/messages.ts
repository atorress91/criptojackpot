export const errorMessages = {
  required: "Este campo es requerido",
  email: "Por favor ingresa un email válido",
  minLength: (min: number) => `Debe tener al menos ${min} caracteres`,
  maxLength: (max: number) => `No debe exceder los ${max} caracteres`,
  phone: "Por favor ingresa un número de teléfono válido",
  lettersOnly: "Este campo solo debe contener letras",
  password: {
    minLength: "La contraseña debe tener al menos 6 caracteres",
    format: "La contraseña debe contener al menos una mayúscula y un número",
    maxLength: "La contraseña no debe exceder los 20 caracteres"
  },
  identification: "El número de identificación no es válido",
  country: "Por favor selecciona un país",
  address: "Por favor ingresa una dirección válida"
};