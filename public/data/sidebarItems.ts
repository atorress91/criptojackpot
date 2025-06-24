import { Users, Ticket, ChartBar, Gear, House, Money, Megaphone, IconProps } from '@phosphor-icons/react';

export interface SidebarItemData {
  id: number;
  href: string;
  Icon: React.ComponentType<IconProps>;
  label: string;
}

export const sidebarItems: SidebarItemData[] = [
  { id: 1, href: '/admin', Icon: House, label: 'Dashboard' },
  { id: 2, href: '/admin/users', Icon: Users, label: 'Usuarios' },
  { id: 3, href: '/admin/tickets', Icon: Ticket, label: 'Tickets' },
  { id: 4, href: '/admin/reports', Icon: ChartBar, label: 'Reportes' },
  { id: 5, href: '/admin/finance', Icon: Money, label: 'Finanzas' },
  { id: 6, href: '/admin/announcements', Icon: Megaphone, label: 'Anuncios' },
  { id: 7, href: '/admin/settings', Icon: Gear, label: 'Configuración' },
];
