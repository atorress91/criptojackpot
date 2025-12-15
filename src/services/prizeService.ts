import { PaginationRequest } from '@/interfaces/pagination';
import { BaseService } from './baseService';
import { Prize, CreatePrizeRequest, UpdatePrizeRequest } from '@/interfaces/prize';
import { Response } from '@/interfaces/response';
import { PaginatedResponse } from '@/interfaces/paginatedResponse';

class PrizeService extends BaseService {
  protected endpoint = 'prize';

  async createPrize(request: CreatePrizeRequest): Promise<Prize> {
    try {
      const response = await this.apiClient.post<Response<Prize>>(this.endpoint, request);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async getAllPrizes(pagination?: PaginationRequest): Promise<PaginatedResponse<Prize>> {
    try {
      const params: Record<string, string> = {};
      if (pagination?.pageNumber) params.pageNumber = pagination.pageNumber.toString();
      if (pagination?.pageSize) params.pageSize = pagination.pageSize.toString();

      const response = await this.apiClient.get<PaginatedResponse<Prize>>(this.endpoint, { params });
      return response.data;
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async updatePrize(id: string, request: UpdatePrizeRequest): Promise<Prize> {
    try {
      const response = await this.apiClient.put<Response<Prize>>(`${this.endpoint}/${id}`, request);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as any);
    }
  }
}

export { PrizeService };
