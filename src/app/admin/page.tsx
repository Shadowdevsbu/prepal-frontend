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
      <section className="flex justify-around gap-5 items-center w-full md:w-10/12 m-auto">
        <DashboardCard title="Users" stats={4} icon={MdVerifiedUser} />
        <DashboardCard title="Forums" stats={3} icon={MdForum} />
        <DashboardCard title="Reports" stats={0} icon={MdReport} />
      </section>
    </div>
  );
}
