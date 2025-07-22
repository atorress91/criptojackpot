import {BaseService} from "@/services/baseService";
import {UserReferralStats} from "@/features/user-panel/types";

class UserReferralService extends BaseService {
    protected endpoint: string = 'userReferral';

    async GetUserReferralsAsync(userId: number): Promise<UserReferralStats> {
        return this.getById<UserReferralStats>(`${userId}`);
    }
}

export const userReferralService = new UserReferralService();