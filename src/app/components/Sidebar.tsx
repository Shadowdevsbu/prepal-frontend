"use client";

import Link from "next/link";
import {
  MdDashboard,
  MdCalendarToday,
  MdPeople,
  MdForum,
  MdAccountCircle,
  MdHelp,
  MdDescription,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useAuthStore } from "@/store/authStore";

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const navItems: NavItem[] = [
    { name: "Dashboard", icon: MdDashboard, href: "/" },
    { name: "Timetable", icon: MdCalendarToday, href: "/timetable" },
    { name: "Study Pals", icon: MdPeople, href: "/studypals" },
    { name: "Library", icon: MdDescription, href: "/library" },
    { name: "Forums", icon: MdForum, href: "/forums" },
    { name: "Profile", icon: MdAccountCircle, href: "/profile" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/auth/sign-in");
  };

  return (
    <aside
      className={`bg-purple-1 min-h-screen p-4 flex flex-col justify-between fixed left-0 top-0 text-white shadow-lg z-10 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Header with toggle button */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center">
            <img
              src="/chat-left-dots-fill.png"
              alt="Preppal Logo"
              className="h-8 mr-2"
            />
            {!isCollapsed && (
              <span className="text-3xl font-bold">PrePal</span>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="p-2 hover:bg-[#4A487D] rounded-lg transition-colors"
          >
            <MdMenu size="1.25em" />
          </button>
        </div>

        {/* Navigation */}
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center py-2 px-4 rounded-lg transition-colors duration-200 ${
                    pathname === item.href
                      ? "bg-[#4A487D]"
                      : "hover:bg-[#4A487D] text-gray-300"
                  }`}
                  title={isCollapsed ? item.name : ""}
                >
                  <item.icon
                    size="1.25em"
                    className={`${isCollapsed ? "mx-auto" : "mr-3"}`}
                  />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer buttons */}
      <div className="mt-auto space-y-2">
        <button
          className="flex items-center py-2 px-4 rounded-lg hover:bg-[#4A487D] transition-colors duration-200 w-full text-left"
          title={isCollapsed ? "Help" : ""}
        >
          <MdHelp
            size="1.25em"
            className={`${isCollapsed ? "mx-auto" : "mr-3"}`}
          />
          {!isCollapsed && (
            <span className="text-sm font-medium">Help</span>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 w-full text-left"
          title={isCollapsed ? "Sign Out" : ""}
        >
          <MdLogout
            size="1.25em"
            className={`${isCollapsed ? "mx-auto" : "mr-3"}`}
          />
          {!isCollapsed && (
            <span className="text-sm font-medium">Sign Out</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;