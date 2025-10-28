import 'reflect-metadata';
import { container } from 'tsyringe';
import { AuthService } from '@/services/authService';
import { UserService } from '@/services/userService';
import { CountryService } from '@/services/countryService';
import { TokenService } from '@/services/tokenService';
import { UserReferralService } from '@/services/userReferralService';
import { DigitalOceanStorageService } from '@/services/digitalOceanStorageService';

// Tipos de servicio para inyección
export type ServiceType =
  | 'AuthService'
  | 'UserService'
  | 'CountryService'
  | 'TokenService'
  | 'UserReferralService'
  | 'DigitalOceanStorageService';

/**
 * Función helper para obtener servicios del contenedor de DI
 * @param serviceType El nombre del servicio a obtener
 * @returns La instancia del servicio
 *
 * @example
 * const authService = getService('AuthService');
 * const user = await authService.authenticate(credentials);
 */
export function getService<T>(serviceType: ServiceType): T {
  return container.resolve<T>(serviceType);
}

// Exportaciones específicas para mejor tipado
export const getAuthService = (): AuthService => container.resolve<AuthService>('AuthService');
export const getUserService = (): UserService => container.resolve<UserService>('UserService');
export const getCountryService = (): CountryService => container.resolve<CountryService>('CountryService');
export const getTokenService = (): TokenService => container.resolve<TokenService>('TokenService');
export const getUserReferralService = (): UserReferralService => container.resolve<UserReferralService>('UserReferralService');
export const getDigitalOceanStorageService = (): DigitalOceanStorageService => container.resolve<DigitalOceanStorageService>('DigitalOceanStorageService');

