'use client';

import TicketsList from '@/features/admin-panel/components/TicketsList';
import { AuthGuard } from '@/components/AuthGuard';

const TicketsPage = () => {
  return (
    <AuthGuard requireAuth={true} requiredRole="admin">
      <TicketsList />
    </AuthGuard>
  );
};

export default TicketsPage;
