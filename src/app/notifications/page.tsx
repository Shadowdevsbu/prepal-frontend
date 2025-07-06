'use client';

import React from 'react';
import Link from 'next/link';
import {
  HiViewGrid,
  HiUsers,
} from 'react-icons/hi';
import { FaRegCalendar, FaRegFileAlt } from 'react-icons/fa';
import { IoMdChatboxes, IoMdCheckboxOutline } from 'react-icons/io';
import { IoFilterSharp } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { PiHeadsetBold } from 'react-icons/pi';
import { GoBellFill } from 'react-icons/go';
import { BsChatLeftDots } from 'react-icons/bs';

export default function NotificationsPage() {
  const notifications = [
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className="w-64 text-white relative"
        style={{ background: 'linear-gradient(to bottom, #6D6BA7, #5A5890)' }}
      >
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <BsChatLeftDots className="w-5 h-5" />
            <span className="text-xl font-bold">PrepPal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {[
            { icon: <HiViewGrid className="w-5 h-5" />, label: 'Dashboard' },
            { icon: <FaRegCalendar className="w-5 h-5" />, label: 'Timetable' },
            { icon: <HiUsers className="w-5 h-5" />, label: 'Study pals' },
            { icon: <FaRegFileAlt className="w-5 h-5" />, label: 'Library' },
            { icon: <IoMdChatboxes className="w-5 h-5" />, label: 'Forums' },
            { icon: <CgProfile className="w-5 h-5" />, label: 'Profile' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 text-purple-200 hover:text-white"
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Help Icon */}
        <div className="absolute bottom-6 left-6">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white">
            <PiHeadsetBold className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <Link href="/notifications">
              <GoBellFill className="w-6 h-6 text-[#6D6BA7] cursor-pointer" />
            </Link>
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
              K
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="flex-1 p-6">
          <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-auto">
            {/* Top Bar */}
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <IoFilterSharp className="text-[#6D6BA7] w-5 h-5" />
                <h1 className="text-lg font-semibold text-gray-800">Notifications</h1>
              </div>
              <button className="flex items-center space-x-2 text-sm text-black hover:text-[#444]">
                <span className="font-semibold text-black">Mark all as read</span>
                <IoMdCheckboxOutline className="w-4 h-4 text-[#6D6BA7]" />
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
        </div>
      </div>
    </div>
  );
}
