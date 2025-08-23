'use client';

import React, { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import { TbCheckbox } from 'react-icons/tb';
import { MdFilterList } from 'react-icons/md';
import UserNotificationBell from '@/app/components/UserNotificationBell';

interface Notification {
  id: number;
  message: string;
  time: string;
  color: string;
}

export default function NotificationsPage() {
  const notifications: Notification[] = [
    {
      id: 1,
      message: 'Your order #1234 has been shipped and is on its way!',
      time: '2 hours ago',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      message: 'New message from John Doe.',
      time: '5 hours ago',
      color: 'bg-green-500',
    },
    {
      id: 3,
      message: 'You have a new follower: Jane Smith.',
      time: '1 day ago',
      color: 'bg-purple-500',
    },
  ];

  const notificationCount = notifications.length;
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main className="flex-1 ml-64 bg-gray-100 min-h-screen p-6">
        {/* Top right: notifications + profile */}
        <div className="flex justify-end items-center mb-6 relative">
          <UserNotificationBell />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-12 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}

          <div className="ml-4 w-8 h-8 rounded-full overflow-hidden">
            <img
              src="/ps.png"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Notifications</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-sm text-black hover:text-[#444]">
              <span className="font-semibold">Filter</span>
              <MdFilterList className="w-4 h-4 text-[#6D6BA7]" />
            </button>
            <button className="flex items-center space-x-2 text-sm text-black hover:text-[#444]">
              <span className="font-semibold">Mark all as read</span>
              <TbCheckbox className="w-4 h-4 text-[#6D6BA7]" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="bg-[#6D6BA7] rounded-3xl p-4 flex items-start gap-4"
            >
              <div
                className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold`}
              />
              <div className="flex-1">
                <p className="text-white font-medium">{item.message}</p>
                <p className="text-gray-200 text-sm">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
