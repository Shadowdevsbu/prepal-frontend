// src/app/admin/layout.tsx
import type { Metadata } from "next";
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
        {children}
      </main>
    </div>
  );
}
