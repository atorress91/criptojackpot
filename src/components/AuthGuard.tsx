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
      const roleName = user?.role?.name;

      if (requireAuth && !token) {
        router.push('/login');
        return;
      }

      if (!requireAuth && token) {
        // Redirigir según el rol del usuario
        if (roleName === 'admin') {
          router.push('/admin');
        } else {
          router.push('/user-panel');
        }
        return;
      }

      // Verificar rol específico si es requerido
      if (requiredRole && roleName !== requiredRole) {
        // Redirigir al dashboard correspondiente
        if (roleName === 'admin') {
          router.push('/admin');
        } else {
          router.push('/user-panel');
        }
        return;
      }

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
