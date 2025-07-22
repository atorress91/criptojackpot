import {useAuthStore} from '@/store/authStore';
import {userService} from '@/services/userService';
import {GenerateNewSecurityCodeRequest, UserReferralStats} from "@/features/user-panel/types";
import {useMutation, useQuery} from '@tanstack/react-query';
import {useNotificationStore} from '@/store/notificationStore';
import {useTranslation} from 'react-i18next';
import {userReferralService} from "@/services/userReferralService";

export const useReferralProgram = () => {
    const {t} = useTranslation();

    const {user, updateUser} = useAuthStore();
    const showNotification = useNotificationStore(state => state.show);

    const baseUrl = typeof window !== 'undefined'
        ? `${window.location.protocol}//${window.location.host}`
        : 'https://cryptojackpot.com';

    const referralLink = user?.securityCode
        ? `${baseUrl}/register/${user.securityCode}`
        : `${baseUrl}`;

    const {
        data: referralData,
        isLoading: isReferralsLoading
    } = useQuery<UserReferralStats>({

        queryKey: ['userReferrals', user?.id],
        queryFn: () => userReferralService.GetUserReferralsAsync(user!.id || 0),
        enabled: !!user?.id,
    });

    const {mutate: generateNewSecurityCode, isPending: isGenerating} = useMutation({
        mutationFn: () => {
            if (!user?.id) throw new Error("User ID is not available");

            const request: GenerateNewSecurityCodeRequest = {
                userId: user.id
            };
            return userService.generateNewSecurityCode(request);
        },
        onSuccess: (updatedUser) => {
            updateUser(updatedUser);
            showNotification('success', t('COMMON.success'), 'New security code generated successfully!');
        },
        onError: (error) => {
            console.error('Error generating new security code:', error);
            showNotification('error', t('COMMON.error'), 'Failed to generate new security code.');
        }
    });

    const copyToClipboard = () => {
        if (referralLink) {
            navigator.clipboard.writeText(referralLink).then();
            showNotification('success', t('COMMON.success'), 'Referral link copied to clipboard!');
        }
    };

    return {
        referralLink,
        copyToClipboard,
        generateNewSecurityCode,
        isGenerating,
        hasSecurityCode: !!user?.securityCode,
        referralData,
        isReferralsLoading
    };
};