// src/app/admin/layout.tsx
import type { Metadata } from "next";
import Image from "next/image";
import AdminSidebar from "@/app/components/AdminComponents/AdminSidebar";

export const metadata: Metadata = {
  title: "PrepPal",
  description: "Your Study Companion",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 h-screen overflow-auto">
        <header className="flex items-center justify-end space-x-4 mb-6">
          <div className="relative">
            <Image
              src="/bell.svg"
              alt="Notifications"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              5
            </span>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src="/profile-placeholder.png"
              alt="Profile"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
