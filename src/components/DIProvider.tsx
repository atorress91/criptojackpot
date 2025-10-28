'use client';

import 'reflect-metadata';
import '@/di/init';
import React, { useEffect, useState } from 'react';

/**
 * Wrapper que asegura que Dependency Injection esté inicializado
 * antes de renderizar los componentes hijos
 */
export function DIProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Forzar la inicialización en el cliente
    setIsInitialized(true);
  }, []);

  // En SSR, renderizar inmediatamente
  if (typeof globalThis.window) {
    return <>{children}</>;
  }

  // En cliente, esperar a que esté inicializado
  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}

