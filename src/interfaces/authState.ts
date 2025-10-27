import {User} from "@/interfaces/user";

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    resetPasswordEmail: string | null;
    login: (userData: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
    setResetPasswordEmail: (email: string) => void;
    clearResetPasswordEmail: () => void;
}