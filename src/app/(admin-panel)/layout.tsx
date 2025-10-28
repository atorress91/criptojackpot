import 'reflect-metadata';
import '@/di/init';

import React from 'react';
import { AuthGuard } from '@/components/AuthGuard';
import { DIProvider } from '@/components/DIProvider';
import AdminPanelSidebar from '@/features/admin-panel/components/AdminPanelSidebar';
import Breadcrumbs from '@/components/about/Breadcrumbs';
import Footer from '@/components/home-one/Footer';
import NavbarBlack from '@/components/navbar/NavbarBlack';
import SessionProvider from '@/components/SessionProvider';

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <DIProvider>
      <AuthGuard requireAuth={true} requiredRole="admin">
        <div>
          <NavbarBlack />
          <Breadcrumbs pageName="Panel de Administración" />
          <div className="userpanel-section pt-120 pb-120">
            <div className="container">
              <div className="row g-6 justify-content-center">
                <AdminPanelSidebar />
                <SessionProvider>
                  {children}
                </SessionProvider>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </AuthGuard>
    </DIProvider>
  );
};

export default AdminLayout;
