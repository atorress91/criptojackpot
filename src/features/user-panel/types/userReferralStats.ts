import {Referral} from "@/features/user-panel/types/referral";

export interface UserReferralStats {
    totalEarnings: number;
    lastMonthEarnings: number;
    referrals: Referral[];
}