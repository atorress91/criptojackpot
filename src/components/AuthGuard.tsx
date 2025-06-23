'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth: boolean;
  requiredRole?: 'admin' | 'client';
};

export const AuthGuard = ({ children, requireAuth, requiredRole }: AuthGuardProps) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Si requiere autenticación y no está autenticado
      if (requireAuth && !isAuthenticated) {
        router.push('/login');
        return;
      }

      // Si no requiere autenticación pero está autenticado
      if (!requireAuth && isAuthenticated) {
        if (user?.role?.name === 'admin') {
          router.push('/admin');
        } else {
          router.push('/user-panel');
        }
        return;
      }

      // Verificar rol si es necesario
      if (requireAuth && isAuthenticated && requiredRole) {
        if (user?.role?.name !== requiredRole) {
          if (user?.role?.name === 'admin') {
            router.push('/admin');
          } else {
            router.push('/user-panel');
          }
          return;
        }
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [requireAuth, requiredRole, router, user, isAuthenticated]);

  if (isChecking) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
