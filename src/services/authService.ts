import { AuthRequest } from '@/features/auth/types/authRequest';
import { Response } from '@/interfaces/response';
import { User } from '@/interfaces/user';
import { AxiosError } from 'axios';
import { injectable } from 'tsyringe';
import { BaseService } from './baseService';

@injectable()
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

  async confirmEmail(token: string): Promise<{ message: string }> {
    try {
      const response = await this.apiClient.post<Response<{ message: string }>>(
        `${this.endpoint}/confirm-email/${token}`
      );
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }
}

export { AuthService };
