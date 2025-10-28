import { Role } from '@/interfaces/role';
import { BaseService } from './baseService';
import { injectable } from 'tsyringe';

@injectable()
class RoleService extends BaseService {
    protected endpoint: string = 'role';

    async getAllRoles(): Promise<Role[]> {
        return this.getAll<Role>();
    }
}

export { RoleService };

