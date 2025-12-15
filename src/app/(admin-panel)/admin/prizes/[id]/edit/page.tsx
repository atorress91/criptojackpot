'use client';

import EditPrize from '@/features/admin-panel/components/EditPrize';
import { AuthGuard } from '@/components/AuthGuard';
import { use } from 'react';

interface EditPrizePageProps {
  params: Promise<{ id: string }>;
}

const EditPrizePage = ({ params }: EditPrizePageProps) => {
  const resolvedParams = use(params);

  return (
    <AuthGuard requireAuth={true} requiredRole="admin">
      <EditPrize prizeId={resolvedParams.id} />
    </AuthGuard>
  );
};

export default EditPrizePage;
