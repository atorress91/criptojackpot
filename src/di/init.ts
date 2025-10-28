/**
 * Inicialización global de Dependency Injection
 * Este archivo debe importarse en TODOS los layouts y puntos de entrada
 */
import 'reflect-metadata';
import '@/di/container';

// Exportar para forzar la ejecución
export const DI_INITIALIZED = true;

