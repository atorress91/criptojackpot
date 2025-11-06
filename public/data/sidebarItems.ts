import {
  UsersIcon,
  TicketIcon,
  ChartBarIcon,
  GearIcon,
  HouseIcon,
  MoneyIcon,
  MegaphoneIcon,
  GiftIcon,
  IconProps,
} from '@phosphor-icons/react';
import React from 'react';

export interface SidebarItemData {
  id: number;
  href: string;
  Icon: React.ComponentType<IconProps>;
  label: string;
}

export const sidebarItems: SidebarItemData[] = [
  { id: 1, href: '/admin', Icon: HouseIcon, label: 'Dashboard' },
  { id: 2, href: '/admin/users', Icon: UsersIcon, label: 'Usuarios' },
  { id: 3, href: '/admin/prizes', Icon: GiftIcon, label: 'Premios' },
  { id: 4, href: '/admin/tickets', Icon: TicketIcon, label: 'Tickets' },
  { id: 5, href: '/admin/reports', Icon: ChartBarIcon, label: 'Reportes' },
  { id: 6, href: '/admin/finance', Icon: MoneyIcon, label: 'Finanzas' },
  { id: 7, href: '/admin/announcements', Icon: MegaphoneIcon, label: 'Anuncios' },
  { id: 8, href: '/admin/settings', Icon: GearIcon, label: 'Configuración' },
];
