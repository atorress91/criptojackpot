'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useNotificationStore } from '@/store/notificationStore';
import { CreateTicketData } from '@/interfaces/ticket';
import { Prize } from '@/interfaces/prize';
import { getTicketService, getPrizeService } from '@/di/serviceLocator';

export const useCreateTicketForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const showNotification = useNotificationStore(state => state.show);

  // Obtener lista de premios disponibles
  const { data: prizes = [] } = useQuery<Prize[], Error>({
    queryKey: ['prizes'],
    queryFn: async () => {
      const prizeService = getPrizeService();
      return prizeService.getPrizes();
    },
  });

  const [formData, setFormData] = useState<CreateTicketData>({
    name: '',
    description: '',
    price: 0,
    image: null,
    drawDate: '',
    drawTime: '',
    totalTickets: 0,
    status: 'active',
    prizeId: undefined,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const createTicketMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const ticketService = getTicketService();
      return ticketService.createTicket(data);
    },
    onSuccess: () => {
      showNotification(
        'success',
        t('TICKETS_ADMIN.create.success', 'Ticket creado exitosamente'),
        t('TICKETS_ADMIN.create.successMessage', 'El ticket se ha creado y está disponible')
      );
      setTimeout(() => {
        router.push('/admin/tickets');
      }, 1000);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        t('TICKETS_ADMIN.create.error', 'Error al crear el ticket. Intente nuevamente.');
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
          t('TICKETS_ADMIN.errors.invalidImageType', 'Formato de imagen no válido. Use JPG, PNG o WEBP')
        );
        return;
      }

      // Validar tamaño de archivo (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        showNotification(
          'error',
          t('COMMON.error', 'Error'),
          t('TICKETS_ADMIN.errors.imageTooLarge', 'La imagen es demasiado grande. Máximo 5MB')
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
        t('TICKETS_ADMIN.errors.nameRequired', 'El nombre es requerido')
      );
      return;
    }

    if (formData.price <= 0) {
      showNotification(
        'error',
        t('COMMON.error', 'Error'),
        t('TICKETS_ADMIN.errors.priceInvalid', 'El precio debe ser mayor a 0')
      );
      return;
    }

    if (formData.totalTickets <= 0) {
      showNotification(
        'error',
        t('COMMON.error', 'Error'),
        t('TICKETS_ADMIN.errors.totalTicketsInvalid', 'El total de tickets debe ser mayor a 0')
      );
      return;
    }

    if (!formData.drawDate) {
      showNotification(
        'error',
        t('COMMON.error', 'Error'),
        t('TICKETS_ADMIN.errors.drawDateRequired', 'La fecha del sorteo es requerida')
      );
      return;
    }

    if (!formData.drawTime) {
      showNotification(
        'error',
        t('COMMON.error', 'Error'),
        t('TICKETS_ADMIN.errors.drawTimeRequired', 'La hora del sorteo es requerida')
      );
      return;
    }

    // Validar que la fecha del sorteo sea futura
    const drawDateTime = new Date(`${formData.drawDate}T${formData.drawTime}`);
    const now = new Date();
    if (drawDateTime <= now) {
      showNotification(
        'error',
        t('COMMON.error', 'Error'),
        t('TICKETS_ADMIN.errors.drawDatePast', 'La fecha del sorteo debe ser en el futuro')
      );
      return;
    }

    if (!formData.image) {
      showNotification(
        'error',
        t('COMMON.error', 'Error'),
        t('TICKETS_ADMIN.errors.imageRequired', 'La imagen es requerida')
      );
      return;
    }

    // Preparar FormData para enviar
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('price', formData.price.toString());
    submitData.append('totalTickets', formData.totalTickets.toString());
    submitData.append('drawDate', formData.drawDate);
    submitData.append('drawTime', formData.drawTime);
    submitData.append('status', formData.status);

    if (formData.prizeId) {
      submitData.append('prizeId', formData.prizeId);
    }

    if (formData.image) {
      submitData.append('image', formData.image);
    }

    // Enviar al servidor
    createTicketMutation.mutate(submitData);
  };

  return {
    formData,
    prizes,
    imagePreview,
    isSubmitting: createTicketMutation.isPending,
    handleInputChange,
    handleImageChange,
    handleSubmit,
  };
};
