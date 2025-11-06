'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNotificationStore } from '@/store/notificationStore';
import { Ticket, TicketFilters } from '@/interfaces/ticket';
import { getTicketService } from '@/di/serviceLocator';

export const useTickets = (filters?: TicketFilters) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const showNotification = useNotificationStore(state => state.show);

  // Obtener lista de tickets
  const {
    data: tickets,
    isLoading,
    error,
    refetch,
  } = useQuery<Ticket[], Error>({
    queryKey: ['tickets', filters],
    queryFn: async () => {
      const ticketService = getTicketService();
      const response = await ticketService.getTickets(filters);
      return response || [];
    },
  });

  // Eliminar ticket
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const ticketService = getTicketService();
      return ticketService.deleteTicket(id);
    },
    onSuccess: () => {
      showNotification(
        'success',
        t('TICKETS_ADMIN.delete.success', 'Ticket eliminado'),
        t('TICKETS_ADMIN.delete.successMessage', 'El ticket se ha eliminado correctamente')
      );
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || t('TICKETS_ADMIN.delete.error', 'Error al eliminar el ticket');
      showNotification('error', t('COMMON.error', 'Error'), errorMessage);
    },
  });

  // Actualizar estado del ticket
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const ticketService = getTicketService();
      return ticketService.updateTicketStatus(id, status);
    },
    onSuccess: () => {
      showNotification(
        'success',
        t('TICKETS_ADMIN.updateStatus.success', 'Estado actualizado'),
        t('TICKETS_ADMIN.updateStatus.successMessage', 'El estado del ticket se ha actualizado')
      );
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || t('TICKETS_ADMIN.updateStatus.error', 'Error al actualizar el estado');
      showNotification('error', t('COMMON.error', 'Error'), errorMessage);
    },
  });

  return {
    tickets,
    isLoading,
    error,
    refetch,
    deleteTicket: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    updateStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
};
