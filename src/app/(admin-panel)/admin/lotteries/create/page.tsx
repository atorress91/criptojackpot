'use client';

import CreateLottery from '@/features/admin-panel/components/CreateLottery';
import { AuthGuard } from '@/components/AuthGuard';

const CreateLotteryPage = () => {
  return (
    <AuthGuard requireAuth={true} requiredRole="admin">
      <CreateLottery />
    </AuthGuard>
  );
};

export default CreateLotteryPage;
