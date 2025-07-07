import RegisterSection from '@/components/register/RegisterSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - Lottery & Giveaway NextJs Template',
  description: 'Lottery & Giveaway NextJs Template',
};

interface PageProps {
  params: Promise<{
    ref?: string[];
  }>;
}

const Register = async ({ params }: PageProps) => {
  const { ref } = await params;
  const referralCode = ref && ref.length > 0 ? ref[0] : null;

  return (
    <div>
      <RegisterSection referralCode={referralCode} />
    </div>
  );
};

export default Register;
