import { useForm } from 'react-hook-form';
import { RegisterFormInputs } from '../types/form.types';
import { registerValidations } from '../validations/registerValidations';

export const useRegisterForm = () => {
  const form = useForm<RegisterFormInputs>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      country: '',
      identification: '',
      phone: '',
      state: '',
      city: '',
      address: ''
    }
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      // Lógica de envío
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      // Manejo del éxito
      return { success: true };
    } catch (error) {
      // Manejo del error
      return { success: false, error };
    }
  };

  return {
    form,
    onSubmit,
    validations: registerValidations
  };
};
