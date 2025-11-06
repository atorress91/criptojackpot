'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNotificationStore } from '@/store/notificationStore';
import { Prize, PrizeFilters } from '@/interfaces/prize';
import { getPrizeService } from '@/di/serviceLocator';

export const usePrizes = (filters?: PrizeFilters) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const showNotification = useNotificationStore(state => state.show);

  // Obtener lista de premios
  const {
    data: prizes,
    isLoading,
    error,
    refetch,
  } = useQuery<Prize[], Error>({
    queryKey: ['prizes', filters],
    queryFn: async () => {
      const prizeService = getPrizeService();
      const response = await prizeService.getPrizes(filters);
      return response || [];
    },
  });

  // Eliminar premio
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const prizeService = getPrizeService();
      return prizeService.deletePrize(id);
    },
    onSuccess: () => {
      showNotification(
        'success',
        t('PRIZES_ADMIN.delete.success', 'Premio eliminado'),
        t('PRIZES_ADMIN.delete.successMessage', 'El premio se ha eliminado correctamente')
      );
      queryClient.invalidateQueries({ queryKey: ['prizes'] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || t('PRIZES_ADMIN.delete.error', 'Error al eliminar el premio');
      showNotification('error', t('COMMON.error', 'Error'), errorMessage);
    },
  });

  return {
    prizes,
    isLoading,
    error,
    refetch,
    deletePrize: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
