// src/app/admin/page.tsx
import { MdVerifiedUser, MdForum, MdReport } from 'react-icons/md';
import React from 'react';
import Image from 'next/image';

interface DashBoardCardProps {
  title: string;
  stats: number;
  icon: React.ElementType;
}

const DashboardCard: React.FC<DashBoardCardProps> = ({
  title,
  stats,
  icon: Icon,
}) => (
  <div className="shadow-custom-shadow rounded-xl flex flex-col items-center justify-center gap-1 bg-white text-purple-1 w-1/3 h-28">
    <h3 className="text-4xl font-bold">{stats}</h3>
    <div className="flex items-center text-xl gap-1">
      <Icon />
      <p>{title}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="">
      <header className="flex items-center justify-end space-x-4 mb-10">
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
      <section className="flex justify-around gap-5 items-center w-full md:w-10/12 m-auto">
        <DashboardCard title="Users" stats={4} icon={MdVerifiedUser} />
        <DashboardCard title="Forums" stats={3} icon={MdForum} />
        <DashboardCard title="Reports" stats={0} icon={MdReport} />
      </section>
    </div>
  );
}
