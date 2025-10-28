import {useQuery} from "@tanstack/react-query";
import {User} from "@/interfaces/user";
import { getUserService } from '@/di/serviceLocator';
import {useAuthStore} from "@/store/authStore";

export function useUsers() {
    const {user} = useAuthStore();
    const {
        data: users,
        isLoading,
        isError,
        error,
    } = useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: () => getUserService().getAllUsers(user?.id || 0),
    });

    return {
        users,
        isLoading,
        isError,
        error,
    }
}