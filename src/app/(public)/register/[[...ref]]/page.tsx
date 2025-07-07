import RegisterSection from '@/components/register/RegisterSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - Lottery & Giveaway NextJs Template',
  description: 'Lottery & Giveaway NextJs Template',
};

interface PageProps {
  params: {
    ref?: string[];
  };
}

const Register = ({ params }: PageProps) => {
  const referralCode = params.ref && params.ref.length > 0 ? params.ref[0] : null;

  return (
    <div>
      <RegisterSection referralCode={referralCode} />
    </div>
  );
};

export default Register;
