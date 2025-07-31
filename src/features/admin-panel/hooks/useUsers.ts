import {useQuery} from "@tanstack/react-query";
import {User} from "@/interfaces/user";
import {userService} from "@/services/userService";

export function useUsers() {
    const {
        data: users,
        isLoading,
        isError,
        error,
    } = useQuery<User[],Error>({
        queryKey: ['users'],
        queryFn: () => userService.getAllUsers(),
    });

    return{
        users,
        isLoading,
        isError,
        error,
    }
}