'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';

import { useNotificationStore } from '@/store/notificationStore';
import { CreatePrizeData } from '@/interfaces/prize';
import { getPrizeService } from '@/di/serviceLocator';

export const useCreatePrizeForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const showNotification = useNotificationStore(state => state.show);

  const [formData, setFormData] = useState<CreatePrizeData>({
    name: '',
    description: '',
    value: 0,
    image: null,
    category: 'electronics',
    brand: '',
    model: '',
    specifications: {},
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const createPrizeMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const prizeService = getPrizeService();
      return prizeService.createPrize(data);
    },
    onSuccess: () => {
      showNotification(
        'success',
        t('PRIZES_ADMIN.create.success', 'Premio creado exitosamente'),
        t('PRIZES_ADMIN.create.successMessage', 'El premio se ha creado y está disponible')
      );
      setTimeout(() => {
        router.push('/admin/prizes');
      }, 1000);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        t('PRIZES_ADMIN.create.error', 'Error al crear el premio. Intente nuevamente.');
      showNotification('error', t('COMMON.error', 'Error'), errorMessage);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: Number.parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        showNotification(
          'error',
          t('COMMON.error', 'Error'),
          t('PRIZES_ADMIN.errors.invalidImageType', 'Formato de imagen no válido. Use JPG, PNG o WEBP')
        );
        return;
      }

      // Validar tamaño de archivo (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        showNotification(
          'error',
          t('COMMON.error', 'Error'),
          t('PRIZES_ADMIN.errors.imageTooLarge', 'La imagen es demasiado grande. Máximo 5MB')
        );
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));

      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.name.trim()) {
      showNotification(
        'error',
        t('COMMON.error', 'Error'),
        t('PRIZES_ADMIN.errors.nameRequired', 'El nombre es requerido')
      );
      return;
    }

    if (formData.value <= 0) {
      showNotification(
        'error',
        t('COMMON.error', 'Error'),
        t('PRIZES_ADMIN.errors.valueInvalid', 'El valor debe ser mayor a 0')
      );
      return;
    }

    if (!formData.image) {
      showNotification(
        'error',
        t('COMMON.error', 'Error'),
        t('PRIZES_ADMIN.errors.imageRequired', 'La imagen es requerida')
      );
      return;
    }

    // Preparar FormData para enviar
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('value', formData.value.toString());
    submitData.append('category', formData.category);

    if (formData.brand) {
      submitData.append('brand', formData.brand);
    }

    if (formData.model) {
      submitData.append('model', formData.model);
    }

    if (formData.specifications && Object.keys(formData.specifications).length > 0) {
      submitData.append('specifications', JSON.stringify(formData.specifications));
    }

    if (formData.image) {
      submitData.append('image', formData.image);
    }

    // Enviar al servidor
    createPrizeMutation.mutate(submitData);
  };

  return {
    formData,
    imagePreview,
    isSubmitting: createPrizeMutation.isPending,
    handleInputChange,
    handleImageChange,
    handleSubmit,
  };
};
