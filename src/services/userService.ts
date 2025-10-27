import {User} from '@/interfaces/user';
import {BaseService} from './baseService';
import {UpdateImageProfileRequest} from '@/features/user-panel/types/updateImageProfileRequest';
import {GenerateNewSecurityCodeRequest} from '@/features/user-panel/types/generateNewSecurityCodeRequest';
import {UpdateUserRequest} from '@/features/user-panel/types/updateUserRequest';
import {RequestPasswordResetRequest} from "@/features/auth/types/requestPasswordResetRequest";
import {ResetPasswordWithCodeRequest} from "@/features/auth/types/resetPasswordWithCodeRequest";

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

    async updateUserAsync(userId: number, updateUser: UpdateUserRequest): Promise<User> {
        return this.update<User>(userId, updateUser);
    }

    async getUserById(userId: number): Promise<User> {
        return this.getById<User>(userId);
    }

    async getAllUsers(excludeUserId?: number): Promise<User[]> {
        return this.getAll<User>({path: `get-all-users/`, params: {excludeUserId}});
    }

    async requestPasswordReset(request: RequestPasswordResetRequest): Promise<void> {
        return this.createWithParams<RequestPasswordResetRequest, void>(request, `request-password-reset`);
    }

    async resetPassword(request: ResetPasswordWithCodeRequest): Promise<void> {
        return this.createWithParams<ResetPasswordWithCodeRequest, void>(request, `reset-password-with-code`);
    }
}

export const userService = new UserService();
