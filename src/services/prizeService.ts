import { PaginationRequest } from '@/interfaces/pagination';
import { BaseService } from './baseService';
import { Prize, CreatePrizeRequest, UpdatePrizeRequest } from '@/interfaces/prize';

class PrizeService extends BaseService {
  protected endpoint = 'prize';

  async createPrize(request: CreatePrizeRequest): Promise<Prize> {
    return this.create<CreatePrizeRequest, Prize>(request);
  }

  async getAllPrizes(pagination?: PaginationRequest): Promise<Prize[]> {
    const params: Record<string, string> = {};
    if (pagination?.pageNumber) params.pageNumber = pagination.pageNumber.toString();
    if (pagination?.pageSize) params.pageSize = pagination.pageSize.toString();

    return this.getAll<Prize>({ params });
  }

  async getPrizeById(id: string): Promise<Prize> {
    return this.getById<Prize>(id);
  }

  async updatePrize(id: number, request: UpdatePrizeRequest): Promise<Prize> {
    return this.update<UpdatePrizeRequest, Prize>(id, request);
  }

  async deletePrize(id: number): Promise<void> {
    return this.delete(id);
  }
}

export { PrizeService };
