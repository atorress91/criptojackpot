import { User } from '@/interfaces/user';
import { BaseService } from './baseService';
import { UpdateImageProfileRequest } from '@/interfaces/updateImageProfileRequest';
import { GenerateNewSecurityCodeRequest } from '@/interfaces/generateNewSecurityCodeRequest';

class UserService extends BaseService {
  protected endpoint: string = 'user';

  async createUser(user: User): Promise<User> {
    return this.create<User>(user);
  }

  async updateImageProfile(request: UpdateImageProfileRequest): Promise<User> {
    return this.patch<User>(`${this.endpoint}/update-image-profile`, request);
  }

  async generateNewSecurityCode(request: GenerateNewSecurityCodeRequest): Promise<User> {
    return this.patch<User>(`${this.endpoint}/generate-new-security-code`, request);
  }

  async updateUserAsync(userId: number, user: User): Promise<User> {
    user.id = userId;
    return this.update<User>(user.id, user);
  }
}

export const userService = new UserService();
