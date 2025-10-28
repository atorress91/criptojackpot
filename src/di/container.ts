import 'reflect-metadata';
import { container } from 'tsyringe';

// Services
import { AuthService } from '@/services/authService';
import { UserService } from '@/services/userService';
import { CountryService } from '@/services/countryService';
import { TokenService } from '@/services/tokenService';
import { UserReferralService } from '@/services/userReferralService';
import { DigitalOceanStorageService } from '@/services/digitalOceanStorageService';
import { RoleService } from '@/services/roleService';

// Función para inicializar el contenedor
export function initializeContainer() {
  // Registrar servicios en el contenedor
  container.registerSingleton<AuthService>('AuthService', AuthService);
  container.registerSingleton<UserService>('UserService', UserService);
  container.registerSingleton<CountryService>('CountryService', CountryService);
  container.registerSingleton<TokenService>('TokenService', TokenService);
  container.registerSingleton<UserReferralService>('UserReferralService', UserReferralService);
  container.registerSingleton<DigitalOceanStorageService>('DigitalOceanStorageService', DigitalOceanStorageService);
  container.registerSingleton<RoleService>('RoleService', RoleService);
}

// Inicializar inmediatamente
initializeContainer();

export { container } from 'tsyringe';



