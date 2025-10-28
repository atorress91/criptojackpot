'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth: boolean;
  requiredRole?: 'admin' | 'client';
};

export const AuthGuard = ({ children, requireAuth, requiredRole }: AuthGuardProps) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Esperar a que Zustand hidrate el estado desde localStorage
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

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
          // Redirigir al panel correspondiente si el rol no coincide
          if (user?.role?.name === 'admin') {
            router.push('/admin');
          } else {
            router.push('/user-panel');
          }
          return;
        }
      }
    };

    checkAuth();
  }, [requireAuth, requiredRole, router, user, isAuthenticated, isHydrated]);

  // Mostrar loading mientras se hidrata el estado
  if (!isHydrated) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Si después de hidratar, la autenticación no cumple los requisitos, no renderizar
  if (requireAuth && !isAuthenticated) {
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
