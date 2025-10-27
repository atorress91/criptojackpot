import ForgotPasswordSection from '@/features/auth/components/ForgotPasswordSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password - Lottery & Giveaway NextJs Template',
  description: 'Lottery & Giveaway NextJs Template',
};

const ForgotPassword = () => {
  return (
    <div>
      <ForgotPasswordSection />
    </div>
  );
};

export default ForgotPassword;

