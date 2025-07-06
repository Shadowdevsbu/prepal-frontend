'use client';

import React, { useState } from 'react';
import { HiViewGrid, HiUsers } from 'react-icons/hi';
import { FaRegCalendar, FaPlus } from 'react-icons/fa6';
import { FaRegFileAlt } from 'react-icons/fa';
import { IoMdChatboxes } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { PiHeadsetBold } from 'react-icons/pi';
import { GoBellFill } from 'react-icons/go';
import { BsChatLeftDots } from 'react-icons/bs';
import { IoShareSocialOutline } from 'react-icons/io5';

export default function PrepPalInterface() {
  const [isPairing, setIsPairing] = useState(false);
  const [activeItem, setActiveItem] = useState('Timetable');
  const [notificationCount, setNotificationCount] = useState(2);

  const handlePair = () => {
    setIsPairing(true);
    setTimeout(() => {
      setIsPairing(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsPairing(false);
  };

  const sidebarItems = [
    { icon: <HiViewGrid className="w-5 h-5" />, label: 'Dashboard' },
    { icon: <FaRegCalendar className="w-5 h-5" />, label: 'Timetable' },
    { icon: <HiUsers className="w-5 h-5" />, label: 'Study pals' },
    { icon: <FaRegFileAlt className="w-5 h-5" />, label: 'Library' },
    { icon: <IoMdChatboxes className="w-5 h-5" />, label: 'Forums' },
    { icon: <CgProfile className="w-5 h-5" />, label: 'Profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 text-white relative" style={{ background: 'linear-gradient(to bottom, #6D6BA7, #5A5890)' }}>
        {/* Sidebar Header */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <BsChatLeftDots className="w-5 h-5" />
            <span className="text-xl font-bold">PrepPal</span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const isActive = activeItem === item.label;
            return (
              <div
                key={index}
                onClick={() => setActiveItem(item.label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-purple-200 hover:text-white'
                }`}
              >
                <span className={`${isActive ? 'text-white' : 'text-purple-200'}`}>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>

        {/* Help Icon Bottom */}
        <div className="absolute bottom-6 left-6">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white">
            <PiHeadsetBold className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Create Plan */}
            <button
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#6D6BA7' }}
            >
              Create plan
              <FaPlus className="w-4 h-4" />
            </button>

            {/* Right: Bell + Profile */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <GoBellFill className="w-6 h-6" style={{ color: '#6D6BA7' }} />
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{notificationCount}</span>
                  </div>
                )}
              </div>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                K
              </div>
            </div>
          </div>
        </div>

        {/* Pairing Section */}
        <div className="flex-1 p-6 bg-gray-100">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-center">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Pair with partner</h2>
                  <IoShareSocialOutline className="w-6 h-6 text-gray-500 hover:text-[#6D6BA7] transition-colors cursor-pointer" />
                </div>

                <div className="flex items-center justify-center gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 relative">
                      K
                      {isPairing && (
                        <div
                          className="absolute inset-0 rounded-full border-4 animate-ping"
                          style={{ borderColor: '#6D6BA7' }}
                        ></div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${isPairing ? 'animate-pulse' : ''}`}
                        style={{ backgroundColor: i === 1 || isPairing ? '#6D6BA7' : '#D1D5DB' }}
                      ></div>
                    ))}
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 relative">
                      E
                      {isPairing && (
                        <div
                          className="absolute inset-0 rounded-full border-4 animate-ping"
                          style={{ borderColor: '#6D6BA7' }}
                        ></div>
                      )}
                    </div>
                    <p className="text-base font-medium text-gray-900">Emeka Anaru</p>
                  </div>
                </div>

                <div className="flex gap-4 max-w-md mx-auto">
                  <button
                    onClick={handlePair}
                    disabled={isPairing}
                    className={`flex-1 py-4 px-8 rounded-lg font-semibold text-lg transition-colors ${
                      isPairing ? 'bg-gray-400 text-white cursor-not-allowed' : 'text-white hover:opacity-90'
                    }`}
                    style={{ backgroundColor: isPairing ? '#9CA3AF' : '#6D6BA7' }}
                  >
                    {isPairing ? 'Pairing...' : 'Pair'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 py-4 px-8 bg-red-500 text-white rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
