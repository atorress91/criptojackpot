'use client';

import { Users, Ticket, ChartBar, Gear, House, SignOut, Money, Megaphone } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { TokenService } from '@/services/tokenService';

const AdminPanelSidebar = () => {
  const path = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    TokenService.clearToken();
    router.push('/login');
  };

  return (
    <div className="col-lg-3 pe-lg-10">
      <div className="user-panel-sidebar">
        <div className="user-panel-sidebar-inner">
          {/* Admin Profile Info */}
          <div className="profile-info mb-xxl-10 mb-6 p-xxl-6 p-4 radius16 act4-bg d-flex align-items-center gap-xxl-4 gap-3">
            <div className="content">
              <span className="fs20 fw_700 n4-clr d-block mb-1">Panel de Administración</span>
              <span className="n3-clr">admin@sistema.com</span>
            </div>
          </div>

          {/* Admin Menu */}
          <ul className="user-sidebar d-grid gap-2">
            {sidebarItems.map(item => (
              <li key={`sidebar-${item.id}`}>
                <Link
                  href={item.href}
                  className={`${
                    path === item.href ? 'active' : ''
                  } py-xxl-3 py-2 px-xxl-5 px-xl-4 px-3 radius12 n4-clr fw_600 d-flex align-items-center gap-xxl-3 gap-2 user-text-inner`}
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
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelSidebar;

const sidebarItems = [
  {
    id: 1,
    href: '/admin',
    icon: <House weight="bold" className="ph-bold ph-house fs-five" />,
    text: 'Dashboard',
  },
  {
    id: 2,
    href: '/admin/users',
    icon: <Users weight="bold" className="ph-bold ph-users fs-five" />,
    text: 'Usuarios',
  },
  {
    id: 3,
    href: '/admin/tickets',
    icon: <Ticket weight="bold" className="ph-bold ph-ticket fs-five" />,
    text: 'Tickets',
  },
  {
    id: 4,
    href: '/admin/reports',
    icon: <ChartBar weight="bold" className="ph-bold ph-chart-bar fs-five" />,
    text: 'Reportes',
  },
  {
    id: 5,
    href: '/admin/finance',
    icon: <Money weight="bold" className="ph-bold ph-money fs-five" />,
    text: 'Finanzas',
  },
  {
    id: 6,
    href: '/admin/announcements',
    icon: <Megaphone weight="bold" className="ph-bold ph-megaphone fs-five" />,
    text: 'Anuncios',
  },
  {
    id: 7,
    href: '/admin/settings',
    icon: <Gear weight="bold" className="ph-bold ph-gear fs-five" />,
    text: 'Configuración',
  },
];
