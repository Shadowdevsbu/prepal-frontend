// src/app/library/page.tsx
'use client';

import Sidebar from '@/app/components/Sidebar';
import Image from 'next/image';
import React, { useState } from 'react';
import { HiViewGrid } from 'react-icons/hi';
import { FaListUl } from 'react-icons/fa6';
import UserNotificationBell from '@/app/components/UserNotificationBell';

// Dummy data for the library items
const libraryItems = [
  { name: '300 lvl', link: '/library/300' },
  { name: '400 lvl', link: '/library/400' },
  { name: '200 lvl', link: '/library/200' },
  { name: '100 lvl', link: '/library/100' },
];

const LibraryCard = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Toggle button */}
      <div
        className="flex bg-[#6D6BA7] self-end text-white w-fit p-1 rounded cursor-pointer"
        onClick={toggleViewMode}
      >
        <div
          className={`w-10 h-10 rounded flex items-center justify-center ${
            viewMode === 'grid' ? 'bg-white text-[#6D6BA7]' : 'bg-transparent'
          }`}
        >
          <HiViewGrid className="w-7 h-7" />
        </div>
        <div
          className={`w-10 h-10 rounded flex items-center justify-center ${
            viewMode === 'list' ? 'bg-white text-[#6D6BA7]' : 'bg-transparent'
          }`}
        >
          <FaListUl className="w-7 h-7" />
        </div>
      </div>

      {/* Library items */}
      <div
        className={`grid ${
          viewMode === 'grid' ? 'grid-cols-2 gap-10' : 'grid-cols-1'
        } gap-6 p-4 items-center justify-center`}
      >
        {libraryItems.map((item) => (
          <div key={item.name}>
            <a
              href={item.link}
              className="flex flex-col gap-3 justify-center items-center"
            >
              <Image
                src="/folder.png"
                alt={item.name}
                width={150}
                height={150}
                className="object-cover"
              />
              <h2 className="font-semibold text-lg text-center text-black">
                {item.name}
              </h2>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LibraryPage() {
  const [isCollapsed, setIsCollapsed] = useState(false); // ✅ define it here
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