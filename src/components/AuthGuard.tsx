'use client';

import { TokenService } from '@/services/tokenService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth: boolean;
  requiredRole?: 'admin' | 'client';
};

export const AuthGuard = ({ children, requireAuth, requiredRole }: AuthGuardProps) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = TokenService.getToken();
      const user = TokenService.getUser();

      // Si requiere autenticación y no hay token, redirigir al login
      if (requireAuth && !token) {
        router.push('/login');
        return;
      }

      // Si no requiere autenticación pero hay token (ej: página de login)
      if (!requireAuth && token) {
        // Redirigir según el rol del usuario
        if (user?.role?.name === 'admin') {
          router.push('/admin');
        } else {
          router.push('/user-panel');
        }
        return;
      }

      // Si requiere autenticación y hay token, verificar el rol
      if (requireAuth && token && requiredRole) {
        // Si el rol no coincide, redirigir al dashboard correspondiente
        if (user?.role?.name !== requiredRole) {
          if (user?.role?.name === 'admin') {
            router.push('/admin');
          } else {
            router.push('/user-panel');
          }
          return;
        }
      }

      // Si llegamos aquí, todo está bien
      setIsChecking(false);
    };

    checkAuth();
  }, [requireAuth, requiredRole, router]);

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
