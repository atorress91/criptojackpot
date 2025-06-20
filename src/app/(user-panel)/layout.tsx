import React from "react";

import Breadcrumbs from "@/components/about/Breadcrumbs";
import { AuthGuard } from "@/components/AuthGuard";
import Footer from "@/components/home-one/Footer";
import NavbarBlack from "@/components/navbar/NavbarBlack";
import UserPanelSidebar from "@/components/user-panel/UserPanelSidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthGuard requireAuth={false}>
      <div>
        <NavbarBlack />
        <Breadcrumbs pageName="User Panel" />
        <div className="userpanel-section pt-120 pb-120">
          <div className="container">
            <div className="row g-6 justify-content-center">
              <UserPanelSidebar />
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default layout;
