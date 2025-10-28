'use client';

import 'reflect-metadata';
import '@/di/init';
import React from 'react';

/**
 * Wrapper que asegura que Dependency Injection esté inicializado
 * antes de renderizar los componentes hijos.
 *
 * La inicialización es síncrona (ocurre al importar los módulos),
 * por lo que simplemente renderizamos los hijos directamente.
 */
export function DIProvider({ children }: Readonly<{ children: React.ReactNode }>) {

  return <>{children}</>;
}

