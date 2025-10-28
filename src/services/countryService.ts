import { Country } from '@/interfaces/country';
import { Response } from '@/interfaces/response';
import { AxiosError } from 'axios';
import { injectable } from 'tsyringe';
import { BaseService } from './baseService';

@injectable()
class CountryService extends BaseService {
  protected override endpoint = 'country';

  async getAllCountries(): Promise<Country[]> {
    return this.getAll<Country>();
  }

  async getByRegion(region: string): Promise<Country[]> {
    try {
      const response = await this.apiClient.get(`${this.endpoint}/region/${region}`);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error as AxiosError<Response<any>>);
    }
  }
}

export { CountryService };
