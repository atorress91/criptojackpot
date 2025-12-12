'use client';

import LotteriesList from '@/features/admin-panel/components/LotteriesList';
import { AuthGuard } from '@/components/AuthGuard';

const LotteriesPage = () => {
  return (
    <AuthGuard requireAuth={true} requiredRole="admin">
      <LotteriesList />
    </AuthGuard>
  );
};

export default LotteriesPage;
