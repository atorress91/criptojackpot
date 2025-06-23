'use client';

import { User } from '@/interfaces/user';

export class TokenService {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly USER_KEY = 'user_data';

  static setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  static clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  static setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  static getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(this.USER_KEY);
      if (userData) {
        try {
          return JSON.parse(userData);
        } catch {
          return null;
        }
      }
    }
    return null;
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

  static clearSession() {
    this.clearToken();
    localStorage.removeItem(this.USER_KEY);
  }
}
