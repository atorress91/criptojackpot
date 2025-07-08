import { useAuthStore } from '@/store/authStore';

/**
 * Custom hook for handling referral program functionality
 * Gets the security code from the authenticated user and generates a referral URL
 */
export const useReferralProgram = () => {
  // Get the current user from the auth store
  const user = useAuthStore.getState().user;
  
  // Base URL for the application
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}` 
    : 'https://cryptojackpot.com';
  
  // Generate the referral link using the user's security code
  const referralLink = user?.securityCode 
    ? `${baseUrl}/register/${user.securityCode}`
    : `${baseUrl}`;
  
  // Function to copy the referral link to clipboard
  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(referralLink).then();
      return true;
    }
    return false;
  };

  return {
    referralLink,
    copyToClipboard,
    hasSecurityCode: !!user?.securityCode,
  };
};