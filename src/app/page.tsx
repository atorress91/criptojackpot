import LandingPage from '@/app/(public)/landing-page/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CriptoJackpot',
  description: 'Lottery & Giveaway NextJs Template',
};

export default function Home() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}
