import { Country } from '@/interfaces/country';
import { injectable } from 'tsyringe';
import { BaseService } from './baseService';

@injectable()
class CountryService extends BaseService {
  protected override endpoint = 'country';

  /**
   * Constructor - Define el prefijo del microservicio de países
   * Apunta a la ruta definida en ingress.yaml
   */
  constructor() {
    super('/api/v1');
  }

  async getAllCountries(): Promise<Country[]> {
    return this.getAll<Country>();
  }

  async getByRegion(region: string): Promise<Country[]> {
    return this.getAll<Country>({ path: `region/${region}` });
  }
}

export { CountryService };
