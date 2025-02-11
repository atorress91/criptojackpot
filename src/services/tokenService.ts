'use client'

import Cookies from 'js-cookie';

export class TokenService {
  private static TOKEN_KEY = 'token';
  private static USER_KEY = 'user';

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return Cookies.get(this.TOKEN_KEY) || null;
    }
    return null;
  }

  static setToken(token: string) {
    Cookies.set(this.TOKEN_KEY, token, {
      expires: 7,
      secure: true,
      sameSite: 'strict'
    });
  }

  static removeToken(): void {
    Cookies.remove(this.TOKEN_KEY);
  }

  static getUser(): any | null {
    if (typeof window !== 'undefined') {
      const user = Cookies.get(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  static setUser(user: any): void {
    Cookies.set(this.USER_KEY, JSON.stringify(user), {
      expires: 7,
      secure: true,
      sameSite: 'strict'
    });
  }

  static removeUser(): void {
    Cookies.remove(this.USER_KEY);
  }

  static clearSession(): void {
    this.removeToken();
    this.removeUser();
  }
}