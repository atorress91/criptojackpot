'use client';

import QuickActions from '@/components/admin-panel/QuickActions';
import RecentActivityTable from '@/components/admin-panel/RecentActivityTable';
import StatsSection from '@/components/admin-panel/StatsSection';

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
