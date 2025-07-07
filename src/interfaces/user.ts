import { Country } from './country';
import { Role } from './role';

export interface User {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  identification?: string;
  phone?: string;
  countryId: number;
  statePlace: string;
  city: string;
  address?: string;
  status: boolean;
  imagePath?: string;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  token?: string;

  roleId: number;
  role?: Role;
  country?: Country;
}
