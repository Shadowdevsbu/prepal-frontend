'use client';

import Sidebar from '@/app/components/Sidebar';
import Image from 'next/image';
import React, { useState } from 'react';
import UserNotificationBell from '@/app/components/UserNotificationBell';
import LibraryCard from '@/app/components/LibraryCard';

export default function LibraryPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const notificationCount = 5;

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`flex-1 p-8 bg-gray-100 min-h-screen transition-all duration-300 ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button className="flex items-center bg-[#6D6BA7] text-white px-5 py-2 rounded-md font-medium hover:bg-[#5C5A90] transition-colors duration-200">
            Upload resources +
          </button>
          <div className="flex items-center space-x-6">
            <UserNotificationBell notificationCount={notificationCount} />
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src="/ps.png"
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Library content */}
        <LibraryCard />
      </main>
    </div>
  );
}