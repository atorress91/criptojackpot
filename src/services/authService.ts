import { AuthRequest } from '@/features/auth/types/authRequest';
import { Response } from '@/interfaces/response';
import { User } from '@/interfaces/user';
import { AxiosError } from 'axios';
import { BaseService } from './baseService';

class AuthService extends BaseService {
  protected override endpoint = 'auth';

  async authenticate(credentials: AuthRequest): Promise<User> {
    try {
      const response = await this.apiClient.post<Response<User>>(`${this.endpoint}`, credentials);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const response = await this.apiClient.post<Response<string>>(`${this.endpoint}/refresh`);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }
}

export const authService = new AuthService();