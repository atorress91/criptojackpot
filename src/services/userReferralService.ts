import {BaseService} from "@/services/baseService";
import {UserReferralStats} from "@/features/user-panel/types";
import { injectable } from 'tsyringe';

@injectable()
class UserReferralService extends BaseService {
    protected endpoint: string = 'userReferral';

    async GetUserReferralsAsync(userId: number): Promise<UserReferralStats> {
        return this.getById<UserReferralStats>(`${userId}`);
    }
}

export { UserReferralService };
