import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getUserService } from '@/di/serviceLocator';
import {AxiosError} from "axios";

export function useSessionValidator() {
    const { user, logout, updateUser } = useAuthStore();
    const userId = user?.id;

    const { error } = useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            if (!userId) return null;

            const freshUserData = await getUserService().getUserById(userId);

            updateUser(freshUserData);
            return freshUserData;
        },
        enabled: !!userId,
        retry: 1,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (error instanceof AxiosError && error.response?.status === 401) {
            logout();
        }
    }, [error, logout]);
}