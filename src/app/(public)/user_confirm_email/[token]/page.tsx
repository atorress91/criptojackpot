import ConfirmEmailSection from '@/features/auth/components/ConfirmEmailSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Confirm Email | CryptoJackpot',
  description: 'Confirm your email address',
};

interface ConfirmEmailPageProps {
  params: {
    token: string;
  };
}

const ConfirmEmailPage = ({ params }: ConfirmEmailPageProps) => {
  return <ConfirmEmailSection token={params.token} />;
};

export default ConfirmEmailPage;

