import { User } from '@/interfaces/user';
import { BaseService } from './baseService';
import { UpdateImageProfileRequest } from '@/interfaces/updateImageProfileRequest';
import { GenerateNewSecurityCodeRequest } from '@/interfaces/generateNewSecurityCodeRequest';
import { UpdateUserRequest } from '@/interfaces/updateUserRequest';

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

  async updateUserAsync(updateUser: UpdateUserRequest): Promise<User> {
    return this.update<User>(updateUser.id, updateUser);
  }
}

export const userService = new UserService();
