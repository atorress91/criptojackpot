'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useNotificationStore } from '@/store/notificationStore';
import { CreateTicketData } from '@/interfaces/ticket';
import { Prize } from '@/interfaces/prize';
import { PaginatedResponse } from '@/interfaces/paginatedResponse';
import { getTicketService, getPrizeService } from '@/di/serviceLocator';

export const useCreateTicketForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const showNotification = useNotificationStore(state => state.show);

  // Obtener lista de premios disponibles
  const { data: prizesResponse } = useQuery<PaginatedResponse<Prize>, Error>({
    queryKey: ['prizes'],
    queryFn: async () => {
      const prizeService = getPrizeService();
      return prizeService.getAllPrizes({ pageNumber: 1, pageSize: 100 });
    },
  });

  const prizes = prizesResponse?.data || [];

  const [formData, setFormData] = useState<CreateTicketData>({
    name: '',
    description: '',
    price: 0,
    drawDate: '',
    drawTime: '',
    totalTickets: 0,
    status: 'active',
    prizeId: undefined,
  });

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

    if (!formData.prizeId) {
      showNotification(
        'error',
        t('COMMON.error', 'Error'),
        t('TICKETS_ADMIN.errors.prizeRequired', 'El premio es requerido')
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

    // Enviar al servidor
    createTicketMutation.mutate(submitData);
  };

  return {
    formData,
    prizes,
    selectedPrize: prizes.find(p => p.id === formData.prizeId),
    isSubmitting: createTicketMutation.isPending,
    handleInputChange,
    handleSubmit,
  };
};
