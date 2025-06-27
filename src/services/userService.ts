import { User } from '@/interfaces/user';
import { BaseService } from './baseService';
import { UpdateImageProfileRequest } from '@/interfaces/updateImageProfileRequest';

class UserService extends BaseService {
  protected endpoint: string = 'user';

  async createUser(user: User): Promise<User> {
    return this.create<User>(user);
  }

  async updateImageProfile(request: UpdateImageProfileRequest): Promise<User> {
    return this.patch<User>(`${this.endpoint}/update-image-profile`, request);
  }
}

export const userService = new UserService();
