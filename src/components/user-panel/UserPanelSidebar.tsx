"use client";

import miller from "@/../public/images/man-global/devid-miller.png";
import { TokenService } from "@/services/tokenService";
import { Headset, Heart, Info, Lightning, SignOut, Ticket, Upload, Wallet } from "@phosphor-icons/react/dist/ssr";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ImageUploader from "../uploadFiles/imageUploader";

type ProfileImageType = StaticImageData | string;

const UserPanelSidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<ProfileImageType>(miller);
  const [uploading, setUploading] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  const handleLogout = () => {
    TokenService.removeToken();
    TokenService.removeUser();
    router.push('/login');
  };

  return (
    <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-8 relative">
      <div className="user-panel-sidebarwrap sidebar-sticky">
        <div className="user-panel-sideinner win40-ragba border radius24 py-xxl-10 py-xl-8 py-lg-6 py-5 px-xxl-8 px-xl-6 px-5">
          <div className="user-profile-thumb position-relative text-center border-bottom pb-xxl-5 pb-4 mb-xxl-6 mb-5">
            {/* Ícono para abrir el ImageUploader */}
            <span className="pencil d-center" onClick={() => setShowUploader(true)}>
              <Upload weight="bold" className="ph-bold ph-upload fs-five" />
            </span>

            {/* Imagen de perfil */}
            <div className="thumb mb-xxl-5 mb-xl-4 mb-4 m-auto">
              <Image src={profileImage} alt="img" className="radius-circle" width={100} height={100} />
              {uploading && (
                <div className="position-absolute inset-0 bg-black bg-opacity-50 d-center radius-circle">
                  <div className="spinner-border text-white" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              )}
            </div>

            {/* ImageUploader para subir imágenes */}
            {showUploader && (
              <ImageUploader
                onUploadComplete={(url: string) => {
                  setProfileImage(url); // Actualiza la foto de perfil con la nueva imagen
                  setShowUploader(false); // Oculta el ImageUploader después de subir
                }}
                onCancel={() => setShowUploader(false)} // Cierra el modal si se cancela la subida
                folderPath="profile"
                singleUpload={true} // Solo permite subir una imagen
              />
            )}

            <div className="content">
              <span className="fs20 fw_700 n4-clr d-block mb-1">Mohammad Salah</span>
              <span className="n3-clr">michexample.com</span>
            </div>
          </div>

          {/* Menú lateral */}
          <ul className="user-sidebar d-grid gap-2">
            {sidebarItems.map((item) => (
              <li key={`sidebar-${item.id}`}>
                <Link
                  href={item.href}
                  className={`${path === item.href ? "active" : ""} py-xxl-3 py-2 px-xxl-5 px-xl-4 px-3 radius12 n4-clr fw_600 d-flex align-items-center gap-xxl-3 gap-2 user-text-inner`}
                >
                  {item.icon}
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="py-xxl-3 py-2 px-xxl-5 px-xl-4 px-3 radius12 n4-clr fw_600 d-flex align-items-center gap-xxl-3 gap-2 user-text-inner w-full"
              >
                <SignOut weight="bold" className="ph-bold ph-sign-out fs-five" />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserPanelSidebar;

const sidebarItems = [
  { id: 3434652, href: "/personal-info", icon: <Info weight="bold" className="ph-bold ph-info fs-five" />, text: "Personal Information" },
  { id: 1343, href: "/user-panel", icon: <Ticket weight="bold" className="ph-bold ph-ticket fs-five" />, text: "My Tickets" },
  { id: 334221, href: "/transaction", icon: <Upload weight="bold" className="ph-bold ph-upload fs-five" />, text: "Transactions" },
  { id: 4212, href: "/referal-program", icon: <Lightning weight="bold" className="ph-bold ph-lightning fs-five" />, text: "Referral Program" },
  { id: 51212, href: "/wish-list", icon: <Heart weight="bold" className="ph-bold ph-heart fs-five" />, text: "Wishlist" },
  { id: 62342, href: "/payment", icon: <Wallet weight="bold" className="ph-bold ph-wallet fs-five" />, text: "Payment Methods" },
  { id: 4447, href: "/#", icon: <Headset weight="bold" className="ph-bold ph-headset fs-five" />, text: "Help Center" },
];
