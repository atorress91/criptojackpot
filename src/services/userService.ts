import { Response } from '@/interfaces/response';
import { User } from '@/interfaces/user';
import { AxiosError } from 'axios';
import { BaseService } from './baseService';

class UserService extends BaseService {
  protected endpoint: string = 'users';

  async createUser(user: User) {
    try {

      const response = await this.apiClient.post<Response<User>>(`/${this.endpoint}`, user);

      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }
}

export const userService = new UserService();
