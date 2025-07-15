import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {AuthState} from "@/interfaces/authState";

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: userData => {
                set({
                    user: userData,
                    token: userData.token,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth-storage');
                }
            },

            updateUser: user => {
                set(state => ({
                    user: state.user ? { ...state.user, ...user } : user,
                }));
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