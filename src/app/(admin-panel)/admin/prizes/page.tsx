'use client';

import PrizesList from '@/features/admin-panel/components/PrizesList';
import { AuthGuard } from '@/components/AuthGuard';

const PrizesPage = () => {
  return (
    <AuthGuard requireAuth={true} requiredRole="admin">
      <PrizesList />
    </AuthGuard>
  );
};

export default PrizesPage;
