'use client';

import QuickActions from '@/features/admin-panel/components/QuickActions';
import RecentActivityTable from '@/features/admin-panel/components/RecentActivityTable';
import StatsSection from '@/features/admin-panel/components/StatsSection';

const AdminDashboard = () => {
  return (
    <div className="col-lg-9">
      <div className="user-panel-wrapper">
        <h3 className="n4-clr fw_700 mb-xxl-10 mb-6">Dashboard de Administración</h3>
        <StatsSection />
        <RecentActivityTable />
        <QuickActions />
      </div>
    </div>
  );
};

export default AdminDashboard;
