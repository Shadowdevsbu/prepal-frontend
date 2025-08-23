// src/app/components/TimetableHeader.tsx
"use client";

import Image from 'next/image';
import UserNotificationBell from '@/app/components/UserNotificationBell';

interface TimetableHeaderProps {
  onCreatePlanClick: () => void;
  notificationCount?: number;
}

export default function TimetableHeader({ 
  onCreatePlanClick, 
  notificationCount = 0 
}: TimetableHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      {/* Create Plan Button */}
      <button
        onClick={onCreatePlanClick}
        className="flex items-center bg-purple-1 text-white px-5 py-2 rounded-md font-medium hover:bg-[#5C5A90] transition-colors duration-200"
      >
        Create plan +
      </button>

      {/* User Profile Section */}
      <div className="flex items-center space-x-4">
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
  );
}