import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { Response } from '@/interfaces/response';
import { TokenService } from './tokenService';

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
        const token = TokenService.getToken();
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
          TokenService.clearToken();
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
      TokenService.clearToken();
      throw new Error('The session has expired');
    }

    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';

    console.log('Error Response:', error.response?.data);
    throw new Error(errorMessage);
  }

  async getAll<T>(): Promise<T[]> {
    try {
      const response = await this.apiClient.get<Response<T[]>>(`${this.endpoint}`);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }

  async getById<T>(id: string | number): Promise<T> {
    try {
      const response = await this.apiClient.get<Response<T>>(`${this.endpoint}/${id}`);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }

  async create<T>(data: Partial<T>): Promise<T> {
    try {
      const response = await this.apiClient.post<Response<T>>(`${this.endpoint}`, data);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }

  async update<T>(id: string | number, data: Partial<T>): Promise<T> {
    try {
      const response = await this.apiClient.put<Response<T>>(`${this.endpoint}/${id}`, data);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }

  async delete(id: string | number): Promise<void> {
    try {
      await this.apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }
}
