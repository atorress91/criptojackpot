import ResetPasswordSection from '@/features/auth/components/ResetPasswordSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password | CryptoJackpot',
  description: 'Reset your password',
};

const ResetPasswordPage = () => {
  return <ResetPasswordSection />;
};

export default ResetPasswordPage;

