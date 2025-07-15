'use client';
import Link from 'next/link';
import { sidebarItems, SidebarItemData } from 'public/data/sidebarItems';

export function Sidebar() {
  return (
    <nav className="sidebar">
      <ul className="list-unstyled mb-0">
        {sidebarItems.map((item: SidebarItemData) => (
          <li key={item.id}>
            <Link href={item.href} className="d-flex align-items-center p-2 text-decoration-none">
              <item.Icon weight="bold" className="ph-bold fs-five me-2" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
