'use client';
import { useState } from 'react';
import Image from 'next/image';
import AdminSidebar from '@/app/components/AdminComponents/AdminSidebar'; // Replaced Sidebar with AdminSidebar
import cartImage from '@/app/components/illustrations/cart.jpg';

export default function ShoppingCartDisplayPage() {
  const [notificationCount] = useState(2);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        {/* The redundant header with the notification bell and profile photo has been removed from this position. */}
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