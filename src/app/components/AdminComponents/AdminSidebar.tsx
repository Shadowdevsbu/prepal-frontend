// src/app/components/AdminSidebar.tsx
"use client"

import Link from 'next/link';
import { MdDashboard, MdPeople, MdForum, MdHelp, MdDescription, MdSettings, MdReport } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

const AdminSidebar = () => {
  const pathname = usePathname(); 

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: MdDashboard, href: '/admin' },
    { name: 'Manage Users', icon: MdPeople, href: '/admin/manage-users' },
    { name: 'Manage Forums', icon: MdForum, href: '/admin/manage-forums' },
    { name: 'Manage Library', icon: MdDescription, href: '/admin/manage-library' },
    { name: 'Reports', icon: MdReport, href: '/admin/reports' },
    { name: 'Settings', icon: MdSettings, href: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-purple-1 h-screen p-6 flex flex-col justify-between fixed left-0 top-0 text-white shadow-lg z-10">
      <div>
        {/* Prepal Logo and text are now a clickable link */}
        <Link href="/admin" className="flex items-center mb-10 pl-2 cursor-pointer">
          <img src="/chat-left-dots-fill.png" alt="Prepal Logo" className="h-8 mr-2" />
          <span className="text-3xl font-bold">PrepPal</span>
        </Link>

        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center py-2 px-4 rounded-lg transition-colors duration-200 ${
                    pathname === item.href ? 'bg-[#4A487D]' : 'hover:bg-[#4A487D] text-gray-300'  
                  }`}
                >
                    <span className="mr-3">
                        <item.icon size="1.25em" />
                    </span>
                    <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-auto pl-2">
        <button className="flex items-center py-2 px-4 rounded-lg hover:bg-[#4A487D] transition-colors duration-200 w-full text-left">
          <span className="mr-3">
            <MdHelp size="1.25em" />
          </span>
          <span className="text-sm font-medium">Help</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;