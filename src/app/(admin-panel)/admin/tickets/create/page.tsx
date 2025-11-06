'use client';

import CreateTicket from '@/features/admin-panel/components/CreateTicket';
import { AuthGuard } from '@/components/AuthGuard';

const CreateTicketPage = () => {
  return (
    <AuthGuard requireAuth={true} requiredRole="admin">
      <CreateTicket />
    </AuthGuard>
  );
};

export default CreateTicketPage;
