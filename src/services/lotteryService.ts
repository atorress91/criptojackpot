import { BaseService } from './baseService';
import { Lottery, CreateLotteryRequest, UpdateLotteryRequest } from '@/interfaces/lottery';
import { PaginationRequest } from '@/interfaces/pagination';

class LotteryService extends BaseService {
  protected endpoint = 'Lottery';

  async getAllLotteries(pagination?: PaginationRequest): Promise<Lottery[]> {
    const params: Record<string, string> = {};
    if (pagination?.pageNumber) params.pageNumber = pagination.pageNumber.toString();
    if (pagination?.pageSize) params.pageSize = pagination.pageSize.toString();

    return this.getAll<Lottery>({ params });
  }

  async getLotteryById(id: string): Promise<Lottery> {
    return this.getById<Lottery>(id);
  }

  async createLottery(data: CreateLotteryRequest): Promise<Lottery> {
    return this.create<CreateLotteryRequest, Lottery>(data);
  }

  async updateLottery(id: number, data: Partial<UpdateLotteryRequest>): Promise<Lottery> {
    return this.update<Partial<UpdateLotteryRequest>, Lottery>(id, data);
  }

  async deleteLottery(id: number): Promise<void> {
    return this.delete(id);
  }

  async updateLotteryStatus(id: string, status: number): Promise<Lottery> {
    return this.patch<Lottery>(`${this.endpoint}/${id}/status`, { status });
  }
}

export { LotteryService };
