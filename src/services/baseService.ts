import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { Response } from '@/interfaces/response';
import { TokenService } from './tokenService';
import { useAuthStore } from '@/store/authStore';

export abstract class BaseService {
  protected apiClient: AxiosInstance;
  protected abstract endpoint: string;

  constructor() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

    this.apiClient = axios.create({
      baseURL: `${API_URL}/api/v1`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.apiClient.interceptors.request.use(
      config => {
        let token = useAuthStore.getState().token;

        if (!token && typeof window !== 'undefined') {
          const authStorage = localStorage.getItem('auth-storage');
          if (authStorage) {
            try {
              const parsed = JSON.parse(authStorage);
              token = parsed.state?.token;
            } catch (e) {
              console.error('Error parsing auth storage:', e);
            }
          }
        }

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    this.apiClient.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
          if (typeof window !== 'undefined') {
            window.location.href = '/login?error=session_expired';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  protected async handleResponse<T>(response: AxiosResponse<Response<T>>): Promise<T> {
    const { data } = response;

    if (!data.success || !data.data) {
      throw new Error(data.message || 'Error');
    }

    return data.data;
  }

  protected handleError(error: AxiosError<Response<any>>): never {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      throw new Error('The session has expired');
    }

    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';

    console.log('Error Response:', error.response?.data);
    throw new Error(errorMessage);
  }

  protected async getAll<T>(): Promise<T[]> {
    try {
      const response = await this.apiClient.get<Response<T[]>>(`${this.endpoint}`);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }

  protected async getById<T>(id: string | number): Promise<T> {
    try {
      const response = await this.apiClient.get<Response<T>>(`${this.endpoint}/${id}`);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }

  protected async create<T>(data: Partial<T>): Promise<T> {
    try {
      const response = await this.apiClient.post<Response<T>>(`${this.endpoint}`, data);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }

  protected async update<T>(id: string | number, data: Partial<T>): Promise<T> {
    try {
      const response = await this.apiClient.put<Response<T>>(`${this.endpoint}/${id}`, data);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }

  protected async delete(id: string | number): Promise<void> {
    try {
      await this.apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }

  protected async patch<T>(url: string, data: any): Promise<T> {
    try {
      const response = await this.apiClient.patch<Response<T>>(url, data);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }
}
