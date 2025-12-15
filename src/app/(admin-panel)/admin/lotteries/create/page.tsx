'use client';

import CreateLottery from '@/features/admin-panel/components/CreateLottery';
import { AuthGuard } from '@/components/AuthGuard';

const CreateTicketPage = () => {
  return (
    <AuthGuard requireAuth={true} requiredRole="admin">
      <CreateLottery />
    </AuthGuard>
  );
};

export default CreateTicketPage;
