import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = useCallback(() => {
    logout();
    router.push('/login');
  }, [logout, router]);

  const isAdmin = useCallback(() => {
    return user?.role?.name === 'admin';
  }, [user]);

  const isClient = useCallback(() => {
    return user?.role?.name === 'client';
  }, [user]);

  return {
    user,
    isAuthenticated,
    isAdmin,
    isClient,
    logout: handleLogout,
  };
};
