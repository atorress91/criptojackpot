import { User } from '@/interfaces/user';
import { useAuthStore } from '@/store/authStore';
import { injectable } from 'tsyringe';

@injectable()
export class TokenService {
  static getToken(): string | null {
    return useAuthStore.getState().token;
  }

  static getUser(): User | null {
    return useAuthStore.getState().user;
  }

  static isAdmin(): boolean {
    const user = this.getUser();
    return user?.role?.name === 'admin';
  }

  static isClient(): boolean {
    const user = this.getUser();
    return user?.role?.name === 'client';
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
