import { AuthRequest } from '@/features/auth/types/authRequest';
import { User } from '@/interfaces/user';
import { injectable } from 'tsyringe';
import { BaseService } from './baseService';

@injectable()
class AuthService extends BaseService {
  protected override endpoint = 'auth';

  /**
   * Constructor - Define el prefijo del microservicio de autenticación
   * Apunta a la ruta definida en ingress.yaml para identity-api
   */
  constructor() {
    super('/api/v1');
  }

  async authenticate(credentials: AuthRequest): Promise<User> {
    return this.create<AuthRequest, User>(credentials);
  }

  async refreshToken(): Promise<string> {
    return this.create<object, string>({}, 'refresh');
  }

  async confirmEmail(token: string): Promise<{ message: string }> {
    return this.create<object, { message: string }>({}, `confirm-email/${token}`);
  }
}

export { AuthService };
