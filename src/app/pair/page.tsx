'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/app/components/Sidebar';
import { HiBell } from 'react-icons/hi';
import { IoShareSocialOutline } from 'react-icons/io5';

export default function PairPage() {
  const [isPairing, setIsPairing] = useState(false);
  const [hasPaired, setHasPaired] = useState(false);

  const handlePair = () => {
    setIsPairing(true);
    setTimeout(() => {
      setIsPairing(false);
      setHasPaired(true);
    }, 2000);
  };

  const handleCancel = () => {
    setIsPairing(false);
    setHasPaired(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Bar */}
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <Link href="/notifications">
              <HiBell className="w-6 h-6 text-[#6D6BA7] cursor-pointer" />
            </Link>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src="/ps.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
        </div>

        {/* Pairing Section */}
        <div className="flex-1 p-6 bg-gray-100">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-center">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Pair with partner</h2>
                  <IoShareSocialOutline className="w-6 h-6 text-gray-500 hover:text-[#6D6BA7] transition-colors cursor-pointer" />
                </div>

                {/* Avatars and dots */}
                <div className="flex items-center justify-center gap-8 mb-12">
                  {/* You (user) */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 overflow-hidden">
                      <img src="/ps.png" alt="You" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Connecting dots */}
                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: i === 1 || isPairing ? '#6D6BA7' : '#D1D5DB' }}
                      ></div>
                    ))}
                  </div>

                  {/* Paired partner */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                      EA
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 max-w-md mx-auto">
                  <button
                    onClick={handlePair}
                    disabled={isPairing}
                    className={`flex-1 py-4 px-8 rounded-lg font-semibold text-lg transition-colors ${
                      isPairing
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'text-white hover:opacity-90'
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
