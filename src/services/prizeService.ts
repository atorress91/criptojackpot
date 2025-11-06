import { BaseService } from './baseService';
import { Prize, PrizeFilters } from '@/interfaces/prize';
import { Response } from '@/interfaces/response';

class PrizeService extends BaseService {
  protected endpoint = 'prizes';

  async getPrizes(filters?: PrizeFilters): Promise<Prize[]> {
    try {
      const params: Record<string, string> = {};
      if (filters?.category) params.category = filters.category;
      if (filters?.minValue) params.minValue = filters.minValue.toString();
      if (filters?.maxValue) params.maxValue = filters.maxValue.toString();
      if (filters?.page) params.page = filters.page.toString();
      if (filters?.limit) params.limit = filters.limit.toString();
      if (filters?.search) params.search = filters.search;

      const response = await this.apiClient.get<Response<Prize[]>>(this.endpoint, { params });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async getPrizeById(id: string): Promise<Prize> {
    return this.getById<Prize>(id);
  }

  async createPrize(data: FormData): Promise<Prize> {
    try {
      const response = await this.apiClient.post<Response<Prize>>(this.endpoint, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async updatePrize(id: string, data: FormData): Promise<Prize> {
    try {
      const response = await this.apiClient.put<Response<Prize>>(`${this.endpoint}/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async deletePrize(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      return this.handleError(error as any);
    }
  }
}

export { PrizeService };
