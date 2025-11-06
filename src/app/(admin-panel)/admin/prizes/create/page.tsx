'use client';

import CreatePrize from '@/features/admin-panel/components/CreatePrize';
import { AuthGuard } from '@/components/AuthGuard';

const CreatePrizePage = () => {
  return (
    <AuthGuard requireAuth={true} requiredRole="admin">
      <CreatePrize />
    </AuthGuard>
  );
};

export default CreatePrizePage;
