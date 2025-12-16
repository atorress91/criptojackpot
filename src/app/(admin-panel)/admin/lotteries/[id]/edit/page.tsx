'use client';

import { use } from 'react';
import EditLottery from '@/features/admin-panel/components/EditLottery';
import { AuthGuard } from '@/components/AuthGuard';

interface EditLotteryPageProps {
  params: Promise<{ id: string }>;
}

const EditLotteryPage = ({ params }: EditLotteryPageProps) => {
  const { id } = use(params);

  return (
    <AuthGuard requireAuth={true} requiredRole="admin">
      <EditLottery lotteryId={id} />
    </AuthGuard>
  );
};

export default EditLotteryPage;
