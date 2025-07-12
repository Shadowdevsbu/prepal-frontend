'use client';

import React from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/Sidebar';
import { MdFilterList } from 'react-icons/md';
import { TbCheckbox } from 'react-icons/tb';
import { HiBell } from 'react-icons/hi';

interface Notification {
  id: number;
  avatar: string;
  name: string;
  time: string;
  color: string;
}

export default function NotificationsPage() {
  const notifications: Notification[] = [
    {
      id: 1,
      avatar: 'E',
      name: 'Eniola Aneni agreed to pair with you',
      time: '19-06-2025 4:40pm',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      avatar: 'K',
      name: 'You missed your study plan',
      time: '19-06-2025 8:45am',
      color: 'bg-red-500',
    },
    {
      id: 3,
      avatar: 'K',
      name: "View tomorrow's study plan",
      time: '19-06-2025 17:55pm',
      color: 'bg-red-500',
    },
    {
      id: 4,
      avatar: 'K',
      name: 'You have forums that match your course',
      time: '19-06-2025 17:40pm',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 ml-64 bg-gray-100 min-h-screen p-6">
        {/* Header */}
        <div className="flex justify-end items-center mb-6">
          <Link href="/notifications">
            <HiBell className="w-6 h-6 text-[#6D6BA7]" />
          </Link>
         <div className="ml-4 w-8 h-8 rounded-full overflow-hidden">
         <img
           src="/ps.png"
           alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          </div>
        </div>

        {/* Notifications Section */}
        <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-auto">
          {/* Top Bar */}
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MdFilterList className="text-[#6D6BA7] w-5 h-5" />
              <h1 className="text-lg font-semibold text-gray-800">Notifications</h1>
            </div>
            <button className="flex items-center space-x-2 text-sm text-black hover:text-[#444]">
              <span className="font-semibold text-black">Mark all as read</span>
              <TbCheckbox className="w-4 h-4 text-[#6D6BA7]" />
            </button>
          </div>

          {/* Notification List */}
          <div className="space-y-6 px-4 pb-6">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="bg-[#6D6BA7] rounded-4xl p-4 flex items-start gap-4"
              >
                <div
                  className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold`}
                >
                  {item.avatar}
                </div>
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-sm text-white">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
