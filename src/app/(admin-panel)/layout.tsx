import React from "react";

import Breadcrumbs from "@/components/about/Breadcrumbs";
import Footer from "@/components/home-one/Footer";
import NavbarBlack from "@/components/navbar/NavbarBlack";


const layout = ({
    children,

}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <NavbarBlack />
            <Breadcrumbs pageName="User Panel" />
            <div className="userpanel-section pt-120 pb-120">
                <div className="container">
                    <div className="row g-6 justify-content-center">
                        {/* componente del admin */}
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default layout;