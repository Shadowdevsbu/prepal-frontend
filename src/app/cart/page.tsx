'use client';
import { useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/app/components/Sidebar';
import UserNotificationBell from '@/app/components/UserNotificationBell';
import cartImage from '@/app/components/illustrations/cart.jpg';

export default function ShoppingCartDisplayPage() {
  const [notificationCount] = useState(2);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-end">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <UserNotificationBell notificationCount={notificationCount} />
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/ps.png"
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://placehold.co/40x40/cccccc/000000?text=PS';
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="relative w-full max-w-xl h-full max-h-[500px] flex items-center justify-center">
            <Image
              src={cartImage}
              alt="Shopping cart illustration"
              width={500}  
              height={300} 
              className="object-contain rounded-lg" 
              placeholder="blur"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://placehold.co/600x400/cccccc/000000?text=Image+Not+Found';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}