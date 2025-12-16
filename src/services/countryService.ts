import { Country } from '@/interfaces/country';
import { injectable } from 'tsyringe';
import { BaseService } from './baseService';

@injectable()
class CountryService extends BaseService {
  protected override endpoint = 'country';

  async getAllCountries(): Promise<Country[]> {
    return this.getAll<Country>();
  }

  async getByRegion(region: string): Promise<Country[]> {
    return this.getAll<Country>({ path: `region/${region}` });
  }
}

export { CountryService };
