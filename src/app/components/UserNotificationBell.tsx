// src/app/components/UserNotificationBell.tsx
"use client"; 

import React from 'react';
import Link from 'next/link';
import { MdNotifications } from 'react-icons/md';

interface UserNotificationBellProps {
  notificationCount?: number; 
}

const UserNotificationBell: React.FC<UserNotificationBellProps> = ({ notificationCount = 0 }) => {
  return (
    <Link href="/notifications" className="relative cursor-pointer">
      <MdNotifications className="w-6 h-6 text-[#6D6BA7]" />
      {notificationCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {notificationCount}
        </span>
      )}
    </Link>
  );
};

export default UserNotificationBell;