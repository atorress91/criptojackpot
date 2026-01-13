import { BaseService } from './baseService';
import { Lottery, CreateLotteryRequest, UpdateLotteryRequest } from '@/interfaces/lottery';
import { PaginationRequest } from '@/interfaces/pagination';
import { PaginatedResponse } from '@/interfaces/paginatedResponse';

class LotteryService extends BaseService {
  protected endpoint = 'Lottery';

  /**
   * Constructor - Define el prefijo del microservicio de loterías
   * Apunta a la ruta definida en ingress.yaml para lottery-api
   */
  constructor() {
    super('/api/v1');
  }

  async getAllLotteries(pagination?: PaginationRequest): Promise<PaginatedResponse<Lottery>> {
    const params: Record<string, string> = {};
    if (pagination?.pageNumber) params.pageNumber = pagination.pageNumber.toString();
    if (pagination?.pageSize) params.pageSize = pagination.pageSize.toString();

    return this.getAllPaginated<Lottery>({ params });
  }

  async getLotteryById(id: string): Promise<Lottery> {
    return this.getById<Lottery>(id);
  }

  async createLottery(data: CreateLotteryRequest): Promise<Lottery> {
    return this.create<CreateLotteryRequest, Lottery>(data);
  }

  async updateLottery(id: string | number, data: Partial<UpdateLotteryRequest>): Promise<Lottery> {
    return this.update<Partial<UpdateLotteryRequest>, Lottery>(id, data);
  }

  async deleteLottery(id: string | number): Promise<void> {
    return this.delete(id);
  }
}

export { LotteryService };
