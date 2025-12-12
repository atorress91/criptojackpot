import { BaseService } from './baseService';
import { Lottery, CreateLotteryRequest, UpdateLotteryRequest } from '@/interfaces/lottery';
import { Response } from '@/interfaces/response';
import { PaginatedResponse } from '@/interfaces/paginatedResponse';
import { PaginationRequest } from '@/interfaces/pagination';

class LotteryService extends BaseService {
  protected endpoint = 'Lottery';

  async getAllLotteries(pagination?: PaginationRequest): Promise<PaginatedResponse<Lottery>> {
    try {
      const params: Record<string, string> = {};
      if (pagination?.pageNumber) params.pageNumber = pagination.pageNumber.toString();
      if (pagination?.pageSize) params.pageSize = pagination.pageSize.toString();

      const response = await this.apiClient.get<PaginatedResponse<Lottery>>(this.endpoint, { params });
      return response.data;
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async getLotteryById(id: string): Promise<Lottery> {
    return this.getById<Lottery>(id);
  }

  async createLottery(data: CreateLotteryRequest): Promise<Lottery> {
    try {
      const response = await this.apiClient.post<Response<Lottery>>(this.endpoint, data);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async updateLottery(id: string, data: Partial<UpdateLotteryRequest>): Promise<Lottery> {
    try {
      const response = await this.apiClient.put<Response<Lottery>>(`${this.endpoint}/${id}`, data);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async deleteLottery(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async updateLotteryStatus(id: string, status: number): Promise<Lottery> {
    return this.patch<Lottery>(`${this.endpoint}/${id}/status`, { status });
  }
}

export { LotteryService };
