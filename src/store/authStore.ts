import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/interfaces/user';
import { AuthRequest } from '@/interfaces/authRequest';
import { authService } from '@/services/authService';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: AuthRequest) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async credentials => {
        set({ isLoading: true, error: null });
        try {
          const userData = await authService.authenticate(credentials);

          if (userData.token) {
            set({
              user: userData,
              token: userData.token,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || 'Error al iniciar sesión',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });

        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
        }
      },

      updateUser: user => {
        set({ user });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
