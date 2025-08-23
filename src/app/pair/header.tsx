"use client";

import Link from "next/link";
import { MdSearch } from "react-icons/md";
import UserNotificationBell from "@/app/components/UserNotificationBell";

export default function Header() {
  const notificationCount = 3; // ✅ simple static number

  return (
    <header className="w-full mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        {/* Left side (title + button) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Study Pals
          </h1>

          {/* Find a Pal Button */}
          <Link href="/pair" passHref>
            <span className="mt-2 sm:mt-0 bg-[#6D6BA7] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5C5A90] transition-colors duration-200 cursor-pointer text-center">
              Find a pal
            </span>
          </Link>
        </div>

        {/* Right side (search + icons) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search study pals..."
              className="w-full sm:w-48 md:w-64 bg-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6D6BA7] pr-10 placeholder:text-[#6D6BA7] text-[#6D6BA7]"
            />
            <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6D6BA7]" />
          </div>

          {/* Notification bell with badge */}
          <div className="relative self-end sm:self-auto">
            <UserNotificationBell />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          </div>

          {/* Profile image */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 self-end sm:self-auto">
            <img
              src="/ps.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
